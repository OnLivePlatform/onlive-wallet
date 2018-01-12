import { assert } from 'chai';

import { ContractContextDefinition, TransactionResult } from 'truffle';
import * as Web3 from 'web3';

import {
  ConfirmationEvent,
  ExecutionEvent,
  MultiSigWallet,
  OwnerAdditionEvent,
  SubmissionEvent,
  WalletArtifacts
} from 'wallet';

import { assertReverts, findLastLog, getData } from './helpers';

declare const web3: Web3;
declare const artifacts: WalletArtifacts;
declare const contract: ContractContextDefinition;

const MultiSigWalletContract = artifacts.require('MultiSigWallet');

contract('MultiSigWallet', accounts => {
  const owners = [accounts[0], accounts[1], accounts[2]];
  const required = 2;

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
  });

  describe('#submitTransaction', () => {
    let tx: TransactionResult;

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

    it('should emit ConfirmationEvent', async () => {
      const log = findLastLog(tx, 'Confirmation');
      assert.isOk(log);

      const event = log.args as ConfirmationEvent;
      assert.isOk(event);
    });

    it('should store one pending transaction', async () => {
      const log = findLastLog(tx, 'Submission');
      assert.isOk(log);

      const paramName = 'transactionId';
      const transactionId = log.args[paramName] as Web3.AnyNumber;
      assert.isOk(transactionId);

      const transactionIds = await wallet.getTransactionIds(0, 1, true, false);

      assert.deepEqual(transactionIds, [transactionId]);
    });
  });

  describe('#executeTransaction', () => {
    let transactionId: Web3.AnyNumber;

    beforeEach(async () => {
      transactionId = await submitAddOwner(wallet, accounts[9], owners[0]);
    });

    it('should emit ExecutionEvent', async () => {
      const tx = await wallet.executeTransaction(transactionId.valueOf(), {
        from: owners[0]
      });
      const log = findLastLog(tx, 'Execute');
      assert.isOk(log);

      const event = log.args as ExecutionEvent;
      assert.isOk(event);
    });
  });

  describe('#addOwner', () => {
    let transactionId: Web3.AnyNumber;

    beforeEach(async () => {
      const newOwner = accounts[9];
      transactionId = await submitAddOwner(wallet, newOwner, owners[0]);
    });

    it('should emit OwnerAdditionEvent', async () => {
      const tx = await wallet.executeTransaction(transactionId.valueOf(), {
        from: owners[0]
      });
      const log = findLastLog(tx, 'OwnerAddition');
      assert.isOk(log);

      const event = log.args as OwnerAdditionEvent;
      assert.isOk(event);
    });
  });
});

async function submitAddOwner(
  wallet: MultiSigWallet,
  newOwner: Address,
  from: Address
): Promise<Web3.AnyNumber> {
  const data = await getData(wallet.addOwner, newOwner);
  const tx = await wallet.submitTransaction(wallet.address, 0, data, { from });

  const log = findLastLog(tx, 'Submission');
  assert.isOk(log);

  const paramName = 'transactionId';
  const transactionId = log.args[paramName] as Web3.AnyNumber;
  assert.isOk(transactionId);

  return transactionId;
}
