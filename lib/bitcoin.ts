import { mnemonicToSeedSync } from "bip39";
import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";
import { networks, payments, initEccLib } from "bitcoinjs-lib";

const bip32 = BIP32Factory(ecc);
initEccLib(ecc);

// export function getReceiveAddress(mnemonic: string, index: string) { // TODO: handle mnemonic phrase
export function getReceiveAddress(index: number, network: string): string {
  // TODO: handle mnemonic phrase
  const mnemonic: string =
    "before memory calm clutch march pact useless transfer suffer vehicle already toss cave alley tumble foil volume patch cave royal weekend frost inmate catalog";

  const network_type =
    network === "testnet" ? networks.testnet : networks.bitcoin;

  // hardcode the derivaton path to taproot
  const outerPath: string = `m/86'/1'/0'/0/${index}`;

  const seed = mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const childNode = node.derivePath(outerPath);

  const address = payments.p2tr({
    internalPubkey: childNode.publicKey.subarray(1),
    network: network_type,
  }).address;

  if (address === undefined) {
    return "Error: Could not generate address";
  }
  console.log(address);
  return address;
}

// export function getChangeAddress(mnemonic: string, index: string) { // TODO: handle mnemonic phrase
export function getChangeAddress(index: number, network: string): string {
  // TODO: handle mnemonic phrase
  const mnemonic: string =
    "before memory calm clutch march pact useless transfer suffer vehicle already toss cave alley tumble foil volume patch cave royal weekend frost inmate catalog";

  const network_type =
    network === "testnet" ? networks.testnet : networks.bitcoin;

  // hardcode the derivaton path to taproot
  const outerPath: string = `m/86'/1'/0'/1/${index}`;

  const seed = mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const childNode = node.derivePath(outerPath);

  const address = payments.p2tr({
    internalPubkey: childNode.publicKey.subarray(1),
    network: network_type,
  }).address;

  if (address === undefined) {
    return "Error: Could not generate address";
  }
  console.log(address);
  return address;
}
// TODO: get addresses from mnemonic phrase with a stop gap of 5 addresses

//TODO: sign transaction
