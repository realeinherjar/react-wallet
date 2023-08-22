import { mnemonicToSeedSync } from "bip39";
import * as ecc from "tiny-secp256k1";
import { networks, payments, initEccLib } from "bitcoinjs-lib";

const bip32 = BIP32Factory(ecc);
initEccLib(ecc);

// TODO: handle mnemonic phrase
const mnemonic: string =
  "before memory calm clutch march pact useless transfer suffer vehicle already toss cave alley tumble foil volume patch cave royal weekend frost inmate catalog";

// hardcode the derivaton path to taproot
const path: string = "m/86'/1'/0'/";

// function getChildNode(mnemonic: string, type: string, index: number): BIP32Interface  {
function getChildNode(type: string, index: number): BIP32Interface {
  const path_type: string = type === "receive" ? "0" : "1";
  const childPath: string = `${path}${path_type}/${index}`;
  const seed = mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const childNode = node.derivePath(childPath);
  return childNode;
}

// export function getReceiveAddress(mnemonic: string, index: string, network: string) { // TODO: handle mnemonic phrase
export function getReceiveAddress(index: number, network: string): string {
  const network_type =
    network === "testnet" ? networks.testnet : networks.bitcoin;
  const childNode = getChildNode("receive", index);

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

// export function getChangeAddress(mnemonic: string, index: string, network: string) { // TODO: handle mnemonic phrase
export function getChangeAddress(index: number, network: string): string {
  const network_type =
    network === "testnet" ? networks.testnet : networks.bitcoin;
  const childNode = getChildNode("change", index);

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
