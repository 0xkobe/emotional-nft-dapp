/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IQSettings, IQSettingsInterface } from "../IQSettings";

const _abi = [
  {
    inputs: [],
    name: "foundation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "qstk",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IQSettings__factory {
  static readonly abi = _abi;
  static createInterface(): IQSettingsInterface {
    return new utils.Interface(_abi) as IQSettingsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IQSettings {
    return new Contract(address, _abi, signerOrProvider) as IQSettings;
  }
}
