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
  1: {
    qstk: '0xF8BB31D98b815Cb329D51bD262242f036aAe63f8',
    qSettings: '0xDCE2E6c2848921D17F1120C4908b5906019D4B5f',
    qAirdrop: '0x16aE3e65B366E2f22F7880779944AeEfc1B9044c',
    qnftSettings: '0x8b5e8fB32f9d26132995f06FFC681A48d30d32C2',
    qnftGov: '0x6DC21b5650fb0EF06aD1e8c8669F271cE0EBc3C0',
    qnft: '0x9478C05534d62E9ee20E3EacE30663b38Cce6F3E',
  },
  3: {
    qstk: '0x10A5Ab70eDf51eD6c6755230507ce9c4608ba950',
    qSettings: '0x9883db93e4a78C529c0C3126e7F52db3E4b4666E',
    qAirdrop: '0x34fc6f9740Ef70c1d15b4714d68658c5E586B098',
    qnftSettings: '0x7B4003F189E178Df709711e534a8cC3a60D894Bb',
    qnftGov: '0xA58Cc367305A689bdEb3b08977347E290cCBc893',
    qnft: '0x1416708C316C533375B89E439d60595FdF398e48',
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
