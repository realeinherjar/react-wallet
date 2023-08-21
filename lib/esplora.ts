const base_address = "https://mempool.space/testnet/api"; //TODO: change dynamically to mainnet/testnet
export interface Address {
  address: string;
  balance: number;
  pending: number;
  total: number;
}

export async function getBalance(address: string): Promise<Address> {
  try {
    const response = await fetch(
      `https://mempool.space/testnet/api/address/${address}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const json = await response.json();

    // Calculate the balance based on funded_txo_sum and spent_txo_sum
    const confirmedFundedTxoSum: number = json.chain_stats.funded_txo_sum;
    const confirmedSpentTxoSum: number = json.chain_stats.spent_txo_sum;
    const pendingFundedTxoSum: number = json.mempool_stats.funded_txo_sum;
    const balance: number = confirmedFundedTxoSum - confirmedSpentTxoSum;
    const pending: number = pendingFundedTxoSum;
    const total: number = balance + pending;

    // Create an instance of the Address interface with the balance field
    const addressData: Address = {
      address: json.address,
      balance: balance,
      pending: pending,
      total: total,
    };
    return addressData;
  } catch (error: any) {
    throw new Error(`Failed to fetch address data: ${error.message}`);
  }
}

export function getBalances(addresses: string[]): Promise<Address[]> {
  return Promise.all(addresses.map((address) => getBalance(address)));
}