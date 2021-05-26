import { parseEther } from '@ethersproject/units'
import { Creature, LockPeriod, Skin } from '../types/metadata'
import { Artist, Character, Emotion, LockOption } from '../types/nft'
import { favCoins } from './favCoins'

const backgrounds = [
  {
    id: 0,
    name: 'transparent',
    image: '/nft/background/00_transparent.png'
  },
  {
    id: 1,
    name: "Sunrise Boat",
    image: '/nft/background/01_sunrise_boat.png'
  },
  {
    id: 2,
    name: "Noon Boat",
    image: '/nft/background/02_noon_boat.png'
  },
  {
    id: 3,
    name: "Evening Boat",
    image: '/nft/background/03_evening_boat.png',
  },
  {
    id: 4,
    name: "Night Boat",
    image: '/nft/background/04_night_boat.png',
  },
  {
    id: 5,
    name: "Bright Night Sky Moon",
    image: '/nft/background/05_bright_night_sky_moon.png',
  },
  {
    id: 6,
    name: "Cloudy Night Sky",
    image: '/nft/background/06_cloudy_night_sky.png',
  },
  {
    id: 7,
    name: "Rainy Night Sky",
    image: '/nft/background/07_rainy_night_sky.png'
  },
  {
    id: 8,
    name: "Cave",
    image: '/nft/background/08_cave.png'
  },
  {
    id: 9,
    name: "Dark Cave",
    image: '/nft/background/09_dark_cave.png'
  },
  {
    id: 10,
    name: "Forest",
    image: '/nft/background/10_forest.png'
  },
  {
    id: 11,
    name: "Forest",
    image: '/nft/background/11_jungle.png'
  },
  {
    id: 12,
    name: "Snow",
    image: '/nft/background/12_snow.png'
  },
]

const artists: { [key: string]: Artist } = {
  clive: {
    name: 'Clive Almeida',
    wallet: '0x74f1bE0eD391e59c70d93cA6C79eA5c57a83604C',
    meta: `artstation.com/clive_almeida`,
  },
  rogan: {
    name: 'Rogan X',
    wallet: '0x2Ffa60A14Dd2eb156d64390D545B819e40fC87F2 (roganx.eth)',
    meta: `https://omnil.ink/roganx`,
  },
  keili: {
    name: 'Keili Major Artist',
    wallet: 'majorart.eth',
    meta: `https://linktr.ee/majorart`,
  },
  jatin: {
    name: 'Jatin Pathi',
    wallet: '0x300da191248a500b2174aeD992d6697BF97F9139',
    meta: `https://jatinpathi.com/; https://www.artstation.com/forever_3vil`,
  },
  mehak: {
    name: 'Mehak Jain',
    wallet: '0x4147948b11ce851082f85fd7b56b76ae3a583560',
    meta: `https://tryshowtime.com/MehakJain`,
  },
  debbie: {
    name: 'Debbie H Digitial',
    wallet: '0xb2225441D8b19Ef1FA914C46099ff550aa3454a9',
    meta: `https://linktr.ee/debbiehdigital; https://twitter.com/DebbieHdigital`,
  },
}

// TODO: update with correct image paths
const skins = [
  {
    skin: Skin.Bronze,
    icon: '/nft/skins/bronze.svg'
  },
  {
    skin: Skin.Diamond,
    icon: '/nft/skins/diamond.svg'
  },
  {
    skin: Skin.Silver,
    icon: '/nft/skins/silver.svg'
  },
  {
    skin: Skin.Gold,
    icon: '/nft/skins/gold.svg'
  },
  {
    skin: Skin.Platinum,
    icon: '/nft/skins/platinum.svg'
  }
]

const animals = [
  { name: Creature.Deer, artist: artists.mehak, price: parseEther('0.075') },
  { name: Creature.Bull, artist: artists.clive, price: parseEther('0.1') },
  { name: Creature.Bear, artist: artists.rogan, price: parseEther('0.125') },
  { name: Creature.Whale, artist: artists.keili, price: parseEther('0.15') },
  { name: Creature.Dragon, artist: artists.jatin, price: parseEther('0.2') },
]

const characters: Character[] = []
// TODO: the characters should not be calculated like this but set one by one so we can set any id we need to match the smart contract
for (const animalIndex in animals) {
  const animal = animals[animalIndex]
  for (const skinIndex in skins) {
    const skin = skins[skinIndex].skin
    const baseUrl = `/nft/characters/${animal.name.toLowerCase()}/${skin.toLowerCase()}`
    characters.push({
      id: parseInt(animalIndex) * skins.length + parseInt(skinIndex),
      name: `${skin} ${animal.name}`,
      artist: animal.artist,
      creature: animal.name,
      mintPrice: animal.price,
      skin: skin,
      emotions: {
        [Emotion.Angry]: `${baseUrl}/angry.png`,
        [Emotion.Worry]: `${baseUrl}/worry.png`,
        [Emotion.Normal]: `${baseUrl}/normal.png`,
        [Emotion.Rest]: `${baseUrl}/rest.png`,
        [Emotion.Happy]: `${baseUrl}/happy.png`,
      },
    })
  }
}

