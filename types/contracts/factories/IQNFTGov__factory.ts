/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IQNFTGov, IQNFTGovInterface } from "../IQNFTGov";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "originAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentAmount",
        type: "uint256",
      },
    ],
    name: "updateVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IQNFTGov__factory {
  static readonly abi = _abi;
  static createInterface(): IQNFTGovInterface {
    return new utils.Interface(_abi) as IQNFTGovInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IQNFTGov {
    return new Contract(address, _abi, signerOrProvider) as IQNFTGov;
  }
}
