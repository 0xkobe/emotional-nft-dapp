/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "ERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Upgradeable__factory>;
    getContractFactory(
      name: "ERC20BurnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20BurnableUpgradeable__factory>;
    getContractFactory(
      name: "IERC20MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Upgradeable__factory>;
    getContractFactory(
      name: "ERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Upgradeable__factory>;
    getContractFactory(
      name: "ERC721EnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721EnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IERC721EnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721EnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IERC721MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC721ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "IERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Upgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "IQAirdrop",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IQAirdrop__factory>;
    getContractFactory(
      name: "IQNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IQNFT__factory>;
    getContractFactory(
      name: "IQNFTGov",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IQNFTGov__factory>;
    getContractFactory(
      name: "IQNFTSettings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IQNFTSettings__factory>;
    getContractFactory(
      name: "IQSettings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IQSettings__factory>;
    getContractFactory(
      name: "QAirdrop",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.QAirdrop__factory>;
    getContractFactory(
      name: "QNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.QNFT__factory>;
    getContractFactory(
      name: "QNFTGov",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.QNFTGov__factory>;
    getContractFactory(
      name: "QNFTSettings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.QNFTSettings__factory>;
    getContractFactory(
      name: "QRep",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.QRep__factory>;
    getContractFactory(
      name: "QSettings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.QSettings__factory>;
    getContractFactory(
      name: "QStk",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.QStk__factory>;
    getContractFactory(
      name: "MockMultisig",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockMultisig__factory>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
  }
}
