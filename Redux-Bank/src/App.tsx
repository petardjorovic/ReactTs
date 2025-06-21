import AccountOperations from "./components/AccountOperations";
import BalanceDisplay from "./components/BalanceDisplay";
import CreateCustomer from "./components/CreateCustomer";
import Customer from "./components/Customer";
import { useAppSelector } from "./store/store";

function App() {
  const { fullName } = useAppSelector((store) => store.customerStore);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
