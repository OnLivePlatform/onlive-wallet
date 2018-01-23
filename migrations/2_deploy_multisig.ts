import { Deployer, TruffleArtifacts } from 'truffle';
import * as Web3 from 'web3';

declare const artifacts: TruffleArtifacts;
declare const web3: Web3;

const MultiSigWallet = artifacts.require('./MultiSigWallet.sol');

async function deploy(deployer: Deployer) {
  const owners = web3.eth.accounts.slice(0, 5);
  const required = 3;

  await deployer.deploy(MultiSigWallet, owners, required);
}

function migrate(deployer: Deployer) {
  deployer.then(() => deploy(deployer));
}

export = migrate;
