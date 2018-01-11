declare module 'wallet' {
  import {
    AnyContract,
    Contract,
    ContractBase,
    TransactionOptions,
    TransactionResult,
    TruffleArtifacts
  } from 'truffle';
  import { AnyNumber } from 'web3';

  namespace wallet {
    interface Migrations extends ContractBase {
      setCompleted(
        completed: number,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      upgrade(
        address: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;
    }

    interface MultiSigWallet extends ContractBase {
      owners(): Promise<Address[]>;
      required(): Promise<number>;

      addOwner(
        owner: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      getOwners(): Promise<Address[]>;
    }

    interface OwnerAdditionEvent {
      addr: Address;
    }

    interface MigrationsContract extends Contract<Migrations> {
      'new'(options?: TransactionOptions): Promise<Migrations>;
    }

    interface MultiSigWalletContract extends Contract<MultiSigWallet> {
      'new'(
        owners: Address[],
        required: AnyNumber,
        options?: TransactionOptions
      ): Promise<MultiSigWallet>;
    }

    interface WalletArtifacts extends TruffleArtifacts {
      require(name: string): AnyContract;
      require(name: './Migrations.sol'): MigrationsContract;
      require(name: './MultiSigWallet.sol'): MultiSigWalletContract;
    }
  }

  export = wallet;
}
