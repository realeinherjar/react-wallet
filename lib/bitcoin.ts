import { mnemonicToSeedSync } from "bip39";
import { BIP32Factory, BIP32Interface } from "bip32";
import * as ecc from "tiny-secp256k1";
import {
  networks,
  payments,
  initEccLib,
  crypto,
  Psbt,
  Signer,
} from "bitcoinjs-lib";

import { Utxo, getUtxo, getFeeEstimate } from "@/lib/esplora";

const bip32 = BIP32Factory(ecc);
initEccLib(ecc);

// TODO: handle mnemonic phrase
const mnemonic: string =
  "before memory calm clutch march pact useless transfer suffer vehicle already toss cave alley tumble foil volume patch cave royal weekend frost inmate catalog";

// hardcode the derivaton path to taproot
const path: string = "m/86'/1'/0'/";

// TODO: add mnemonic
// function getChildNode(mnemonic: string, type: string, index: number): BIP32Interface  {
function getChildNode(type: string, index: number): BIP32Interface {
  const pathType: string = type === "receive" ? "0" : "1";
  const childPath: string = `${path}${pathType}/${index}`;
  const seed = mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const childNode = node.derivePath(childPath);
  return childNode;
}

export function getReceiveAddress(index: number, network: string): string {
  const networkType =
    network === "testnet" ? networks.testnet : networks.bitcoin;
  const childNode = getChildNode("receive", index);

  const address = payments.p2tr({
    internalPubkey: childNode.publicKey.subarray(1),
    network: networkType,
  }).address;

  if (address === undefined) {
    throw new Error("Could not generate address");
  }
  console.log(address);
  return address;
}

export function getChangeAddress(index: number, network: string): string {
  const networkType =
    network === "testnet" ? networks.testnet : networks.bitcoin;
  const childNode = getChildNode("change", index);

  const address = payments.p2tr({
    internalPubkey: childNode.publicKey.subarray(1),
    network: networkType,
  }).address;

  if (address === undefined) {
    throw new Error("Could not generate address");
  }
  console.log(address);
  return address;
}
// TODO: get addresses from mnemonic phrase with a stop gap of 5 addresses

function getTweakedChildNode(childNode: BIP32Interface): Signer {
  // Used for signing, since the output and address are using a tweaked key
  // We must tweak the signer in the same way.
  const childNodeXOnlyPubkey = childNode.publicKey.subarray(1);
  const tweakedChildNode = childNode.tweak(
    crypto.taggedHash("TapTweak", childNodeXOnlyPubkey)
  );
  return tweakedChildNode;
}

export async function buildTransaction(
  address: string,
  network: string,
  childNode: BIP32Interface,
  destination: string
): Promise<Psbt> {
  const networkType =
    network === "testnet" ? networks.testnet : networks.bitcoin;

  const tweakedChildNode = getTweakedChildNode(childNode);
  const utxo: Utxo = await getUtxo(address);

  const feeEstimate: number = await getFeeEstimate(); // NOTE: hardcoded to block 1

  const amount: number = utxo.value; // NOTE: this is in sats

  let psbt = new Psbt({ network: networkType })
    .addInputs(utxo.txids)
    .addOutput({
      value: amount - feeEstimate,
      address: destination,
    })
    .signAllInputs(tweakedChildNode);
  return psbt;
}

// NOTE: this shoulb be called only if we have more than 1 address with balance
function combinePsbt(signedPsbts: Psbt[]): Psbt {
  return signedPsbts[0].combine(...signedPsbts.slice(1));
}

export function finalizeTransaction(signedPsbts: Psbt | Psbt[]): string {
  let psbt =
    signedPsbts instanceof Array ? combinePsbt(signedPsbts) : signedPsbts;
  return psbt.finalizeAllInputs().toHex();
}
