import { assert } from 'chai';

import { ContractContextDefinition } from 'truffle';
import * as Web3 from 'web3';

import { MultiSigWallet, OwnerAdditionEvent, WalletArtifacts } from 'wallet';

import { assertReverts, findLastLog } from './helpers';

declare const web3: Web3;
declare const artifacts: WalletArtifacts;
declare const contract: ContractContextDefinition;

const MultiSigWalletContract = artifacts.require('./MultiSigWallet.sol');

contract('MultiSigWallet', accounts => {
  const owners = [accounts[0], accounts[1], accounts[2]];
  const required = 2;

  let wallet: MultiSigWallet;

  beforeEach(async () => {
    wallet = await MultiSigWalletContract.new(owners, required, {
      from: owners[0]
    });
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

  describe('#addOwner', () => {
    const newOwner = accounts[0];

    it('should emit OwnerAdditionEvent', async () => {
      const tx = await wallet.addOwner(newOwner, {
        from: owners[0]
      });

      const log = findLastLog(tx, 'OwnerAddition');
      assert.isOk(log);

      const event = log.args as OwnerAdditionEvent;
      assert.isOk(event);
    });

    it('should add new owner', async () => {
      await wallet.addOwner(newOwner, {
        from: owners[0]
      });

      const walletOwners = await wallet.getOwners();

      assert.equal(owners.length, 4);
      assert.equal(owners[3], newOwner);
    });
  });
});
