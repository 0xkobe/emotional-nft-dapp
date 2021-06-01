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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IQSettingsInterface extends ethers.utils.Interface {
  functions: {
    "getFoundationWallet()": FunctionFragment;
    "getManager()": FunctionFragment;
    "getQAirdrop()": FunctionFragment;
    "getQNft()": FunctionFragment;
    "getQNftGov()": FunctionFragment;
    "getQNftSettings()": FunctionFragment;
    "getQStk()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getFoundationWallet",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getQAirdrop",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getQNft", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getQNftGov",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getQNftSettings",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getQStk", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "getFoundationWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getQAirdrop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getQNft", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getQNftGov", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getQNftSettings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getQStk", data: BytesLike): Result;

  events: {};
}

export class IQSettings extends BaseContract {
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

  interface: IQSettingsInterface;

  functions: {
    getFoundationWallet(overrides?: CallOverrides): Promise<[string]>;

    getManager(overrides?: CallOverrides): Promise<[string]>;

    getQAirdrop(overrides?: CallOverrides): Promise<[string]>;

    getQNft(overrides?: CallOverrides): Promise<[string]>;

    getQNftGov(overrides?: CallOverrides): Promise<[string]>;

    getQNftSettings(overrides?: CallOverrides): Promise<[string]>;

    getQStk(overrides?: CallOverrides): Promise<[string]>;
  };

  getFoundationWallet(overrides?: CallOverrides): Promise<string>;

  getManager(overrides?: CallOverrides): Promise<string>;

  getQAirdrop(overrides?: CallOverrides): Promise<string>;

  getQNft(overrides?: CallOverrides): Promise<string>;

  getQNftGov(overrides?: CallOverrides): Promise<string>;

  getQNftSettings(overrides?: CallOverrides): Promise<string>;

  getQStk(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getFoundationWallet(overrides?: CallOverrides): Promise<string>;

    getManager(overrides?: CallOverrides): Promise<string>;

    getQAirdrop(overrides?: CallOverrides): Promise<string>;

    getQNft(overrides?: CallOverrides): Promise<string>;

    getQNftGov(overrides?: CallOverrides): Promise<string>;

    getQNftSettings(overrides?: CallOverrides): Promise<string>;

    getQStk(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getFoundationWallet(overrides?: CallOverrides): Promise<BigNumber>;

    getManager(overrides?: CallOverrides): Promise<BigNumber>;

    getQAirdrop(overrides?: CallOverrides): Promise<BigNumber>;

    getQNft(overrides?: CallOverrides): Promise<BigNumber>;

    getQNftGov(overrides?: CallOverrides): Promise<BigNumber>;

    getQNftSettings(overrides?: CallOverrides): Promise<BigNumber>;

    getQStk(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getFoundationWallet(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getQAirdrop(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getQNft(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getQNftGov(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getQNftSettings(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getQStk(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
