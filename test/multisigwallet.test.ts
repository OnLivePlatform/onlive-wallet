import { assert } from 'chai';
import { without } from 'ramda';

import { ContractContextDefinition } from 'truffle';
import * as Web3 from 'web3';

import { MultiSigWallet, OwnerAdditionEvent, WalletArtifacts } from 'wallet';

import { assertReverts, findLastLog } from './helpers';
import { MultiSigWalletTestContext } from './context';

declare const web3: Web3;
declare const artifacts: WalletArtifacts;
declare const contract: ContractContextDefinition;

const MultiSigWalletContract = artifacts.require('./MultiSigWallet.sol');

contract('MultiSigWallet', accounts => {
  const owners = [accounts[0], accounts[1], accounts[2]];
  const required = 2;

  async function createWallet(options: any = {}) {
    return await MultiSigWalletContract.new(
      options.owners || owners,
      options.required || required,
      { from: options.from || owners[0] }
    );
  }

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
      const wallet = await createWallet();
      assert.ok(wallet);
    });

    it('should set required', async () => {
      const wallet = await createWallet();
      assert.equal(await wallet.required(), required);
    });

    it('should set owners', async () => {
      const wallet = await createWallet();
      assert.deepEqual(await wallet.getOwners(), owners);
    });
  });

  const ctx = new MultiSigWalletTestContext<MultiSigWallet>(
    without(owners, accounts),
    owners,
    required
  );

  beforeEach(async () => {
    ctx.wallet = await createWallet({ from: ctx.owners[0] });
  });

  describe('#addOwner', () => {
    testAddOwner(ctx);
  });
});

export function testAddOwner(ctx: MultiSigWalletTestContext<MultiSigWallet>) {
  const newOwner = ctx.accounts[0];

  it('should emit OwnerAdditionEvent', async () => {
    const tx = await ctx.wallet.addOwner(newOwner, {
      from: ctx.owners[0]
    });

    const log = findLastLog(tx, 'OwnerAddition');
    assert.isOk(log);

    const event = log.args as OwnerAdditionEvent;
    assert.isOk(event);
  });

  it('should add new owner', async () => {
    await ctx.wallet.addOwner(newOwner, {
      from: ctx.owners[0]
    });

    const owners = await ctx.wallet.getOwners();

    assert.equal(owners.length, 4);
    assert.equal(owners[3], newOwner);
  });
}
