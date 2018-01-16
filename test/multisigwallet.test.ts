import { assert } from 'chai';

import {
  ContractContextDefinition,
  Method,
  TransactionLog,
  TransactionResult
} from 'truffle';
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
  assertReverts,
  deployWalletFunction,
  findLastLog,
  findLastTransactionId,
  findNewRequirement,
  getData
} from './helpers';

declare const web3: Web3;
declare const artifacts: WalletArtifacts;
declare const contract: ContractContextDefinition;

const MultiSigWalletContract = artifacts.require('MultiSigWallet');

contract('MultiSigWallet', accounts => {
  const owners = [accounts[0], accounts[1], accounts[2]];
  const required = 3;

  let wallet: MultiSigWallet;

  beforeEach(async () => {
    wallet = await MultiSigWalletContract.new(owners, required, {
      from: owners[0]
    });
    assert.isOk(wallet);
  });

  describe('#ctor', () => {
    it('should revert for empty list of owners', async () => {
      await assertReverts(async () => {
        await MultiSigWalletContract.new([], 0);
      });
    });

    it('should revert for zero required', async () => {
      await assertReverts(async () => {
        await MultiSigWalletContract.new(owners, 0);
      });
    });

    it('should create wallet', async () => {
      assert.ok(wallet);
    });

    it('should set required', async () => {
      assert.equal(await wallet.required(), required);
    });

    it('should set owners', async () => {
      assert.deepEqual(await wallet.getOwners(), owners);
    });

    it('should not have any transactions', async () => {
      assert.equal(await wallet.getTransactionCount(true, true), 0);
    });
  });

  describe('#submitTransaction', () => {
    let tx: TransactionResult;

    context('with invalid data', async () => {
      it('should revert for non-existing owner', async () => {
        await assertReverts(async () => {
          const data = await getData(wallet.addOwner, owners[0]);
          await wallet.submitTransaction(wallet.address, 0, data, {
            from: accounts[9]
          });
        });
      });
    });

    context('with valid data', async () => {
      beforeEach(async () => {
        const data = await getData(wallet.addOwner, owners[0]);
        tx = await wallet.submitTransaction(wallet.address, 0, data, {
          from: owners[0]
        });
      });

      it('should emit SubmissionEvent', async () => {
        const log = findLastLog(tx, 'Submission');
        assert.isOk(log);

        const event = log.args as SubmissionEvent;
        assert.isOk(event);
      });

      it('should store one pending transaction', async () => {
        const transactionCount = await wallet.getTransactionCount(true, false);
        assert.equal(transactionCount, 1);

        const transactionId = findLastTransactionId(tx);

        const transactionIds = await wallet.getTransactionIds(
          0,
          1,
          true,
          false
        );
        assert.deepEqual(transactionIds, [transactionId]);
      });

      it('should set one valid confirmation for transaction', async () => {
        const transactionId = findLastTransactionId(tx);

        const confirmationCount = await wallet.getConfirmationCount(
          transactionId
        );
        assert.equal(confirmationCount, 1);

        const confirmations = await wallet.getConfirmations(transactionId);
        assert.deepEqual(confirmations, [owners[0]]);
      });
    });
  });

  describe('#confirmTransaction', () => {
    let transactionId: Web3.AnyNumber;
    let tx: TransactionResult;

    beforeEach(async () => {
      transactionId = findLastTransactionId(
        await wallet.submitTransaction(
          wallet.address,
          0,
          await getData(wallet.addOwner, accounts[9]),
          { from: owners[0] }
        )
      );
      tx = await wallet.confirmTransaction(transactionId, { from: owners[1] });
    });

    context('with invalid data', async () => {
      it('should revert for non-existing owner', async () => {
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

    context('with valid data', async () => {
      it('should emit ConfirmationEvent', async () => {
        const log = findLastLog(tx, 'Confirmation');
        assert.isOk(log);

        const event = log.args as ConfirmationEvent;
        assert.isOk(event);
      });

      it('should set new valid confirmation for transaction', async () => {
        const confirmationCount = await wallet.getConfirmationCount(
          transactionId
        );
        assert.equal(confirmationCount, 2);

        const confirmations = await wallet.getConfirmations(transactionId);
        assert.deepEqual(confirmations, [owners[0], owners[1]]);
      });
    });
  });

  describe('#revokeConfirmation', () => {
    let transactionId: Web3.AnyNumber;
    let tx: TransactionResult;

    context('with invalid data', async () => {
      it('should revert for non-existing owner', async () => {
        await assertReverts(async () => {
          await wallet.revokeConfirmation(1, { from: accounts[9] });
        });
      });

      it('should revert for non-existing transaction', async () => {
        await assertReverts(async () => {
          await wallet.revokeConfirmation(2, { from: owners[0] });
        });
      });
    });

    context('with valid data', async () => {
      beforeEach(async () => {
        transactionId = findLastTransactionId(
          await wallet.submitTransaction(
            wallet.address,
            0,
            await getData(wallet.addOwner, accounts[9]),
            { from: owners[0] }
          )
        );
        tx = await wallet.revokeConfirmation(transactionId, {
          from: owners[0]
        });
      });

      it('should emit RevocationEvent', async () => {
        const log = findLastLog(tx, 'Revocation');
        assert.isOk(log);

        const event = log.args as RevocationEvent;
        assert.isOk(event);
      });

      it('should revoke confirmation for transaction', async () => {
        const confirmationCount = await wallet.getConfirmationCount(
          transactionId
        );
        assert.equal(confirmationCount, 0);
      });

      it('should revert for not confirmed transaction', async () => {
        await assertReverts(async () => {
          await wallet.revokeConfirmation(2, { from: owners[0] });
        });
      });
    });
  });

  describe('#executeTransaction', () => {
    let transactionId: Web3.AnyNumber;
    let tx: TransactionResult;

    context('with invalid data', async () => {
      it('should revert for non-existing owner', async () => {
        await assertReverts(async () => {
          await wallet.executeTransaction(1, { from: accounts[9] });
        });
      });

      it('should revert for non-existing transaction', async () => {
        await assertReverts(async () => {
          await wallet.executeTransaction(2, { from: owners[0] });
        });
      });
    });

    context('with valid data', async () => {
      beforeEach(async () => {
        transactionId = findLastTransactionId(
          await wallet.submitTransaction(
            wallet.address,
            0,
            await getData(wallet.addOwner, accounts[9]),
            { from: owners[0] }
          )
        );
      });

      it('should revert for not confirmed transaction', async () => {
        await assertReverts(async () => {
          await wallet.executeTransaction(transactionId, { from: owners[1] });
        });
      });

      beforeEach(async () => {
        await wallet.confirmTransaction(transactionId, { from: owners[1] });
        tx = await wallet.confirmTransaction(transactionId, {
          from: owners[2]
        });
      });

      it('should emit ExecutionEvent', async () => {
        const log = findLastLog(tx, 'Execution');
        assert.isOk(log);

        const event = log.args as ExecutionEvent;
        assert.isOk(event);
      });

      it('should set transaction as executed', async () => {
        const transactionCount = await wallet.getTransactionCount(false, true);
        assert.equal(transactionCount, 1);

        const transactionIds = await wallet.getTransactionIds(
          0,
          1,
          false,
          true
        );
        assert.deepEqual(transactionIds, [transactionId]);
      });
    });
  });

  describe('#changeRequirement', () => {
    let tx: TransactionResult;
    const newRequired = 2;

    context('with invalid data', async () => {
      it('should revert for not wallet', async () => {
        await assertReverts(async () => {
          await wallet.changeRequirement(newRequired);
        });
      });

      it('should emit ExecutionFailureEvent for invalid requirements', async () => {
        let log: TransactionLog;
        let event: ExecutionFailureEvent;
        tx = await deployWalletFunction(
          wallet,
          wallet.changeRequirement,
          owners[0],
          0
        );

        log = findLastLog(tx, 'ExecutionFailure');
        assert.isOk(log);
        event = log.args;
        assert.isOk(event);

        tx = await deployWalletFunction(
          wallet,
          wallet.changeRequirement,
          owners[0],
          4
        );
        log = findLastLog(tx, 'ExecutionFailure');
        assert.isOk(log);
        event = log.args;
        assert.isOk(event);
      });
    });

    context('with valid data', async () => {
      beforeEach(async () => {
        tx = await deployWalletFunction(
          wallet,
          wallet.changeRequirement,
          owners[0],
          newRequired
        );
      });

      it('should emit RequirementChangeEvent', async () => {
        const log = findLastLog(tx, 'RequirementChange');
        assert.isOk(log);
        const event = log.args as RequirementChangeEvent;
        assert.isOk(event);
      });

      it('should change `required` attribute', async () => {
        const walletRequired = findNewRequirement(tx);
        assert.equal(walletRequired, newRequired);
      });
    });
  });

  describe('#replaceOwner', () => {
    let tx: TransactionResult;
    const oldOwner = owners[0];
    const newOwner = accounts[4];

    context('with invalid data', async () => {
      it('should revert for not wallet', async () => {
        await assertReverts(async () => {
          await wallet.replaceOwner(oldOwner, newOwner);
        });
      });

      it('should emit ExecutionFailureEvent for non-existing owner', async () => {
        tx = await deployWalletFunction(
          wallet,
          wallet.replaceOwner,
          owners[0],
          newOwner,
          newOwner
        );

        const log = findLastLog(tx, 'ExecutionFailure');
        assert.isOk(log);
        const event = log.args as ExecutionFailureEvent;
        assert.isOk(event);
      });

      it('should emit ExecutionFailureEvent for existing new owner', async () => {
        tx = await deployWalletFunction(
          wallet,
          wallet.replaceOwner,
          owners[0],
          oldOwner,
          oldOwner
        );

        const log = findLastLog(tx, 'ExecutionFailure');
        assert.isOk(log);
        const event = log.args as ExecutionFailureEvent;
        assert.isOk(event);
      });
    });

    context('with valid data', async () => {
      beforeEach(async () => {
        tx = await deployWalletFunction(
          wallet,
          wallet.replaceOwner,
          owners[0],
          oldOwner,
          newOwner
        );
      });

      it('should emit OwnerRemovalEvent', async () => {
        const log = findLastLog(tx, 'OwnerRemoval');
        assert.isOk(log);
        const event = log.args as OwnerRemovalEvent;
        assert.isOk(event);
      });

      it('should emit OwnerAdditionEvent', async () => {
        const log = findLastLog(tx, 'OwnerAddition');
        assert.isOk(log);
        const event = log.args as OwnerAdditionEvent;
        assert.isOk(event);
      });

      it('should remove old owner', async () => {
        assert.notInclude(await wallet.getOwners(), oldOwner);
      });

      it('should add new owner', async () => {
        assert.deepEqual(await wallet.getOwners(), [
          newOwner,
          owners[1],
          owners[2]
        ]);
      });
    });
  });

  describe('#removeOwner', () => {
    let tx: TransactionResult;
    const ownerToRemove = owners[1];

    context('with invalid data', async () => {
      it('should revert for not wallet', async () => {
        await assertReverts(async () => {
          await wallet.removeOwner(ownerToRemove);
        });
      });

      it('should emit ExecutionFailureEvent for non-existing owner', async () => {
        tx = await deployWalletFunction(
          wallet,
          wallet.removeOwner,
          owners[0],
          accounts[4]
        );

        const log = findLastLog(tx, 'ExecutionFailure');
        assert.isOk(log);
        const event = log.args as ExecutionFailureEvent;
        assert.isOk(event);
      });
    });

    context('with valid data', async () => {
      beforeEach(async () => {
        tx = await deployWalletFunction(
          wallet,
          wallet.removeOwner,
          owners[0],
          ownerToRemove
        );
      });

      it('should emit OwnerRemovalEvent', async () => {
        const log = findLastLog(tx, 'OwnerRemoval');
        assert.isOk(log);
        const event = log.args as OwnerRemovalEvent;
        assert.isOk(event);
      });

      it('should remove old owner', async () => {
        assert.notInclude(await wallet.getOwners(), ownerToRemove);
      });
    });
  });

  describe('#addOwner', () => {
    let tx: TransactionResult;
    const newOwner = accounts[4];

    context('with invalid data', async () => {
      it('should revert for not wallet', async () => {
        await assertReverts(async () => {
          await wallet.addOwner(newOwner);
        });
      });

      it('should emit ExecutionFailureEvent for invalid address', async () => {
        tx = await deployWalletFunction(
          wallet,
          wallet.addOwner,
          owners[0],
          '0'
        );

        const log = findLastLog(tx, 'ExecutionFailure');
        assert.isOk(log);
        const event = log.args as ExecutionFailureEvent;
        assert.isOk(event);
      });

      it('should emit ExecutionFailureEvent for existing new owner', async () => {
        tx = await deployWalletFunction(
          wallet,
          wallet.addOwner,
          owners[0],
          owners[0]
        );

        const log = findLastLog(tx, 'ExecutionFailure');
        assert.isOk(log);
        const event = log.args as ExecutionFailureEvent;
        assert.isOk(event);
      });
    });

    context('with valid data', async () => {
      beforeEach(async () => {
        tx = await deployWalletFunction(
          wallet,
          wallet.addOwner,
          owners[0],
          newOwner
        );
      });

      it('should emit OwnerAdditionEvent', async () => {
        const log = findLastLog(tx, 'OwnerAddition');
        assert.isOk(log);
        const event = log.args as OwnerAdditionEvent;
        assert.isOk(event);
      });

      it('should add new owner', async () => {
        assert.deepEqual(await wallet.getOwners(), [
          owners[0],
          owners[1],
          owners[2],
          newOwner
        ]);
      });
    });
  });
});
