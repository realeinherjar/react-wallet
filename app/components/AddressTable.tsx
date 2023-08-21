
import { getBalances, Address } from "@/lib/esplora";

export default async function AddressTable() {
  // TODO: delete fake data, this will be populated by the API
  const fakeAddress: string[] = [
    "tb1phfzpptykdhs6803zwa9sprhjhlr7lwp94matqugwrx3qh50c33jsl9a8kp",
    "tb1p04q02c56dqdn786yle9kgwymzquellpp3x6jg5znthhytxm9frnspddmmr",
    "tb1p4km97uu685e7knem0umv4jyul0dwghff5xxdzfl2ujtadeln6tns702h80",
    "tb1ph3q0utagzyylk6qxuaf98yzgfteesfmuajs5y3l5gyr4f8ktsldqp6rwmn",
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
