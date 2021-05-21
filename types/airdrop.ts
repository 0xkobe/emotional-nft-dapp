import { BigNumber } from "@ethersproject/bignumber";

export type VerifyAirdropKeyResponse = {
    isValid: boolean,
    amount: BigNumber
}