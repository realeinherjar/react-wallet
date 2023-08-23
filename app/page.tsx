// components
import AddressTable from "./components/AddressTable";
import ButtonsHeader from "./components/ButtonsHeader";

export default function home() {
  return (
    <main>
      <h1 className="text-secondary dark:text-primary text-center md:text-left text-5xl md:text-6xl mb-2 mt-1 mx-2">
        Bitcoin Wallet
      </h1>
      <ButtonsHeader />
      <AddressTable />
    </main>
  );
}
