import { BigNumber } from '@ethersproject/bignumber'
import { Creature, Favcoin, LockPeriod, Skin } from '../types/metadata'

type Artist = {
  name: string
  wallet: string
  meta: string
}

type Character = {
  id: number // https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#character-id
  name: string
  skin: Skin
  emotions: {
    angry: string
    worry: string
    normal: string
    rest: string
    happy: string
  }
  artist: Artist
}

type FavCoin = {
  id: Favcoin
  mintPrice: BigNumber // default mint price in ETH
  meta: {
    name: string
    symbol: string
    icon: string
    website: string
    social: string
    other: string
  }
}

type LockOption = {
  id: number
  duration: number // in second
  discount: number
  minAmount: BigNumber
  maxAmount: BigNumber
}

const backgrounds = [
  'transparent', // should we create transparent 1024x1024 image?
  'nft/background/01_sunrise_boat.png',
  'nft/background/02_noon_boat.png',
  'nft/background/03_evening_boat.png',
  'nft/background/04_night_boat.png',
  'nft/background/05_bright_night_sky_moon.png',
  'nft/background/06_cloudy_night_sky.png',
  'nft/background/07_no_cloud_night_sky.png',
  'nft/background/08_rainy_night_sky.png',
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

const skins = [
  Skin.Bronze,
  Skin.Diamond,
  Skin.Silver,
  Skin.Golden,
  Skin.Platinium,
]
const animals = [
  { name: Creature.Bull, artist: artists.clive },
  { name: Creature.Bear, artist: artists.rogan },
  { name: Creature.Whale, artist: artists.keili },
  { name: Creature.Dragon, artist: artists.jatin },
  { name: Creature.Deer, artist: artists.mehak },
]

const characters: Character[] = []
for (const animalIndex in animals) {
  const animal = animals[animalIndex]
  for (const skinIndex in skins) {
    const skin = skins[skinIndex]
    const baseUrl = `/nft/characters/${animal.name.toLowerCase()}/${skin.toLowerCase()}`
    characters.push({
      id: parseInt(animalIndex, 10) * skins.length + parseInt(skinIndex, 10),
      name: `${skin} ${animal.name}`,
      artist: animal.artist,
      skin: skin,
      emotions: {
        angry: `${baseUrl}/angry.png`,
        worry: `${baseUrl}/worry.png`,
        normal: `${baseUrl}/normal.png`,
        rest: `${baseUrl}/rest.png`,
        happy: `${baseUrl}/happy.png`,
      },
    })
  }
}

characters.push({
  id: 25,
  name: 'Fish',
  artist: artists.debbie,
  skin: Skin.None,
  emotions: {
    angry: `/nft/characters/fish/angry.png`,
    worry: `/nft/characters/fish/worry.png`,
    normal: `/nft/characters/fish/normal.png`,
    rest: `/nft/characters/fish/rest.png`,
    happy: `/nft/characters/fish/happy.png`,
  },
})

characters.push({
  id: 26,
  name: 'Minotaur',
  artist: artists.clive,
  skin: Skin.None,
  emotions: {
    angry: `/nft/characters/minotaur/angry.png`,
    worry: `/nft/characters/minotaur/worry.png`,
    normal: `/nft/characters/minotaur/normal.png`,
    rest: `/nft/characters/minotaur/rest.png`,
    happy: `/nft/characters/minotaur/happy.png`,
  },
})

const favCoins: FavCoin[] = [
  {
    id: Favcoin.BTC, // api url for metadata "https://dapp.quiverprotocol.com/meta/coin/0",
    mintPrice: BigNumber.from(1).pow(18).div(100), // 0.01ETH
    meta: {
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: 'https://dapp.quiverprotocol.com/icon/btc', // or online url if it works
      website: 'https://bitcoin.org',
      social: '',
      other: '',
    },
  },
]

const lockOptions: LockOption[] = [
  {
    id: LockPeriod.SixMonths,
    duration: 6 * 30 * 86400, // 6 months
    discount: 20, // percentage
    minAmount: BigNumber.from(1e3).mul(BigNumber.from(1).pow(18)), // 1K QSTK
    maxAmount: BigNumber.from(1e5).mul(BigNumber.from(1).pow(18)), // 100K QSTK
  },
  {
    id: LockPeriod.TwelveMonths,
    duration: 12 * 30 * 86400, // 12 months
    discount: 30, // percentage
    minAmount: BigNumber.from(1e3).mul(BigNumber.from(1).pow(18)), // 1K QSTK
    maxAmount: BigNumber.from(2e5).mul(BigNumber.from(1).pow(18)), // 200K QSTK
  },
  {
    id: LockPeriod.OneCentury,
    duration: 100 * 12 * 30 * 86400, // 1 century
    discount: 40, // percentage
    minAmount: BigNumber.from(1e3).mul(BigNumber.from(1).pow(18)), // 1K QSTK
    maxAmount: BigNumber.from(4e5).mul(BigNumber.from(1).pow(18)), // 400K QSTK
  },
]

export {
  animals,
  skins,
  characters,
  backgrounds,
  artists,
  favCoins,
  lockOptions,
}
