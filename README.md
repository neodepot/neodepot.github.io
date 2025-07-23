# NEO Transaction Analyzer

This project is a minimal single page app that fetches a transaction from the NEO N3 blockchain and breaks down the script into opcodes with their GAS costs.

## Setup

```bash
npm install
```

## Development

Start the dev server:

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser and enter a transaction hash.

## Build

```bash
npm run build
```

A preview server can be started with `npm run preview` after building.

The app uses [neon-dappkit](https://github.com/CityOfZion/neon-dappkit) and the public RPC node `https://node.neodepot.org/`.
