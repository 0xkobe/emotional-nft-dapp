/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockQSettings, MockQSettingsInterface } from "../MockQSettings";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "c__0xf17c8f88",
        type: "bytes32",
      },
    ],
    name: "c_0xf17c8f88",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060d58061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063be7e31e014602d575b600080fd5b60436004803603810190603f9190605b565b6045565b005b50565b600081359050605581608b565b92915050565b600060208284031215606c57600080fd5b60006078848285016048565b91505092915050565b6000819050919050565b6092816081565b8114609c57600080fd5b5056fea26469706673582212204cb4413400ca5eb55563ca542d39150969f25624e326be547e22031f29e1161a64736f6c63430008000033";

export class MockQSettings__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockQSettings> {
    return super.deploy(overrides || {}) as Promise<MockQSettings>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockQSettings {
    return super.attach(address) as MockQSettings;
  }
  connect(signer: Signer): MockQSettings__factory {
    return super.connect(signer) as MockQSettings__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockQSettingsInterface {
    return new utils.Interface(_abi) as MockQSettingsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockQSettings {
    return new Contract(address, _abi, signerOrProvider) as MockQSettings;
  }
}
