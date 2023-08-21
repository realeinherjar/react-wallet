# React.js Bitcoin Wallet

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

| :warning: WARNING                                             |
| :------------------------------------------------------------ |
| Do not use this wallet! It is for portfolio/learning purposes |

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It is a Bitcoin wallet that uses [`mempool.space`](https://mempool.space/)
[Esplora](https://github.com/Blockstream/esplora/blob/master/API.md) API.

## Scope

Libraries used:

- [React.js](https://react.dev/) and [Next.js](https://nextjs.org/) for the
  frontend and async functionality.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [BitcoinJS](https://github.com/bitcoinjs) for Bitcoin
  functionality.

Functionality:

- Create a wallet from a network type (mainnet/testnet) and a mnemonic phrase.
- Taproot addresses and descriptors by default.
- Fetch the wallet's balance asynchronously from the Esplora API.
- Send bitcoin to an address.
- Receive bitcoin by generating a new taproot address.

Purpose:

- Get acquainted with TypeScript.
- Learn how to build apps with React.js and Next.js.
- Learn how to fetch data asynchronously with Next.js
  and do server-side rendering with async components.
- Improve my tailwind CSS skills.
- Tap into my Bitcoin knowledge and learn how to use BitcoinJS.
- Use my knowledge of CI/CD with GitHub Actions to deploy the app to Vercel.

## How it works

The wallet is a single page application that has server-side rendering
on the transactions async API fetch from Esplora.
Upon start it asks the user for a network type (mainnet or testnet)
and a mnemonic phrase.
This is done by BitcoinJS.

<!-- TODO: insert screenshot -->

Once the wallet is created, the app will fetch the wallet's balance
from the API and display them.
This is done with the new (version 13) [Next.js support for promises inside components](https://nextjs.org/blog/next-13#data-fetching).
It uses the Esplora API which is hard-coded to use the `mempool.space` API.
The balance is shown and addresses are listed in a table.

<!-- TODO: insert screenshot -->
<!-- TODO: insert screenshot -->

To send bitcoin, the user can click on the "Send" button and
enter a recipient address and an amount.
The app will create a transaction using BitcoinJS, sign it,
and send it to the Esplora API.
The default behavior (and currently the only one)
is to use UTXOs starting from the oldest to the newest until the amount is reached,
and add a change output if necessary.
Additionally, the fee is calculated using the Esplora API.
By default,
the fee is set to whatever sat/vB necessary
to get the transaction into the next block.

<!-- TODO: insert screenshot -->

To receive bitcoin, the user can click on the "Receive" button.
This will generate a new address and QR code using BitcoinJS.
By default this will be the next unused address in the wallet.

<!-- TODO: insert screenshot -->

There is a "Sync" button that will reset the cached-data from
the Esplora API and fetch the latest wallet balance.

<!-- TODO: insert screenshot -->

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
