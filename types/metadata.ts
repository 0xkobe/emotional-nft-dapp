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
  // Quiver coins (2)
  QREP,
  QSTK,
  // Partnership coins (1)
  CTK,
  // Ecosystem coins (8)
  DHT,
  HEDG,
  TRU,
  REP,
  WHALE,
  GNO,
  PNK,
  IHF,
  // Top coins (31)
  BTC,
  ETH,
  THETA,
  SOL,
  YFI,
  AAVE,
  ATOM,
  FILE,
  BTT,
  DOT,
  BNB,
  CAKE,
  SUSHI,
  CRV,
  BAL,
  AVAX,
  FEI,
  UNI,
  MANA,
  GRT,
  LINK,
  TRX,
  ICP,
  FTM,
  FTT,
  XRP,
  COMP,
  XTZ,
  BAT,
  ADA,
  ANKR,
  // Coins that we want to support (16)
  DG,
  KEX,
  BTSG,
  INJ,
  RUNE,
  SHFT,
  ALICE, // TODO update favcoin list details from here
  IOTX,
  DXD,
  GAME,
  KLV,
  CSPR,
  VETH,
  REEF,
  VISR,
  TFUEL,
  // Trend coins (meme/NFT) (13)
  MATIC,
  DOGE,
  SAFE,
  CHZ,
  SHIB,
  PMON,
  TLM,
  TOWER,
  JUST,
  WAXP,
  STMX,
  AXS,
  ENJIN,
  // Extra coins suggested by the community (10)
  AKT,
  CTSI,
  START,
  XPRT,
  EROWAN,
  PRQ,
  KIT,
  CHR,
  RNDR,
  MIST,
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
