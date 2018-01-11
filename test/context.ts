import { MultiSigWallet } from 'wallet';

export class MultiSigWalletTestContext<T extends MultiSigWallet> {
  public wallet: T;

  public constructor(
    public accounts: Address[],
    public owners: Address[],
    public required: number
  ) {}
}
