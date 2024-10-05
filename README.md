# Run the frontend (+ express server)
1. Clone the repo
2. Run `npm install`
3. Go to server folder
4. Run `npm install`
5. Copy/paste the `.env.examples` file and rename it to `.env` and fill in the variables
6. Start the dev server
```bash
npm run tailwind:css -- --watch
npm run serve
```

## Build before deployment

1. Go to server folder
```bash
npm run build
```
 
# How to deploy smart contracts

1. First deploy the NFT contract
`npx hardhat compile`
`npx hardhat run scripts/0_deploy-nft-contract.js --network <fuji|mainnet>`
3. Verify contrat (not mandatory)
`npx hardhat verify  --network <fuji|mainnet> <CONTRACT> OWNER_ADDRESS MINTER_ADDRESS`
4. If you need to change a token metadata => setTokenURI (with contract Owner wallet)

### Deployed contract addresses

AMOY contract address : 

## How to test

Run the following command
```bash
npx hardhat test
```

NodeJS 18/20
