// components
import AddressTable from "./components/AddressTable";
import RefreshButton from "./components/RefreshButton";

export default function home() {
  return (
    <main className="bg-gray-100">
      <h2>Bitcoin Wallet</h2>
      <RefreshButton />
      <AddressTable />
    </main>
  );
}
