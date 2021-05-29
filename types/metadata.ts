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
  BNB, // 4
  ADA, // 5
  XRP, // 7
  DOT, // 9
  ICP, // 10
  UNI, // 12
  LINK, // 14
  SOL, // 19
  THETA, // 22
  FILE, // 24
  TRX, // 25
  AAVE, // 29
  ATOM, // 39
  FTT, // 42
  XTZ, // 43
  CAKE, // 45
  BTT, // 49
  AVAX, // 52
  COMP, // 56
  SUSHI, // 59
  YFI, // 68
  FEI, // 79
  BAT, // 83
  MANA, // 85
  GRT, // 95
  FTM, // 101
  ANKR, // 105
  CRV, // 114
  BAL, // 153
  // Coins that we want to support (16)
  DG,
  KEX,
  BTSG,
  INJ,
  RUNE,
  SHFT,
  ALICE,
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
  DOGE, // 6
  MATIC, // 15
  SHIB, // 28
  SAFE, // 50
  CHZ, // 66
  ENJIN, // 75
  TOWER, // ?
  AXS, // 159
  WAXP, // 173
  TLM, // 181
  STMX, // 196
  JUST, // 312
  PMON, // 848
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
