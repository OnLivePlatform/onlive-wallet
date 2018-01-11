import * as Web3 from 'web3';

import { assert } from 'chai';
import { findLast, propEq } from 'ramda';
import { Method, TransactionLog, TransactionResult } from 'truffle';

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
