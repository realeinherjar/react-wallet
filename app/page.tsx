// components
import Balance from "./components/Balance";
import AddressTable from "./components/AddressTable";
import ButtonsHeader from "./components/ButtonsHeader";

export default function home() {
  return (
    <main>
      <div className="flex justify-between items-center shrink">
        <h1 className="text-secondary dark:text-primary text-5xl mb-2 mt-1 ml-2 w-1/2">
          Bitcoin Wallet
        </h1>
        <Balance balance={5000} />
      </div>
      <ButtonsHeader />
      <AddressTable />
    </main>
  );
}
