import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from '@ethersproject/units'
import { Creature, FavCoinEnum, LockPeriod, Skin } from '../types/metadata'
import { Artist, Character, Emotion, FavCoin, LockOption } from '../types/nft'

const backgrounds = [
  'transparent', // should we create transparent 1024x1024 image?
  '/nft/background/01_sunrise_boat.png',
  '/nft/background/02_noon_boat.png',
  '/nft/background/03_evening_boat.png',
  '/nft/background/04_night_boat.png',
  '/nft/background/05_bright_night_sky_moon.png',
  '/nft/background/06_cloudy_night_sky.png',
  '/nft/background/07_no_cloud_night_sky.png',
  '/nft/background/08_rainy_night_sky.png',
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

const skins = [Skin.Bronze, Skin.Diamond, Skin.Silver, Skin.Gold, Skin.Platinum]
const animals = [
  { name: Creature.Bull, artist: artists.clive },
  { name: Creature.Bear, artist: artists.rogan },
  { name: Creature.Whale, artist: artists.keili },
  { name: Creature.Dragon, artist: artists.jatin },
  { name: Creature.Deer, artist: artists.mehak },
]

const characters: Character[] = []
// TODO: the characters should not be calculated like this but set one by one so we can set any id we need to match the smart contract
for (const animalIndex in animals) {
  const animal = animals[animalIndex]
  for (const skinIndex in skins) {
    const skin = skins[skinIndex]
    const baseUrl = `/nft/characters/${animal.name.toLowerCase()}/${skin.toLowerCase()}`
    characters.push({
      id: parseInt(animalIndex) * skins.length + parseInt(skinIndex),
      name: `${skin} ${animal.name}`,
      artist: animal.artist,
      creature: animal.name,
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
  name: 'Fish',
  artist: artists.debbie,
  creature: Creature.Fish,
  skin: Skin.None,
  emotions: {
    [Emotion.Angry]: `/nft/characters/fish/angry.png`,
    [Emotion.Worry]: `/nft/characters/fish/worry.png`,
    [Emotion.Normal]: `/nft/characters/fish/normal.png`,
    [Emotion.Rest]: `/nft/characters/fish/rest.png`,
    [Emotion.Happy]: `/nft/characters/fish/happy.png`,
  },
})

characters.push({
  id: 26,
  name: 'Minotaur',
  artist: artists.clive,
  creature: Creature.Minotaur,
  skin: Skin.None,
  emotions: {
    [Emotion.Angry]: `/nft/characters/minotaur/angry.png`,
    [Emotion.Worry]: `/nft/characters/minotaur/worry.png`,
    [Emotion.Normal]: `/nft/characters/minotaur/normal.png`,
    [Emotion.Rest]: `/nft/characters/minotaur/rest.png`,
    [Emotion.Happy]: `/nft/characters/minotaur/happy.png`,
  },
})

const favCoins: FavCoin[] = [
  {
    id: FavCoinEnum.BTC, // api url for metadata "https://dapp.quiverprotocol.com/meta/coin/0",
    mintPrice: parseEther('0.1'), // 0.1ETH
    meta: {
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: 'https://dapp.quiverprotocol.com/icon/btc', // or online url if it works
      website: 'https://bitcoin.org',
      social: '',
      other: '',
    },
  },
  {
    id: FavCoinEnum.ETH, // api url for metadata "https://dapp.quiverprotocol.com/meta/coin/1",
    mintPrice: parseEther('0.05'), // 0.05ETH
    meta: {
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'https://dapp.quiverprotocol.com/icon/eth', // or online url if it works
      website: 'https://ethereum.org',
      social: '',
      other: '',
    },
  },
]

const lockOptions: LockOption[] = [
  {
    id: LockPeriod.SixMonths,
    duration: 6 * 30 * 86400, // 6 months
    description: '6 months',
    discount: 20, // percentage
    minAmount: BigNumber.from(1e3).mul(BigNumber.from(1).pow(18)), // 1K QSTK
    maxAmount: BigNumber.from(1e5).mul(BigNumber.from(1).pow(18)), // 100K QSTK
  },
  {
    id: LockPeriod.TwelveMonths,
    duration: 12 * 30 * 86400, // 12 months
    description: '12 months',
    discount: 30, // percentage
    minAmount: BigNumber.from(1e3).mul(BigNumber.from(1).pow(18)), // 1K QSTK
    maxAmount: BigNumber.from(2e5).mul(BigNumber.from(1).pow(18)), // 200K QSTK
  },
  {
    id: LockPeriod.OneCentury,
    duration: 100 * 12 * 30 * 86400, // 1 century
    description: '1 century',
    discount: 40, // percentage
    minAmount: BigNumber.from(1e3).mul(BigNumber.from(1).pow(18)), // 1K QSTK
    maxAmount: BigNumber.from(4e5).mul(BigNumber.from(1).pow(18)), // 400K QSTK
  },
  {
    // FIXME: for dev only. the lockperiod on smart contract are not the same as previous one
    id: LockPeriod.ThirtyMinutes,
    duration: 1800,
    description: '30 min',
    discount: 2, // percentage
    minAmount: BigNumber.from(1e3).mul(BigNumber.from(1).pow(18)), // 1K QSTK
    maxAmount: BigNumber.from(4e5).mul(BigNumber.from(1).pow(18)), // 400K QSTK
  },
]

export {
  characters,
  backgrounds,
  artists,
  favCoins,
  lockOptions,
  skins,
  animals,
}
