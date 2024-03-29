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

interface IQNFTInterface extends ethers.utils.Interface {
  functions: {
    "qstkBalances(address)": FunctionFragment;
    "totalAssignedQstk()": FunctionFragment;
    "withdrawETH(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "qstkBalances",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalAssignedQstk",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "withdrawETH", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "qstkBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalAssignedQstk",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawETH",
    data: BytesLike
  ): Result;

  events: {};
}

export class IQNFT extends BaseContract {
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

  interface: IQNFTInterface;

  functions: {
    qstkBalances(user: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    totalAssignedQstk(overrides?: CallOverrides): Promise<[BigNumber]>;

    withdrawETH(
      multisig: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  qstkBalances(user: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalAssignedQstk(overrides?: CallOverrides): Promise<BigNumber>;

  withdrawETH(
    multisig: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    qstkBalances(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalAssignedQstk(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawETH(multisig: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    qstkBalances(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalAssignedQstk(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawETH(
      multisig: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    qstkBalances(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalAssignedQstk(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawETH(
      multisig: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