characters.push({
  id: 25,
  name: 'Minotaur',
  artist: artists.clive,
  creature: Creature.Minotaur,
  mintPrice: parseEther('0.4'),
  skin: Skin.None,
  emotions: {
    [Emotion.Angry]: `/nft/characters/minotaur/angry.png`,
    [Emotion.Worry]: `/nft/characters/minotaur/worry.png`,
    [Emotion.Normal]: `/nft/characters/minotaur/normal.png`,
    [Emotion.Rest]: `/nft/characters/minotaur/rest.png`,
    [Emotion.Happy]: `/nft/characters/minotaur/happy.png`,
  },
})

characters.push({
  id: 26,
  name: 'Fish',
  artist: artists.debbie,
  creature: Creature.Fish,
  mintPrice: parseEther('0.5'),
  skin: Skin.None,
  emotions: {
    [Emotion.Angry]: `/nft/characters/fish/angry.png`,
    [Emotion.Worry]: `/nft/characters/fish/worry.png`,
    [Emotion.Normal]: `/nft/characters/fish/normal.png`,
    [Emotion.Rest]: `/nft/characters/fish/rest.png`,
    [Emotion.Happy]: `/nft/characters/fish/happy.png`,
  },
})

const charactersSupply = [
  ...Array(25).fill(150), // 25 Normal skin characters
  ...Array(2).fill(150), // 2 Unique skin characters
]

const lockOptions: LockOption[] = [
  {
    id: LockPeriod.SixMonths,
    duration: 6 * 30 * 86400, // 6 months
    description: '6 months',
    discount: 10, // percentage
    minAmount: parseEther('1000'), // 1K QSTK
    maxAmount: parseEther('100000'), // 100K QSTK
  },
  {
    id: LockPeriod.TwelveMonths,
    duration: 12 * 30 * 86400, // 12 months
    description: '12 months',
    discount: 20, // percentage
    minAmount: parseEther('1000'), // 1K QSTK
    maxAmount: parseEther('200000'), // 200K QSTK
  },
  {
    id: LockPeriod.OneCentury,
    duration: 100 * 12 * 30 * 86400, // 1 century
    description: '1 century',
    discount: 30, // percentage
    minAmount: BigNumber.from(1e3).mul(BigNumber.from(10).pow(18)), // 1K QSTK
    maxAmount: BigNumber.from(4e5).mul(BigNumber.from(10).pow(18)), // 400K QSTK
  },
  {
    // FIXME: for dev only. the lockperiod on smart contract are not the same as previous one
    id: LockPeriod.ThirtyMinutes,
    duration: 1800,
    description: '30 min',
    discount: 2, // percentage
    minAmount: parseEther('1000'), // 1K QSTK
    maxAmount: parseEther('400000'), // 400K QSTK
  },
]

const verifier = "0xC241cE39C130963E2D0F7a6CCc0DDab3F84fe1de"

const nonTokenMultiplier = 100 // 100%; TODO: would be good to fetch from contract
const tokenMultiplier = 80 // 80% on v1 contract as default, it should be changed on v2 to 90% and TODO: it will be good to fetch from contract
const qstkPrice = parseEther('0.000005') // in ETH
const nftBaseURL = 'https://emotional-nft-dapp.netlify.app/api/nfts/'
const nftAPIURL = process.env.NEXT_API_URL ? process.env.NEXT_API_URL : 'http://localhost:3000/api/nfts/'

////////////// latest configurations update for v1 sale //////////////
// totalSupply: '2000000000',
// airdrop: {
//   qstkSupply: '50000000',
//   signer: '0xC241cE39C130963E2D0F7a6CCc0DDab3F84fe1de'
// },
// NFT: {
//   qstkSupply: '80000000', // v1 QSTK supply 80M
//   maxSupply: '4000', // v1 max supply
//   baseURL: 'https://emotional-nft-dapp.netlify.app/api/nfts/',
//   multiplier: {
//     token: '80', // 20% additional discount on v1 sale
//     nonToken: '100', // no discount on characters and favcoins
//   }
// }

export {
  characters,
  charactersSupply,
  backgrounds,
  artists,
  favCoins,
  lockOptions,
  skins,
  animals,
  verifier,
  nonTokenMultiplier,
  tokenMultiplier,
  qstkPrice,
  nftBaseURL,
  nftAPIURL
}
