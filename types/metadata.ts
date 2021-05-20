// https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#character-id
export enum Creature {
  Bull = 'bull',
  Bear = 'bear',
  Whale = 'whale',
  Dragon = 'dragon',
  Deer = 'deer',
  Fish = 'fish',
  Minotaur = 'minotaur',
}

// https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#character-id
export enum Skin {
  None = 'none',
  Diamond = 'diamond',
  Bronze = 'bronze',
  Silver = 'silver',
  Golden = 'golden',
  Platinium = 'platinium',
}

// https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#favcoin-id
export enum Favcoin {
  BTC = 0,
  ETH = 1,
  MATIC = 2,
}

// https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#background-image-id
export enum Background {
  None = 0,
  SunriseBoat = 1,
  SoonBoat = 2,
  SveningBoat = 3,
  SightBoat = 4,
  SrightNightSkyMoon = 5,
  SloudyNightSky = 6,
  NoCloudNightSky = 7,
  SainyNightSky = 8,
}

// https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#lockoption-id
export enum LockPeriod {
  SixMonths = 0,
  TwelveMonths = 1,
  OneCentury = 2,
}

export type Metadata = {
  name: string
  description: string
  image: string
  external_url: string
  attributes: [
    {
      trait_type: 'creature'
      value: Creature
    },
    {
      trait_type: 'skin'
      value: Skin
    },
    {
      trait_type: 'background'
      value: Background
    },
    {
      trait_type: 'favcoin'
      value: Favcoin
    },
    {
      trait_type: 'lock'
      value: LockPeriod
    },
    {
      trait_type: 'creator_name'
      value: string
    },
    {
      trait_type: 'creator_wallet'
      value: string
    },
  ]
}
