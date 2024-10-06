# Run the frontend (+ express server)
1. Clone the repo
2. Run `npm install`
3. Copy/paste the `.env.examples` file and rename it to `.env` and fill in the variables
4. Go to server folder
5. Run `npm install`
6. Copy/paste the `.env.examples` file and rename it to `.env` and fill in the variables
7. Start the dev server
```bash
npm run tailwind:css -- --watch
npm run serve
```
7. Set Token in ngrok.yml to tunnel the localhost server (mandatory to redirect to the website after scanning the NFC chip)
```bash
ngrok http 8080 --config ngrok.yml
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

FUJI contract address : https://testnet.snowtrace.io/token/0x8De08A2CE86F838416c509499802c906F492D030

## How to test

Run the following command
```bash
npx hardhat test
```