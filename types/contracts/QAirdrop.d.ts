/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface QAirdropInterface extends ethers.utils.Interface {
  functions: {
    "addWhitelistedContract(address)": FunctionFragment;
    "airdropClaimable()": FunctionFragment;
    "claimQStk(address,uint256,bytes)": FunctionFragment;
    "claimed(bytes)": FunctionFragment;
    "getMessageHash(address,uint256)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "removeWhitelistedContract(address)": FunctionFragment;
    "setAirdropClaimable(bool)": FunctionFragment;
    "setSettings(address)": FunctionFragment;
    "setVerifier(address)": FunctionFragment;
    "settings()": FunctionFragment;
    "verifier()": FunctionFragment;
    "verify(address,uint256,bytes)": FunctionFragment;
    "whitelistedContracts(address)": FunctionFragment;
    "withdrawLockedQStk(address,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addWhitelistedContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "airdropClaimable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimQStk",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "claimed", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "getMessageHash",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeWhitelistedContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setAirdropClaimable",
    values: [boolean]
  ): string;
  encodeFunctionData(functionFragment: "setSettings", values: [string]): string;
  encodeFunctionData(functionFragment: "setVerifier", values: [string]): string;
  encodeFunctionData(functionFragment: "settings", values?: undefined): string;
  encodeFunctionData(functionFragment: "verifier", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistedContracts",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLockedQStk",
    values: [string, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addWhitelistedContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "airdropClaimable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimQStk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMessageHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeWhitelistedContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAirdropClaimable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSettings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "settings", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "verifier", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "whitelistedContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLockedQStk",
    data: BytesLike
  ): Result;

  events: {
    "AddWhitelistedContract(address)": EventFragment;
    "ClaimQStk(address,uint256)": EventFragment;
    "RemoveWhitelistedContract(address)": EventFragment;
    "SetVerifier(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddWhitelistedContract"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ClaimQStk"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveWhitelistedContract"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetVerifier"): EventFragment;
}

export class QAirdrop extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: QAirdropInterface;

  functions: {
    addWhitelistedContract(
      _contract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    airdropClaimable(overrides?: CallOverrides): Promise<[boolean]>;

    claimQStk(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimed(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

    getMessageHash(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    initialize(
      _settings: string,
      _verifier: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeWhitelistedContract(
      _contract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAirdropClaimable(
      _airdropClaimable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSettings(
      _settings: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setVerifier(
      _verifier: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settings(overrides?: CallOverrides): Promise<[string]>;

    verifier(overrides?: CallOverrides): Promise<[string]>;

    verify(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    whitelistedContracts(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    withdrawLockedQStk(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addWhitelistedContract(
    _contract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  airdropClaimable(overrides?: CallOverrides): Promise<boolean>;

  claimQStk(
    _recipient: string,
    _qstkAmount: BigNumberish,
    _signature: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimed(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  getMessageHash(
    _to: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  initialize(
    _settings: string,
    _verifier: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeWhitelistedContract(
    _contract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAirdropClaimable(
    _airdropClaimable: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSettings(
    _settings: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setVerifier(
    _verifier: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settings(overrides?: CallOverrides): Promise<string>;

  verifier(overrides?: CallOverrides): Promise<string>;

  verify(
    _recipient: string,
    _qstkAmount: BigNumberish,
    _signature: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  whitelistedContracts(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  withdrawLockedQStk(
    _recipient: string,
    _qstkAmount: BigNumberish,
    _signature: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addWhitelistedContract(
      _contract: string,
      overrides?: CallOverrides
    ): Promise<void>;

    airdropClaimable(overrides?: CallOverrides): Promise<boolean>;

    claimQStk(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    claimed(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    getMessageHash(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    initialize(
      _settings: string,
      _verifier: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeWhitelistedContract(
      _contract: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setAirdropClaimable(
      _airdropClaimable: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setSettings(_settings: string, overrides?: CallOverrides): Promise<void>;

    setVerifier(_verifier: string, overrides?: CallOverrides): Promise<void>;

    settings(overrides?: CallOverrides): Promise<string>;

    verifier(overrides?: CallOverrides): Promise<string>;

    verify(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    whitelistedContracts(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdrawLockedQStk(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    AddWhitelistedContract(
      whitelisted?: string | null
    ): TypedEventFilter<[string], { whitelisted: string }>;

    ClaimQStk(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    RemoveWhitelistedContract(
      whitelisted?: string | null
    ): TypedEventFilter<[string], { whitelisted: string }>;

    SetVerifier(
      verifier?: string | null
    ): TypedEventFilter<[string], { verifier: string }>;
  };

  estimateGas: {
    addWhitelistedContract(
      _contract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    airdropClaimable(overrides?: CallOverrides): Promise<BigNumber>;

    claimQStk(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimed(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    getMessageHash(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _settings: string,
      _verifier: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeWhitelistedContract(
      _contract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAirdropClaimable(
      _airdropClaimable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSettings(
      _settings: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setVerifier(
      _verifier: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settings(overrides?: CallOverrides): Promise<BigNumber>;

    verifier(overrides?: CallOverrides): Promise<BigNumber>;

    verify(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    whitelistedContracts(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawLockedQStk(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addWhitelistedContract(
      _contract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    airdropClaimable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claimQStk(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimed(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMessageHash(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _settings: string,
      _verifier: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeWhitelistedContract(
      _contract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAirdropClaimable(
      _airdropClaimable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSettings(
      _settings: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setVerifier(
      _verifier: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settings(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verifier(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verify(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    whitelistedContracts(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawLockedQStk(
      _recipient: string,
      _qstkAmount: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
