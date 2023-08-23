import { AddressExtended } from "@/lib/bitcoin";
import { buildUtxoSet } from "@/lib/bitcoin";

export default async function AddressTable() {
  const addressList: AddressExtended[] = await buildUtxoSet("testnet");

  return (
    <div>
      <table className="table-fixed lg:table-auto w-full">
        <thead>
          <tr className="text-sm md:text-lg">
            <th className="md:text-left md:pl-1">Address</th>
            <th>Type</th>
            <th>Balance (Confirmed)</th>
            <th>Balance (Pending)</th>
            <th>Balance (Total)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary">
          {addressList
            .filter((addr) => addr.total > 0)
            .map((addr) => (
              <tr
                key={addr.address}
                className="hover:bg-orange-100 hover:font-semibold dark:hover:bg-orange-900"
              >
                <td className="truncate md:whitespace-normal hover:text-clip pl-1">
                  {addr.address}
                </td>
                <td className="text-center">{addr.type}</td>
                <td className="text-right">{addr.balance}</td>
                <td className="text-right">{addr.pending}</td>
                <td className="text-right pr-1">{addr.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
