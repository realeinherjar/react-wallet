const baseAddress = "https://mempool.space/testnet/api"; //TODO: change dynamically to mainnet/testnet

export interface Address {
  address: string;
  balance: number;
  pending: number;
  total: number;
  tx_count: number;
}

// NOTE: this needs to match the TransactionInput interface from bitcoinjs-lib
export interface TxId {
  hash: string;
  index: number;
}

export interface Utxo {
  address: string;
  txids: TxId[];
  value: number;
}

export async function fetchAddress(address: string): Promise<Address> {
  try {
    const response = await fetch(`${baseAddress}/address/${address}`, {
      cache: "no-store",
    });

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
    const tx_count: number =
      json.chain_stats.tx_count + json.mempool_stats.tx_count;

    // Create an instance of the Address interface with the balance field
    const addressData: Address = {
      address: json.address,
      balance: balance,
      pending: pending,
      total: total,
      tx_count: tx_count,
    };
    return addressData;
  } catch (error: any) {
    throw new Error(`Failed to fetch address data: ${error.message}`);
  }
}

export function fetchAddresses(addresses: string[]): Promise<Address[]> {
  return Promise.all(addresses.map((address) => fetchAddress(address)));
}

export function hasBalance(addresses: Address): boolean {
  return addresses.total > 0;
}

export async function fetchUtxo(address: string): Promise<Utxo> {
  try {
    const response = await fetch(`${baseAddress}/address/${address}/utxo`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const json = await response.json();

    // get the list of txids
    const txids: TxId[] = json.map((utxo: any) => {
      return { hash: utxo.txid, index: utxo.vout };
    });

    const utxoData: Utxo = {
      address: address,
      txids: txids,
      value: json.reduce((sum: number, utxo: any) => sum + utxo.value, 0),
    };
    return utxoData;
  } catch (error: any) {
    throw new Error(`Failed to fetch utxo data: ${error.message}`);
  }
}

export async function fetchFeeEstimate(block: number = 1): Promise<number> {
  try {
    const response = await fetch(`${baseAddress}/fee-estimates`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const json = await response.json();
    const feeEstimate: number = json[block.toString()];
    return feeEstimate;
  } catch (error: any) {
    throw new Error(`Failed to fetch fee estimates: ${error.message}`);
  }
}

export async function broadcastTransaction(
  transactionHex: string
): Promise<string> {
  try {
    const response = await fetch(`${baseAddress}/tx`, {
      method: "POST",
      body: JSON.stringify(transactionHex),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const json = await response.json();
    return json.txid;
  } catch (error: any) {
    throw new Error(`Failed to fetch fee estimates: ${error.message}`);
  }
}
