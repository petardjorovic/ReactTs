import { createContext, useContext, useState } from "react";

// type CounterProps = {
//   iconIncrease?: string;
//   iconDecrease?: string;
//   label?: string;
//   hideLabel?: boolean;
//   hideIncrease?: boolean;
//   hideDecrease?: boolean;
// };

type CounterContextType = {
  count: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
};

// 1. Create a context
const CounterContext = createContext<CounterContextType | undefined>(undefined);

// 2. Create parent component
function Counter({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const handleIncrease = () => setCount((c) => c + 1);
  const handleDecrease = () => setCount((c) => c - 1);

  return (
    <CounterContext.Provider value={{ count, handleIncrease, handleDecrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

// 3. Create child components to help implementing the common task

function Count() {
  const context = useContext(CounterContext);
  if (!context)
    throw new Error("useContext must be use within contextProvider");
  return <span>{context.count}</span>;
}

function Increase({ icon }: { icon: string }) {
  const context = useContext(CounterContext);
  if (!context)
    throw new Error("useContext must be use within contextProvider");
  return <button onClick={context.handleIncrease}>{icon}</button>;
}

function Decrease({ icon }: { icon: string }) {
  const context = useContext(CounterContext);
  if (!context)
    throw new Error("useContext must be use within contextProvider");
  return <button onClick={context.handleDecrease}>{icon}</button>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>;
}

// 4. Add child Component as properties to parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
