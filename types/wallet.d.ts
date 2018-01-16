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
      required(): AnyNumber;

      addOwner(
        owner: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      removeOwner(
        owner: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      replaceOwner(
        owner: Address,
        newOwner: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      changeRequirement(
        required: AnyNumber,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      submitTransaction(
        destination: Address,
        value: AnyNumber,
        data: string,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      confirmTransaction(
        transactionId: AnyNumber,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      revokeConfirmation(
        transactionId: AnyNumber,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      executeTransaction(
        transactionId: AnyNumber,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      getConfirmationCount(transactionId: AnyNumber): Promise<AnyNumber>;

      getTransactionCount(
        pending: boolean,
        executed: boolean
      ): Promise<AnyNumber>;

      getOwners(): Promise<Address[]>;

      getConfirmations(transactionId: AnyNumber): Promise<Address[]>;

      getTransactionIds(
        from: AnyNumber,
        to: AnyNumber,
        pending: boolean,
        executed: boolean
      ): Promise<AnyNumber[]>;
    }

    interface ConfirmationEvent {
      sender: Address;
      transactionId: AnyNumber;
    }
    interface RevocationEvent {
      sender: Address;
      transactionId: AnyNumber;
    }

    interface ExecutionEvent {
      transactionId: AnyNumber;
    }

    interface ExecutionFailureEvent {
      transactionId: AnyNumber;
    }

    interface SubmissionEvent {
      transactionId: AnyNumber;
    }

    interface OwnerAdditionEvent {
      owner: Address;
    }

    interface OwnerRemovalEvent {
      owner: Address;
    }

    interface RequirementChangeEvent {
      transactionId: AnyNumber;
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
