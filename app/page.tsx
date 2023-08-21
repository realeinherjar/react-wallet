// components
import AddressTable from "./components/AddressTable";

export default function home() {
  return (
    <main className="bg-gray-100">
      <h2>Bitcoin Wallet</h2>
      <AddressTable />
    </main>
  );
}
