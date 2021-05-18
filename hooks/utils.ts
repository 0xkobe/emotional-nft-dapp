import { BigNumber } from "@ethersproject/bignumber"

export const parseNumber = (bn: string | number | BigNumber): number => {
    return BigNumber.from(bn.toString()).toNumber()
}