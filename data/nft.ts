import { parseEther } from '@ethersproject/units'
import { BackgroundData, Creature, LockPeriod, Skin } from '../types/metadata'
import {
  Artist,
  Character,
  Emotion,
  EmotionData,
  LockOption,
} from '../types/nft'

export const specialIds = {
  Minotaur: 25,
  Fish: 26,
}

const backgrounds: BackgroundData[] = [
  {
    id: 0,
    name: 'Transparent',
    image: '/nft/background/00_transparent.png',
  },
  {
    id: 1,
    name: 'Cave',
    image: '/nft/background/01_cave.png',
  },
  {
    id: 2,
    name: 'Dark Cave',
    image: '/nft/background/02_dark_cave.png',
  },
  {
    id: 3,
    name: 'Forest',
    image: '/nft/background/03_forest.png',
  },
  {
    id: 4,
    name: 'Jungle',
    image: '/nft/background/04_jungle.png',
  },
  {
    id: 5,
    name: 'Snow',
    image: '/nft/background/05_snow.png',
  },
  {
    id: 6,
    name: 'Barn',
    image: '/nft/background/06_barn.png',
  },
  {
    id: 7,
    name: 'Field',
    image: '/nft/background/07_field.png',
  },
  {
    id: 8,
    name: 'Dark Forest',
    image: '/nft/background/08_dark_forest.png',
  },
  {
    id: 9,
    name: 'Enchanted Mountains',
    image: '/nft/background/09_enchanted_mountains.png',
  },
  {
    id: 10,
    name: 'Paradise',
    image: '/nft/background/10_paradise.png',
  },
  {
    id: 11,
    name: 'Volcano',
    image: '/nft/background/11_volcano.png',
  },
  {
    id: 12,
    name: 'Green underwater',
    image: '/nft/background/12_green_underwater.png',
  },
  {
    id: 13,
    name: 'Light blue underwater',
    image: '/nft/background/13_light_blue_underwater.png',
  },
  {
    id: 14,
    name: 'Dungeon lava',
    image: '/nft/background/14_dungeon_lava.png',
  },
  {
    id: 15,
    name: 'Outer space',
    image: '/nft/background/15_outer_space.png',
  },
  {
    id: 16,
    name: 'Dark green underwater',
    image: '/nft/background/16_dark_green_underwater.png',
  },
  {
    id: 17,
    name: 'Huge rock underwater',
    image: '/nft/background/17_huge_rock_underwater.png',
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
    icon: '/nft/skins/bronze.svg',
  },
  {
    skin: Skin.Diamond,
    icon: '/nft/skins/diamond.svg',
  },
  {
    skin: Skin.Silver,
    icon: '/nft/skins/silver.svg',
  },
  {
    skin: Skin.Gold,
    icon: '/nft/skins/gold.svg',
  },
  {
    skin: Skin.Platinum,
    icon: '/nft/skins/platinum.svg',
  },
]

const animals = [
  {
    id: Creature.Deer,
    name: 'Deer',
    artist: artists.mehak,
    price: parseEther('0.075'),
  },
  {
    id: Creature.Bull,
    name: 'Bull',
    artist: artists.clive,
    price: parseEther('0.1'),
  },
  {
    id: Creature.Bear,
    name: 'Bear',
    artist: artists.rogan,
    price: parseEther('0.125'),
  },
  {
    id: Creature.Whale,
    name: 'Whale',
    artist: artists.keili,
    price: parseEther('0.15'),
  },
  {
    id: Creature.Dragon,
    name: 'Dragon',
    artist: artists.jatin,
    price: parseEther('0.2'),
  },
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
      name: animal.name,
      artist: animal.artist,
      creature: animal.id,
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
  id: specialIds.Minotaur,
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
  id: specialIds.Fish,
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
    duration: 15552000, // 6 months
    description: '6 months',
    discount: 10, // percentage
    minAmount: parseEther('1000'), // 1K QSTK
    maxAmount: parseEther('100000'), // 100K QSTK
  },
  {
    id: LockPeriod.TwelveMonths,
    duration: 31104000, // 12 months
    description: '12 months',
    discount: 20, // percentage
    minAmount: parseEther('1000'), // 1K QSTK
    maxAmount: parseEther('200000'), // 200K QSTK
  },
  {
    id: LockPeriod.OneDecade,
    duration: 311040000, // 1 decade
    description: '1 decade',
    discount: 30, // percentage
    minAmount: parseEther('1000'), // 1K QSTK
    maxAmount: parseEther('400000'), // 400K QSTK
  },
]

const verifier = '0x9f7d81B5Bedfe6bd156227c85e586078CAbD8FC6'
const qstkPrice = parseEther('0.000005') // in ETH

const emotions: EmotionData[] = [
  {
    emotion: Emotion.Angry,
    text: 'angry',
  },
  {
    emotion: Emotion.Worry,
    text: 'worried',
  },
  {
    emotion: Emotion.Normal,
    text: 'normal',
  },
  {
    emotion: Emotion.Rest,
    text: 'resting',
  },
  {
    emotion: Emotion.Happy,
    text: 'happy',
  },
]

export {
  characters,
  charactersSupply,
  backgrounds,
  artists,
  lockOptions,
  skins,
  animals,
  verifier,
  qstkPrice,
  emotions,
}
