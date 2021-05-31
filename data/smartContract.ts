import { chain } from './chains'

export const abi = {
  qnft: require('../abi/QNFT.json'),
  qnftSettings: require('../abi/QNFTSettings.json'),
  qstk: require('../abi/QStk.json'),
  qAirdrop: require('../abi/QAirdrop.json'),
}

// from https://github.com/QuiverCommunity/quiver-contracts/blob/master/scripts/settings.json
// structure is: contract name -> chain id -> contract address
const _deployedAddresses: {
  [key: number]: {
    qstk: string
    qSettings: string
    qAirdrop: string
    qnftSettings: string
    qnftGov: string
    qnft: string
  }
} = {
  3: {
    qstk: '0x0D96f9bc404F231B7E3D53779F5c9F2e2C7E4a19',
    qSettings: '0xceaeAf2D412078f2221EeD1933efB172828F57CF',
    qAirdrop: '0x884752667867555510d1F24BDaB1a64235679b64',
    qnftSettings: '0xF74091079C0FB00485d59661CbF881ec7e291C7b',
    qnftGov: '0x9e56FA038Fdaa945BBc3aC3Ced3eC55D114719Eb',
    qnft: '0xCaf39813C73F255d6ab013c3210Ff54af19aB8bd',
  },
  31337: {
    qstk: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    qSettings: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    qAirdrop: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
    qnftSettings: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
    qnftGov: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    qnft: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
  },
}

export const deployedAddresses = _deployedAddresses[chain.id]
