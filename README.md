## About

A Smart Contract written in Solidity for Ethereum blockchain for Crown Campaign management.
Two Smart Contracts are used:
1. CampaignFactory: Used for Campaign management
2. Campaign: Campaign related management, new requests, fund management.

## Live at:

Smart Contract Address: `0x5D900Ce1f78DEBd938b138c337A7DA1BCeEDDF0B`.
 
## Technologies used:

- [Solidity](https://docs.soliditylang.org/en/v0.8.18/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com)
- [Infura API](https://www.infura.io/)

## Deployment:

### Smart Contract

In the file, `deploy.js` replace the values:
1. <12 Word Mnemonic> - Your wallet 12 word Mnemonic.
2. <infura goerlia blockchain api> - Infura Goerlia or any other blockchain API.
 
In the file, `web.ts` replace the values:
1. <infura goerlia blockchain api> - Infura Goerlia or any other blockchain API.

After replacing this run,

```bash
node deploy.js
```

### Frontend

Since the Frontend is made in Next.js, it's simply can be deployed [Netlify](https://app.netlify.com/). To create the build, you will need to use yarn.

```bash
yarn build
```

Output files for Frontend will be created `dist`.
