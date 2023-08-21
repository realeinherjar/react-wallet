import { getBalances, Address } from "@/lib/esplora";
import { getReceiveAddress, getChangeAddress } from "@/lib/bitcoin";

export default async function AddressTable() {
  // TODO: delete fake data, this will be populated by the API
  const fakeAddress: string[] = [
    getReceiveAddress(0, "testnet"),
    getReceiveAddress(1, "testnet"),
    getChangeAddress(0, "testnet"),
    getChangeAddress(1, "testnet"),
  ];

  const addresses: Address[] = await getBalances(fakeAddress);

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
