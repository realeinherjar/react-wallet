import { AddressExtended } from "@/lib/bitcoin";
import { buildUtxoSet } from "@/lib/bitcoin";

export default async function AddressTable() {
  const addressList: AddressExtended[] = await buildUtxoSet("testnet");

  return (
    <table>
      <thead>
        <tr>
          <th>Address</th>
          <th>Type</th>
          <th>Balance (Confirmed)</th>
          <th>Balance (Pending)</th>
          <th>Balance (Total)</th>
        </tr>
      </thead>
      <tbody>
        {addressList
          .filter((addr) => addr.total > 0)
          .map((addr) => (
            <tr key={addr.address}>
              <td>{addr.address}</td>
              <td>{addr.type}</td>
              <td>{addr.balance}</td>
              <td>{addr.pending}</td>
              <td>{addr.total}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
