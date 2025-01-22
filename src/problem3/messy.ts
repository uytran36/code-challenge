interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {} // Props does not have any properties, it can be removed
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; // children not used in the component
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    // type any can lead to runtime errors, it is better to use a specific type
    switch (blockchain) {
      case "Osmosis": // Using hardcoded values is not recommended, it can be difficult to maintain and extend
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain); // property blockchain is not defined in WalletBalance
        if (lhsPriority > -99) {
          // lhsPriority is not defined
          if (balance.amount <= 0) {
            // maybe wrong condition, it should be balance.amount > 0
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // sorting is not effective, which can be computationally expensive if the list is large. It can be optimized
        const leftPriority = getPriority(lhs.blockchain); // property blockchain is not defined in WalletBalance
        const rightPriority = getPriority(rhs.blockchain); // property blockchain is not defined in WalletBalance
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]); // prices is not used in the function, it might not be effective

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map( // formattedBalances should be used instead of sortedBalances
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
