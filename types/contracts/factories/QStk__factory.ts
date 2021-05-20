/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { QStk, QStkInterface } from "../QStk";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "AddBlacklistedUser",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "RemoveBlacklistedUser",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "addBlacklistedUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isBlacklisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "removeBlacklistedUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611922806100206000396000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c80638da5cb5b116100b2578063dd62ed3e11610081578063fe4b84df11610066578063fe4b84df14610262578063fe575a8714610275578063fea329531461028857610136565b8063dd62ed3e1461023c578063f2fde38b1461024f57610136565b80638da5cb5b146101f957806395d89b411461020e578063a457c2d714610216578063a9059cbb1461022957610136565b8063313ce5671161010957806339509351116100ee57806339509351146101cb57806370a08231146101de578063715018a6146101f157610136565b8063313ce567146101a157806334334e9e146101b657610136565b806306fdde031461013b578063095ea7b31461015957806318160ddd1461017957806323b872dd1461018e575b600080fd5b61014361029b565b6040516101509190611244565b60405180910390f35b61016c6101673660046111e4565b61032d565b6040516101509190611239565b61018161034a565b6040516101509190611855565b61016c61019c3660046111a9565b610350565b6101a96103f0565b604051610150919061185e565b6101c96101c4366004611156565b6103f5565b005b61016c6101d93660046111e4565b6104da565b6101816101ec366004611156565b610529565b6101c9610548565b6102016105de565b6040516101509190611225565b6101436105ed565b61016c6102243660046111e4565b6105fc565b61016c6102373660046111e4565b610677565b61018161024a366004611177565b61068b565b6101c961025d366004611156565b6106b6565b6101c961027036600461120d565b610784565b61016c610283366004611156565b610880565b6101c9610296366004611156565b610895565b6060606880546102aa9061189b565b80601f01602080910402602001604051908101604052809291908181526020018280546102d69061189b565b80156103235780601f106102f857610100808354040283529160200191610323565b820191906000526020600020905b81548152906001019060200180831161030657829003601f168201915b5050505050905090565b600061034161033a61095e565b8484610962565b50600192915050565b60675490565b600061035d848484610a16565b6001600160a01b03841660009081526066602052604081208161037e61095e565b6001600160a01b03166001600160a01b03168152602001908152602001600020549050828110156103ca5760405162461bcd60e51b81526004016103c19061159d565b60405180910390fd5b6103e5856103d661095e565b6103e08685611884565b610962565b506001949350505050565b601290565b6103fd61095e565b6001600160a01b031661040e6105de565b6001600160a01b0316146104345760405162461bcd60e51b81526004016103c1906115fa565b6001600160a01b03811660009081526097602052604090205460ff1615156001146104715760405162461bcd60e51b81526004016103c19061140b565b6001600160a01b0381166000908152609760205260409020805460ff191690556104a38161049e81610529565b610b3e565b6040516001600160a01b038216907f3fd416f401ee119e2c3ce8d022e25d8205b19312a421ec5a2cfe94004ecffc2b90600090a250565b60006103416104e761095e565b8484606660006104f561095e565b6001600160a01b03908116825260208083019390935260409182016000908120918b16815292529020546103e0919061186c565b6001600160a01b0381166000908152606560205260409020545b919050565b61055061095e565b6001600160a01b03166105616105de565b6001600160a01b0316146105875760405162461bcd60e51b81526004016103c1906115fa565b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a36033805473ffffffffffffffffffffffffffffffffffffffff19169055565b6033546001600160a01b031690565b6060606980546102aa9061189b565b6000806066600061060b61095e565b6001600160a01b03908116825260208083019390935260409182016000908120918816815292529020549050828110156106575760405162461bcd60e51b81526004016103c1906117c1565b61066d61066261095e565b856103e08685611884565b5060019392505050565b600061034161068461095e565b8484610a16565b6001600160a01b03918216600090815260666020908152604080832093909416825291909152205490565b6106be61095e565b6001600160a01b03166106cf6105de565b6001600160a01b0316146106f55760405162461bcd60e51b81526004016103c1906115fa565b6001600160a01b03811661071b5760405162461bcd60e51b81526004016103c190611351565b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a36033805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b600054610100900460ff168061079d575060005460ff16155b6107b95760405162461bcd60e51b81526004016103c190611540565b600054610100900460ff161580156107e4576000805460ff1961ff0019909116610100171660011790555b6107ec610c24565b6108606040518060400160405280600c81526020017f5175697665722053746f636b00000000000000000000000000000000000000008152506040518060400160405280600481526020017f5153544b00000000000000000000000000000000000000000000000000000000815250610ca9565b61086a3383610d32565b801561087c576000805461ff00191690555b5050565b60976020526000908152604090205460ff1681565b61089d61095e565b6001600160a01b03166108ae6105de565b6001600160a01b0316146108d45760405162461bcd60e51b81526004016103c1906115fa565b6001600160a01b03811660009081526097602052604090205460ff161515600114156109125760405162461bcd60e51b81526004016103c19061168c565b6001600160a01b038116600081815260976020526040808220805460ff19166001179055517fcc4d52ebddf9328ea7e9d8d2822d459d876af84f79ba0b4f5cac1e11cd1ad8829190a250565b3390565b6001600160a01b0383166109885760405162461bcd60e51b81526004016103c190611720565b6001600160a01b0382166109ae5760405162461bcd60e51b81526004016103c1906113ae565b6001600160a01b0380841660008181526066602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610a09908590611855565b60405180910390a3505050565b6001600160a01b038316610a3c5760405162461bcd60e51b81526004016103c1906116c3565b6001600160a01b038216610a625760405162461bcd60e51b81526004016103c190611297565b610a6d838383610df2565b6001600160a01b03831660009081526065602052604090205481811015610aa65760405162461bcd60e51b81526004016103c19061149f565b610ab08282611884565b6001600160a01b038086166000908152606560205260408082209390935590851681529081208054849290610ae690849061186c565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b309190611855565b60405180910390a350505050565b6001600160a01b038216610b645760405162461bcd60e51b81526004016103c19061162f565b610b7082600083610df2565b6001600160a01b03821660009081526065602052604090205481811015610ba95760405162461bcd60e51b81526004016103c1906112f4565b610bb38282611884565b6001600160a01b03841660009081526065602052604081209190915560678054849290610be1908490611884565b90915550506040516000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610a09908690611855565b600054610100900460ff1680610c3d575060005460ff16155b610c595760405162461bcd60e51b81526004016103c190611540565b600054610100900460ff16158015610c84576000805460ff1961ff0019909116610100171660011790555b610c8c610ebc565b610c94610f2f565b8015610ca6576000805461ff00191690555b50565b600054610100900460ff1680610cc2575060005460ff16155b610cde5760405162461bcd60e51b81526004016103c190611540565b600054610100900460ff16158015610d09576000805460ff1961ff0019909116610100171660011790555b610d11610ebc565b610d1b8383611008565b8015610d2d576000805461ff00191690555b505050565b6001600160a01b038216610d585760405162461bcd60e51b81526004016103c19061181e565b610d6460008383610df2565b8060676000828254610d76919061186c565b90915550506001600160a01b03821660009081526065602052604081208054839290610da390849061186c565b90915550506040516001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610de6908590611855565b60405180910390a35050565b6001600160a01b038316610e0557610eb1565b6001600160a01b038216610e1857610eb1565b6001600160a01b03831660009081526097602052604090205460ff16151560011415610e565760405162461bcd60e51b81526004016103c19061177d565b6001600160a01b03821660009081526097602052604090205460ff16151560011415610e945760405162461bcd60e51b81526004016103c1906114fc565b80610eb15760405162461bcd60e51b81526004016103c190611442565b610d2d838383610d2d565b600054610100900460ff1680610ed5575060005460ff16155b610ef15760405162461bcd60e51b81526004016103c190611540565b600054610100900460ff16158015610c94576000805460ff1961ff0019909116610100171660011790558015610ca6576000805461ff001916905550565b600054610100900460ff1680610f48575060005460ff16155b610f645760405162461bcd60e51b81526004016103c190611540565b600054610100900460ff16158015610f8f576000805460ff1961ff0019909116610100171660011790555b6000610f9961095e565b6033805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015610ca6576000805461ff001916905550565b600054610100900460ff1680611021575060005460ff16155b61103d5760405162461bcd60e51b81526004016103c190611540565b600054610100900460ff16158015611068576000805460ff1961ff0019909116610100171660011790555b825161107b9060689060208601906110a6565b50815161108f9060699060208501906110a6565b508015610d2d576000805461ff0019169055505050565b8280546110b29061189b565b90600052602060002090601f0160209004810192826110d4576000855561111a565b82601f106110ed57805160ff191683800117855561111a565b8280016001018555821561111a579182015b8281111561111a5782518255916020019190600101906110ff565b5061112692915061112a565b5090565b5b80821115611126576000815560010161112b565b80356001600160a01b038116811461054357600080fd5b600060208284031215611167578081fd5b6111708261113f565b9392505050565b60008060408385031215611189578081fd5b6111928361113f565b91506111a06020840161113f565b90509250929050565b6000806000606084860312156111bd578081fd5b6111c68461113f565b92506111d46020850161113f565b9150604084013590509250925092565b600080604083850312156111f6578182fd5b6111ff8361113f565b946020939093013593505050565b60006020828403121561121e578081fd5b5035919050565b6001600160a01b0391909116815260200190565b901515815260200190565b6000602080835283518082850152825b8181101561127057858101830151858201604001528201611254565b818111156112815783604083870101525b50601f01601f1916929092016040019392505050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201527f6573730000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526022908201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60408201527f6365000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201527f6464726573730000000000000000000000000000000000000000000000000000606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560408201527f7373000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526016908201527f5153746b3a206e6f7420696e20626c61636b6c69737400000000000000000000604082015260600190565b60208082526021908201527f5153746b3a206e6f6e2d7a65726f20616d6f756e74206973207265717569726560408201527f6400000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526026908201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260408201527f616c616e63650000000000000000000000000000000000000000000000000000606082015260800190565b60208082526024908201527f5153746b3a20746172676574206164647265737320697320696e20626c61636b6040820152631b1a5cdd60e21b606082015260800190565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201527f647920696e697469616c697a6564000000000000000000000000000000000000606082015260800190565b60208082526028908201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160408201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526021908201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360408201527f7300000000000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252601a908201527f5153746b3a20616c726561647920696e20626c61636b6c697374000000000000604082015260600190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460408201527f6472657373000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460408201527f7265737300000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526024908201527f5153746b3a2073656e646572206164647265737320697320696e20626c61636b6040820152631b1a5cdd60e21b606082015260800190565b60208082526025908201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760408201527f207a65726f000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b90815260200190565b60ff91909116815260200190565b6000821982111561187f5761187f6118d6565b500190565b600082821015611896576118966118d6565b500390565b6002810460018216806118af57607f821691505b602082108114156118d057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220fb683b8d369557e0264ff88566f734f4122524643f67cb5fc53f6bf0331dda2964736f6c63430008000033";

export class QStk__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<QStk> {
    return super.deploy(overrides || {}) as Promise<QStk>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): QStk {
    return super.attach(address) as QStk;
  }
  connect(signer: Signer): QStk__factory {
    return super.connect(signer) as QStk__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QStkInterface {
    return new utils.Interface(_abi) as QStkInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): QStk {
    return new Contract(address, _abi, signerOrProvider) as QStk;
  }
}