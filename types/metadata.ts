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
  Gold = 'gold',
  Platinum = 'platinum',
}

// https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#favcoin-id
export enum FavCoinEnum {
  BTC = 0,
  ETH = 1,
  MATIC = 2,
}

// https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#background-image-id
export enum Background {
  None = 0,
  SunriseBoat = 1,
  NoonBoat = 2,
  EveningBoat = 3,
  NightBoat = 4,
  BrightNightSkyMoon = 5,
  CloudyNightSky = 6,
  NoCloudNightSky = 7,
  RainyNightSky = 8,
}

// https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#lockoption-id
export enum LockPeriod {
  SixMonths = 0,
  TwelveMonths = 1,
  OneCentury = 2,
}

export enum Traits {
  Creature = 'creature',
  Skin = 'skin',
  Background = 'background',
  FavCoin = 'favcoin',
  Lock = 'lock',
  CreatorName = 'creator_name',
  CreatorWallet = 'creator_wallet',
}

export type Metadata = {
  name: string
  description: string
  image: string
  external_url: string
  attributes: [
    {
      trait_type: Traits.Creature
      value: Creature
    },
    {
      trait_type: Traits.Skin
      value: Skin
    },
    {
      trait_type: Traits.Background
      value: Background
    },
    {
      trait_type: Traits.FavCoin
      value: FavCoinEnum
    },
    {
      trait_type: Traits.Lock
      value: LockPeriod
    },
    {
      trait_type: Traits.CreatorName
      value: string
    },
    {
      trait_type: Traits.CreatorWallet
      value: string
    },
  ]
}
