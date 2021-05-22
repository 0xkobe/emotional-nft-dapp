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
  ThirtyMinutes = 3, // FIXME: for dev only
}

export enum Traits {
  Creature = 'Creature',
  Skin = 'Skin',
  Background = 'Background',
  FavCoin = 'Favorite Coin',
  LockPeriod = 'Lock Period',
  LockAmount = 'Lock Amount',
  CreatorName = "Creator's Name",
  CreatorWallet = "Creator's Address",
  CreatedDate = 'Created Date',
  Withdrawn = 'Withdrawn',
  DefaultEmotion = 'Default Emotion',
}

export enum DisplayType {
  Date = 'date',
  Number = 'number', // can also set optional max_value
  BoostPercentage = 'boost_percentage', // can also set optional max_value
  BoostNumber = 'boost_number', // can also set optional max_value
}
