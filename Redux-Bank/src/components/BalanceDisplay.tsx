import { useAppSelector } from "../store/store";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useAppSelector((store) => store.accountStore);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
