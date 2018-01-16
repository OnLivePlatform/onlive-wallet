import * as Web3 from 'web3';

import { assert } from 'chai';
import { findLast, propEq } from 'ramda';
import { Method, TransactionLog, TransactionResult } from 'truffle';
import { MultiSigWallet } from 'wallet';

declare const web3: Web3;

export async function assertReverts(func: () => void) {
  try {
    await func();
  } catch (error) {
    assertRevertError(error);
    return;
  }
  assert.fail({}, {}, 'Should have reverted');
}

export function assertRevertError(error: { message: string }) {
  if (error && error.message) {
    if (error.message.search('revert') === -1) {
      assert.fail(
        error,
        {},
        'Expected revert error, instead got: ' + error.message
      );
    }
  } else {
    assert.fail(error, {}, 'Expected revert error');
  }
}

export function findLastLog(
  trans: TransactionResult,
  event: string
): TransactionLog {
  return findLast(propEq('event', event))(trans.logs);
}

export async function getData(func: any, ...args: any[]): Promise<string> {
  const method = (func as any) as Method;
  const request = await method.request(...args);
  const [param] = request.params;
  return param.data;
}

export function findLastTransactionId(tx: TransactionResult) {
  const log = findLastLog(tx, 'Submission');
  assert.isOk(log);

  const paramName = 'transactionId';
  const transactionId = log.args[paramName] as Web3.AnyNumber;
  assert.isOk(transactionId);

  return transactionId;
}

export function findNewRequirement(tx: TransactionResult) {
  const log = findLastLog(tx, 'RequirementChange');
  assert.isOk(log);

  const paramName = 'required';
  const newRequired = log.args[paramName] as Web3.AnyNumber;
  assert.isOk(newRequired);

  return newRequired;
}

export async function deployWalletFunction(
  wallet: MultiSigWallet,
  func: any,
  from: Address,
  ...args: any[]
): Promise<TransactionResult> {
  const method = (func as any) as Method;
  const owners = await wallet.getOwners();
  let tx: TransactionResult;

  tx = await wallet.submitTransaction(
    wallet.address,
    0,
    await getData(method, ...args),
    { from }
  );
  assert.isOk(tx);

  const transactionId = findLastTransactionId(tx);
  for (let i = 1; i < owners.length; i++) {
    tx = await wallet.confirmTransaction(transactionId, { from: owners[i] });
    assert.isOk(tx);
  }
  return tx;
}
