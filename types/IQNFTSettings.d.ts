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

interface IQNFTSettingsInterface extends ethers.utils.Interface {
  functions: {
    "calcMintPrice(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "characterCount()": FunctionFragment;
    "characterPrices(uint256)": FunctionFragment;
    "favCoinPrices(uint256)": FunctionFragment;
    "favCoinsCount()": FunctionFragment;
    "lockOptionLockDuration(uint256)": FunctionFragment;
    "lockOptionsCount()": FunctionFragment;
    "mintEndTime()": FunctionFragment;
    "mintFinished()": FunctionFragment;
    "mintPaused()": FunctionFragment;
    "mintStartTime()": FunctionFragment;
    "mintStarted()": FunctionFragment;
    "onlyAirdropUsers()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calcMintPrice",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "characterCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "characterPrices",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "favCoinPrices",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "favCoinsCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lockOptionLockDuration",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lockOptionsCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintEndTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintFinished",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintPaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintStartTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintStarted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onlyAirdropUsers",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "calcMintPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "characterCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "characterPrices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "favCoinPrices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "favCoinsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockOptionLockDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockOptionsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintEndTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintFinished",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintPaused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintStartTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintStarted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onlyAirdropUsers",
    data: BytesLike
  ): Result;

  events: {};
}

export class IQNFTSettings extends BaseContract {
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

  interface: IQNFTSettingsInterface;

  functions: {
    calcMintPrice(
      _characterId: BigNumberish,
      _favCoinId: BigNumberish,
      _lockOptionId: BigNumberish,
      _lockAmount: BigNumberish,
      _freeAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    characterCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    characterPrices(
      _nftCharacterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    favCoinPrices(
      _favCoinId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    favCoinsCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    lockOptionLockDuration(
      _lockOptionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    lockOptionsCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintEndTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintFinished(overrides?: CallOverrides): Promise<[boolean]>;

    mintPaused(overrides?: CallOverrides): Promise<[boolean]>;

    mintStartTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintStarted(overrides?: CallOverrides): Promise<[boolean]>;

    onlyAirdropUsers(overrides?: CallOverrides): Promise<[boolean]>;
  };

  calcMintPrice(
    _characterId: BigNumberish,
    _favCoinId: BigNumberish,
    _lockOptionId: BigNumberish,
    _lockAmount: BigNumberish,
    _freeAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  characterCount(overrides?: CallOverrides): Promise<BigNumber>;

  characterPrices(
    _nftCharacterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  favCoinPrices(
    _favCoinId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  favCoinsCount(overrides?: CallOverrides): Promise<BigNumber>;

  lockOptionLockDuration(
    _lockOptionId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lockOptionsCount(overrides?: CallOverrides): Promise<BigNumber>;

  mintEndTime(overrides?: CallOverrides): Promise<BigNumber>;

  mintFinished(overrides?: CallOverrides): Promise<boolean>;

  mintPaused(overrides?: CallOverrides): Promise<boolean>;

  mintStartTime(overrides?: CallOverrides): Promise<BigNumber>;

  mintStarted(overrides?: CallOverrides): Promise<boolean>;

  onlyAirdropUsers(overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    calcMintPrice(
      _characterId: BigNumberish,
      _favCoinId: BigNumberish,
      _lockOptionId: BigNumberish,
      _lockAmount: BigNumberish,
      _freeAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    characterCount(overrides?: CallOverrides): Promise<BigNumber>;

    characterPrices(
      _nftCharacterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    favCoinPrices(
      _favCoinId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    favCoinsCount(overrides?: CallOverrides): Promise<BigNumber>;

    lockOptionLockDuration(
      _lockOptionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lockOptionsCount(overrides?: CallOverrides): Promise<BigNumber>;

    mintEndTime(overrides?: CallOverrides): Promise<BigNumber>;

    mintFinished(overrides?: CallOverrides): Promise<boolean>;

    mintPaused(overrides?: CallOverrides): Promise<boolean>;

    mintStartTime(overrides?: CallOverrides): Promise<BigNumber>;

    mintStarted(overrides?: CallOverrides): Promise<boolean>;

    onlyAirdropUsers(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    calcMintPrice(
      _characterId: BigNumberish,
      _favCoinId: BigNumberish,
      _lockOptionId: BigNumberish,
      _lockAmount: BigNumberish,
      _freeAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    characterCount(overrides?: CallOverrides): Promise<BigNumber>;

    characterPrices(
      _nftCharacterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    favCoinPrices(
      _favCoinId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    favCoinsCount(overrides?: CallOverrides): Promise<BigNumber>;

    lockOptionLockDuration(
      _lockOptionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lockOptionsCount(overrides?: CallOverrides): Promise<BigNumber>;

    mintEndTime(overrides?: CallOverrides): Promise<BigNumber>;

    mintFinished(overrides?: CallOverrides): Promise<BigNumber>;

    mintPaused(overrides?: CallOverrides): Promise<BigNumber>;

    mintStartTime(overrides?: CallOverrides): Promise<BigNumber>;

    mintStarted(overrides?: CallOverrides): Promise<BigNumber>;

    onlyAirdropUsers(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    calcMintPrice(
      _characterId: BigNumberish,
      _favCoinId: BigNumberish,
      _lockOptionId: BigNumberish,
      _lockAmount: BigNumberish,
      _freeAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    characterCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    characterPrices(
      _nftCharacterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    favCoinPrices(
      _favCoinId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    favCoinsCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lockOptionLockDuration(
      _lockOptionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lockOptionsCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintEndTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintFinished(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintPaused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintStartTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintStarted(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onlyAirdropUsers(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
