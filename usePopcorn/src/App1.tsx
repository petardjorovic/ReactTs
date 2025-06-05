import { useEffect, useState } from "react";

type FetchData = {
  amont: number;
  base: string;
  date: string;
  rates: {
    [prop: string]: number;
  };
};

export default function App1() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [output, setOutput] = useState("OUTPUT");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function getCalculatedAmount() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with converting currency.");
        const data: FetchData = await res.json();
        setOutput(data.rates[to].toString());
        setError("");
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err.message);
            console.log(err);
          }
        } else {
          setError("Unknown Error");
          console.log(err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (!amount) return setOutput("OUTPUT");
    if (from === to) {
      setOutput(amount);
      return;
    }
    getCalculatedAmount();

    return () => {
      controller.abort();
    };
  }, [amount, from, to]);

  return (
    <div className="calculator-content">
      <input
        type="number"
        placeholder="Enter amount..."
        className="input-amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <select
        name="from"
        id="from"
        className="input-from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        name="to"
        id="to"
        className="input-to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {isLoading ? (
        <div className="loading">
          <div>LOADING...</div>
        </div>
      ) : (
        <p className="amount-output">
          {error ? error : `${output} ${amount && to}`}
        </p>
      )}
    </div>
  );
}
