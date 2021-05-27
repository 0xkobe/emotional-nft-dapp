export const abi = {
  qnft: require('../abi/QNFT.json'),
  qnftSettings: require('../abi/QNFTSettings.json'),
  qstk: require('../abi/QStk.json'),
  qAirdrop: require('../abi/QAirdrop.json'),
}

// from https://github.com/QuiverCommunity/quiver-contracts/blob/master/scripts/settings.json
// structure is: contract name -> chain id -> contract address
export const deployedAddresses: {
  qstk: { [key: number]: string }
  qSettings: { [key: number]: string }
  qAirdrop: { [key: number]: string }
  qnftSettings: { [key: number]: string }
  qnftGov: { [key: number]: string }
  qnft: { [key: number]: string }
} = {
  qstk: {
    3: '0x0D96f9bc404F231B7E3D53779F5c9F2e2C7E4a19',
    31337: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  },
  qSettings: {
    3: '0xceaeAf2D412078f2221EeD1933efB172828F57CF',
    31337: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  },
  qAirdrop: {
    3: '0x884752667867555510d1F24BDaB1a64235679b64',
    31337: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  },
  qnftSettings: {
    3: '0xF74091079C0FB00485d59661CbF881ec7e291C7b',
    31337: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
  },
  qnftGov: {
    3: '0x9e56FA038Fdaa945BBc3aC3Ced3eC55D114719Eb',
    31337: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
  },
  qnft: {
    3: '0xCaf39813C73F255d6ab013c3210Ff54af19aB8bd',
    31337: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
  },
}
