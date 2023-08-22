import { fetchAddresses, Address } from "@/lib/esplora";
import { buildUtxoSet } from "@/lib/bitcoin";

export default async function AddressTable() {
  const fakeAddress: string[] = await buildUtxoSet("testnet");
  console.log(fakeAddress);

  const addresses: Address[] = await fetchAddresses(fakeAddress);

  return (
    <table>
      <thead>
        <tr>
          <th>Address</th>
          <th>Balance (Confirmed)</th>
          <th>Balance (Pending)</th>
          <th>Balance (Total)</th>
        </tr>
      </thead>
      <tbody>
        {addresses
          .filter((addr) => addr.total > 0)
          .map((addr) => (
            <tr key={addr.address}>
              <td>{addr.address}</td>
              <td>{addr.balance}</td>
              <td>{addr.pending}</td>
              <td>{addr.total}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
