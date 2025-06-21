import { useAppSelector } from "../store/store";

function Customer() {
  const { fullName } = useAppSelector((store) => store.customerStore);
  return <h2>👋 Welcome, {fullName}</h2>;
}

export default Customer;
