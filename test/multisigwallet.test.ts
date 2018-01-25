import { assert } from 'chai';
import { propOr } from 'ramda';

import { ContractContextDefinition } from 'truffle';
import * as Web3 from 'web3';

import {
  ConfirmationEvent,
  ExecutionEvent,
  ExecutionFailureEvent,
  MultiSigWallet,
  OwnerAdditionEvent,
  OwnerRemovalEvent,
  RequirementChangeEvent,
  RevocationEvent,
  SubmissionEvent,
  WalletArtifacts
} from 'wallet';

import {
  assertNumberEqual,
  assertReverts,
  executeWalletFunction,
  findLastLog,
  findLastTransactionId,
  getData
} from './helpers';

import { AnyNumber } from 'web3';

declare const web3: Web3;
declare const artifacts: WalletArtifacts;
declare const contract: ContractContextDefinition;

const MultiSigWalletContract = artifacts.require('MultiSigWallet');

contract('MultiSigWallet', accounts => {
  const owners = accounts.slice(0, 3);
  const required = 3;

  let wallet: MultiSigWallet;

  async function submitAddOwner(options?: any) {
    const data = await getData(
      wallet.addOwner,
      propOr(owners[0], 'newOwner', options)
    );
    return await wallet.submitTransaction(
      propOr(wallet.address, 'to', options),
      propOr(0, 'value', options),
      data,
      { from: propOr(owners[0], 'from', options) }
    );
  }

  async function executeChangeRequirements(
    newRequirements: AnyNumber,
    options?: any
  ) {
    return await executeWalletFunction(
      propOr(wallet, 'wallet', options),
      wallet.changeRequirement,
      propOr(owners[0], 'from', options),
      newRequirements
    );
  }

  async function executeReplaceOwner(
    oldOwner: Address,
    newOwner: Address,
    options?: any
  ) {
    return await executeWalletFunction(
      propOr(wallet, 'wallet', options),
      wallet.replaceOwner,
      propOr(owners[0], 'from', options),
      oldOwner,
      newOwner
    );
  }

  async function executeRemoveOwner(owner: Address, options?: any) {
    return await executeWalletFunction(
      propOr(wallet, 'wallet', options),
      wallet.removeOwner,
      propOr(owners[0], 'from', options),
      owner
    );
  }

  async function executeAddOwner(newOwner: Address, options?: any) {
    return await executeWalletFunction(
      propOr(wallet, 'wallet', options),
      wallet.addOwner,
      propOr(owners[0], 'from', options),
      newOwner
    );
  }

  beforeEach(async () => {
    wallet = await MultiSigWalletContract.new(owners, required, {
      from: owners[0]
    });
  });

  describe('#ctor', () => {
    it('should set required', async () => {
      assertNumberEqual(await wallet.required(), required);
    });

    it('should set owners', async () => {
      assert.deepEqual(await wallet.getOwners(), owners);
    });

    it('should not have any transactions', async () => {
      assertNumberEqual(await wallet.getTransactionCount(true, true), 0);
    });

    it('should revert for empty list of owners', async () => {
      await assertReverts(async () => {
        await MultiSigWalletContract.new([], 3);
      });
    });

    it('should revert for zero required', async () => {
      await assertReverts(async () => {
        await MultiSigWalletContract.new(owners, 0);
      });
    });
  });

  describe('#submitTransaction', () => {
    it('should emit SubmissionEvent', async () => {
      const tx = await submitAddOwner({ from: accounts[0] });

      const log = findLastLog(tx, 'Submission');
      assert.isOk(log);

      const event = log.args as SubmissionEvent;
      assertNumberEqual(event.transactionId, 0);
    });

    it('should store one pending transaction', async () => {
      const tx = await submitAddOwner({ from: accounts[0] });

      const transactionCount = await wallet.getTransactionCount(true, false);

      assertNumberEqual(transactionCount, 1);

      const transactionId = findLastTransactionId(tx);

      const transactionIds = await wallet.getTransactionIds(0, 1, true, false);
      assert.deepEqual(transactionIds, [transactionId]);
    });

    it('should set one valid confirmation for transaction', async () => {
      const tx = await submitAddOwner({ from: accounts[0] });

      const transactionId = findLastTransactionId(tx);

      const confirmationCount = await wallet.getConfirmationCount(
        transactionId
      );

      assertNumberEqual(confirmationCount, 1);

      const confirmations = await wallet.getConfirmations(transactionId);
      assert.deepEqual(confirmations, [owners[0]]);
    });

    it('should revert for non-owner', async () => {
      await assertReverts(async () => {
        await submitAddOwner({ from: accounts[9] });
      });
    });
  });

  describe('#confirmTransaction', () => {
    let transactionId: AnyNumber;

    beforeEach(async () => {
      const tx = await submitAddOwner({ newOwner: accounts[9] });
      transactionId = findLastTransactionId(tx);
    });

    it('should emit ConfirmationEvent', async () => {
      const tx = await wallet.confirmTransaction(transactionId, {
        from: owners[1]
      });

      const log = findLastLog(tx, 'Confirmation');
      assert.isOk(log);

      const event = log.args as ConfirmationEvent;
      assert.equal(event.sender, owners[1]);
      assertNumberEqual(event.transactionId, transactionId);
    });

    it('should set new valid confirmation for transaction', async () => {
      await wallet.confirmTransaction(transactionId, { from: owners[1] });
      const confirmationCount = await wallet.getConfirmationCount(
        transactionId
      );
      assertNumberEqual(confirmationCount, 2);

      const confirmations = await wallet.getConfirmations(transactionId);
      assert.deepEqual(confirmations, [owners[0], owners[1]]);
    });

    it('should revert for non-owner', async () => {
      await assertReverts(async () => {
        await wallet.confirmTransaction(transactionId, { from: accounts[9] });
      });
    });

    it('should revert for non-existing transaction', async () => {
      await assertReverts(async () => {
        await wallet.confirmTransaction(2, { from: owners[0] });
      });
    });

    it('should revert for duplicated confirmation', async () => {
      await assertReverts(async () => {
        await wallet.confirmTransaction(transactionId, { from: owners[0] });
      });
    });
  });

  describe('#revokeConfirmation', () => {
    let transactionId: AnyNumber;

    beforeEach(async () => {
      const tx = await submitAddOwner({ newOwner: accounts[9] });
      transactionId = findLastTransactionId(tx);
    });

    it('should emit RevocationEvent', async () => {
      const tx = await wallet.revokeConfirmation(transactionId, {
        from: owners[0]
      });
      const log = findLastLog(tx, 'Revocation');
      assert.isOk(log);

      const event = log.args as RevocationEvent;
      assert.equal(event.sender, owners[0]);
      assertNumberEqual(event.transactionId, transactionId);
    });

    it('should revoke confirmation for transaction', async () => {
      await wallet.revokeConfirmation(transactionId, {
        from: owners[0]
      });
      const confirmationCount = await wallet.getConfirmationCount(
        transactionId
      );
      assertNumberEqual(confirmationCount, 0);
    });

    it('should revert for non-owner', async () => {
      await assertReverts(async () => {
        await wallet.revokeConfirmation(1, { from: accounts[9] });
      });
    });

    it('should revert for non-existing transaction', async () => {
      await assertReverts(async () => {
        await wallet.revokeConfirmation(2, { from: owners[0] });
      });
    });

    it('should revert for not confirmed transaction', async () => {
      await assertReverts(async () => {
        await wallet.revokeConfirmation(2, { from: owners[0] });
      });
    });
  });

  describe('#executeTransaction', () => {
    let transactionId: AnyNumber;

    beforeEach(async () => {
      const tx = await submitAddOwner({ newOwner: accounts[9] });
      transactionId = findLastTransactionId(tx);
      await wallet.confirmTransaction(transactionId, { from: owners[1] });
    });

    it('should emit ExecutionEvent', async () => {
      const tx = await wallet.confirmTransaction(transactionId, {
        from: owners[2]
      });

      const log = findLastLog(tx, 'Execution');
      assert.isOk(log);

      const event = log.args as ExecutionEvent;
      assertNumberEqual(event.transactionId, transactionId);
    });

    it('should set transaction as executed', async () => {
      await wallet.confirmTransaction(transactionId, {
        from: owners[2]
      });

      const transactionCount = await wallet.getTransactionCount(false, true);
      assertNumberEqual(transactionCount, 1);

      const transactionIds = await wallet.getTransactionIds(0, 1, false, true);
      assert.deepEqual(transactionIds, [transactionId]);
    });

    it('should revert for non-owner', async () => {
      await assertReverts(async () => {
        await wallet.executeTransaction(transactionId, { from: accounts[9] });
      });
    });

    it('should revert for non-existing transaction', async () => {
      await assertReverts(async () => {
        await wallet.executeTransaction(2, { from: owners[0] });
      });
    });

    it('should revert for not confirmed transaction', async () => {
      await assertReverts(async () => {
        await wallet.executeTransaction(transactionId, { from: owners[2] });
      });
    });
  });

  describe('#changeRequirement', () => {
    const newRequired = 2;

    it('should emit ExecutionFailureEvent for zero requirements', async () => {
      const result = await executeChangeRequirements(0);
      const log = findLastLog(result.lastTransaction, 'ExecutionFailure');
      assert.isOk(log);

      const event = log.args;
      assertNumberEqual(event.transactionId, result.transactionId);
    });

    it('should emit ExecutionFailureEvent for requirements > owners count', async () => {
      const result = await executeChangeRequirements(4);
      const log = findLastLog(result.lastTransaction, 'ExecutionFailure');
      assert.isOk(log);

      const event = log.args;
      assertNumberEqual(event.transactionId, result.transactionId);
    });

    it('should emit RequirementChangeEvent', async () => {
      const result = await executeChangeRequirements(newRequired);
      const log = findLastLog(result.lastTransaction, 'RequirementChange');
      assert.isOk(log);

      const event = log.args as RequirementChangeEvent;
      assertNumberEqual(event.required, newRequired);
    });

    it('should change `required` attribute', async () => {
      await executeChangeRequirements(newRequired);
      assertNumberEqual(await wallet.required(), newRequired);
    });

    it('should revert for not wallet', async () => {
      await assertReverts(async () => {
        await wallet.changeRequirement(newRequired);
      });
    });
  });

  describe('#replaceOwner', () => {
    const oldOwner = owners[0];
    const newOwner = accounts[4];

    it('should emit ExecutionFailureEvent for non-owner', async () => {
      const result = await executeReplaceOwner(newOwner, newOwner);
      const log = findLastLog(result.lastTransaction, 'ExecutionFailure');
      assert.isOk(log);

      const event = log.args as ExecutionFailureEvent;
      assertNumberEqual(event.transactionId, result.transactionId);
    });

    it('should emit ExecutionFailureEvent for existing new owner', async () => {
      const result = await executeReplaceOwner(oldOwner, oldOwner);
      const log = findLastLog(result.lastTransaction, 'ExecutionFailure');
      assert.isOk(log);

      const event = log.args as ExecutionFailureEvent;
      assertNumberEqual(event.transactionId, result.transactionId);
    });

    it('should emit OwnerRemovalEvent', async () => {
      const result = await executeReplaceOwner(oldOwner, newOwner);
      const log = findLastLog(result.lastTransaction, 'OwnerRemoval');
      assert.isOk(log);

      const event = log.args as OwnerRemovalEvent;
      assert.equal(event.owner, oldOwner);
    });

    it('should emit OwnerAdditionEvent', async () => {
      const result = await executeReplaceOwner(oldOwner, newOwner);
      const log = findLastLog(result.lastTransaction, 'OwnerAddition');
      assert.isOk(log);

      const event = log.args as OwnerAdditionEvent;
      assert.equal(event.owner, newOwner);
    });

    it('should remove old owner', async () => {
      await executeReplaceOwner(oldOwner, newOwner);

      assert.notInclude(await wallet.getOwners(), oldOwner);
    });

    it('should add new owner', async () => {
      await executeReplaceOwner(oldOwner, newOwner);

      assert.deepEqual(await wallet.getOwners(), [
        newOwner,
        owners[1],
        owners[2]
      ]);
    });

    it('should revert for not wallet', async () => {
      await assertReverts(async () => {
        await wallet.replaceOwner(oldOwner, newOwner);
      });
    });
  });

  describe('#removeOwner', () => {
    const ownerToRemove = owners[1];

    it('should emit ExecutionFailureEvent for non-owner', async () => {
      const result = await executeRemoveOwner(accounts[4]);
      const log = findLastLog(result.lastTransaction, 'ExecutionFailure');
      assert.isOk(log);

      const event = log.args as ExecutionFailureEvent;
      assertNumberEqual(event.transactionId, result.transactionId);
    });

    it('should emit OwnerRemovalEvent', async () => {
      const result = await executeRemoveOwner(ownerToRemove);
      const log = findLastLog(result.lastTransaction, 'OwnerRemoval');
      assert.isOk(log);

      const event = log.args as OwnerRemovalEvent;
      assert.equal(event.owner, ownerToRemove);
    });

    it('should remove old owner', async () => {
      await executeRemoveOwner(ownerToRemove);

      assert.notInclude(await wallet.getOwners(), ownerToRemove);
    });

    it('should revert for not wallet', async () => {
      await assertReverts(async () => {
        await wallet.removeOwner(ownerToRemove);
      });
    });
  });

  describe('#addOwner', () => {
    const newOwner = accounts[4];

    it('should emit ExecutionFailureEvent for invalid address', async () => {
      const result = await executeAddOwner('0x0');
      const log = findLastLog(result.lastTransaction, 'ExecutionFailure');
      assert.isOk(log);

      const event = log.args as ExecutionFailureEvent;
      assertNumberEqual(event.transactionId, result.transactionId);
    });

    it('should emit ExecutionFailureEvent for existing new owner', async () => {
      const result = await executeAddOwner(owners[0]);
      const log = findLastLog(result.lastTransaction, 'ExecutionFailure');
      assert.isOk(log);

      const event = log.args as ExecutionFailureEvent;
      assertNumberEqual(event.transactionId, result.transactionId);
    });

    it('should emit OwnerAdditionEvent', async () => {
      const result = await executeAddOwner(newOwner);
      const log = findLastLog(result.lastTransaction, 'OwnerAddition');
      assert.isOk(log);

      const event = log.args as OwnerAdditionEvent;
      assert.equal(event.owner, newOwner);
    });

    it('should add new owner', async () => {
      await executeAddOwner(newOwner);

      assert.deepEqual(await wallet.getOwners(), [
        owners[0],
        owners[1],
        owners[2],
        newOwner
      ]);
    });

    it('should revert for not wallet', async () => {
      await assertReverts(async () => {
        await wallet.addOwner(newOwner);
      });
    });
  });
});
