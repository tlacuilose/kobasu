# (ne) Kobasu

A web3 ridesharing service.

- A driver pubilshes a slot of time when they are available to provide ridesharing. Defining: period, seats and cost.
- The passengers send their bids
- The passengers are notified wether their bids were accepted or not.

# How To run

Install dependencies

```bash
npm install
```

Run app and open on browser on localhost:3000

```bash
npm start
```

# Ethereum environment

Install truffle, this is a tool for uploading Contracts and starting a eth local node.

```bash
npm install -g truffle
```

Run truffle

```bash
truffle develop
```

Deploy contract in truffle cli

```bash
migrate --reset
```

Create a new contract and get its address

```bash
let neko = await Nekobasu.new();
neko.address;
```

Copy address into web3.ts contractAddress
