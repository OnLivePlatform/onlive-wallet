import { Deployer, TruffleArtifacts } from 'truffle';

declare const artifacts: TruffleArtifacts;

const MultiSigWallet = artifacts.require('./MultiSigWallet.sol');

async function deploy(deployer: Deployer) {
  const owners = [
    '0x594F5804Eb71d6aB16753D7247D7DD031245fBE7',
    '0x886351b3135Ea6523BA495f27EdE6982D6936E41',
    '0xb2514c463784333aDA49Aca9394515F04bB01471',
    '0x529E8Fc0AE96409b89f7255eFe9eBE3A55780F2f',
    '0x6633b7233B63521b4697bBe92100Cf4A1BF70829'
  ];
  const required = 3;

  await deployer.deploy(MultiSigWallet, owners, required);
}

function migrate(deployer: Deployer) {
  deployer.then(() => deploy(deployer));
}

export = migrate;
