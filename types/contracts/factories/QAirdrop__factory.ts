/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { QAirdrop, QAirdropInterface } from "../QAirdrop";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "whitelisted",
        type: "address",
      },
    ],
    name: "AddWhitelistedContract",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ClaimQStk",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "whitelisted",
        type: "address",
      },
    ],
    name: "RemoveWhitelistedContract",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "verifier",
        type: "address",
      },
    ],
    name: "SetVerifier",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
    ],
    name: "addWhitelistedContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "airdropClaimable",
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
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_qstkAmount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "claimQStk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "claimed",
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
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "getMessageHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_settings",
        type: "address",
      },
      {
        internalType: "address",
        name: "_verifier",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_whitelistedContracts",
        type: "address[]",
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
        name: "_contract",
        type: "address",
      },
    ],
    name: "removeWhitelistedContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_airdropClaimable",
        type: "bool",
      },
    ],
    name: "setAirdropClaimable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IQSettings",
        name: "_settings",
        type: "address",
      },
    ],
    name: "setSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_verifier",
        type: "address",
      },
    ],
    name: "setVerifier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settings",
    outputs: [
      {
        internalType: "contract IQSettings",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifier",
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
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_qstkAmount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "verify",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whitelistedContracts",
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
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_qstkAmount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "withdrawLockedQStk",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611c3b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80635437988d11610097578063a01d3c2c11610066578063a01d3c2c146101e7578063bbac408c146101fa578063bec1495b1461020d578063e06174e414610220576100f5565b80635437988d1461019b5780636f576e06146101ae57806377a24f36146101c15780637bf3211e146101d4576100f5565b8063391feebb116100d3578063391feebb1461014057806346704adb146101605780634df161ec14610173578063512c91df1461017b576100f5565b80630c32bfe3146100fa5780630ff24ee21461010f5780632b7ac3f314610122575b600080fd5b61010d6101083660046115b6565b610228565b005b61010d61011d366004611422565b6102e6565b61012a6103c8565b60405161013791906116b0565b60405180910390f35b61015361014e366004611422565b6103dc565b60405161013791906116dd565b61010d61016e366004611422565b6103f1565b6101536104d2565b61018e610189366004611534565b6104db565b60405161013791906116e8565b61010d6101a9366004611422565b61050e565b6101536101bc36600461155f565b61060f565b61010d6101cf36600461145a565b610626565b61010d6101e236600461155f565b61075c565b61010d6101f5366004611422565b6109b9565b6101536102083660046115ee565b610a8a565b61018e61021b36600461155f565b610aaa565b61012a610d3d565b6068546040805163481c6a7560e01b8152905133926001600160a01b03169163481c6a75916004808301926020929190829003018186803b15801561026c57600080fd5b505afa158015610280573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a4919061143e565b6001600160a01b0316146102d35760405162461bcd60e51b81526004016102ca906117b0565b60405180910390fd5b6065805460ff1916911515919091179055565b6068546040805163481c6a7560e01b8152905133926001600160a01b03169163481c6a75916004808301926020929190829003018186803b15801561032a57600080fd5b505afa15801561033e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610362919061143e565b6001600160a01b0316146103885760405162461bcd60e51b81526004016102ca906117b0565b61039181610d4c565b6040516001600160a01b038216907f9c5b5ddf7a0384c072f3c6390bca7e063d40f9e23fa62836da803a5231fc918490600090a250565b60655461010090046001600160a01b031681565b60666020526000908152604090205460ff1681565b6068546040805163481c6a7560e01b8152905133926001600160a01b03169163481c6a75916004808301926020929190829003018186803b15801561043557600080fd5b505afa158015610449573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046d919061143e565b6001600160a01b0316146104935760405162461bcd60e51b81526004016102ca906117b0565b61049c81610d92565b6040516001600160a01b038216907e4b42005ac19c25fb5202f51cf3b6af3e3c279d32e173722b9281b5a040128490600090a250565b60655460ff1681565b600082826040516020016104f0929190611641565b60405160208183030381529060405280519060200120905092915050565b6068546040805163481c6a7560e01b8152905133926001600160a01b03169163481c6a75916004808301926020929190829003018186803b15801561055257600080fd5b505afa158015610566573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058a919061143e565b6001600160a01b0316146105b05760405162461bcd60e51b81526004016102ca906117b0565b6065805474ffffffffffffffffffffffffffffffffffffffff0019166101006001600160a01b038416908102919091179091556040517ff7b3610989c397edaf17df30d264c265ec3cf32c46bcc3ccd0acb8e32bdd1c3690600090a250565b600061061c848484610ddb565b90505b9392505050565b600054610100900460ff168061063f575060005460ff16155b61065b5760405162461bcd60e51b81526004016102ca906119ae565b600054610100900460ff16158015610686576000805460ff1961ff0019909116610100171660011790555b61068e610e22565b610696610e9f565b6068805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03868116919091179091556065805474ffffffffffffffffffffffffffffffffffffffff001916610100928616929092029190911760ff19169055815160005b818110156107425761073084828151811061072357634e487b7160e01b600052603260045260246000fd5b6020026020010151610d92565b8061073a81611ba5565b9150506106f8565b50508015610756576000805461ff00191690555b50505050565b6002603354141561077f5760405162461bcd60e51b81526004016102ca90611b18565b600260335561078f838383610ddb565b6107ab5760405162461bcd60e51b81526004016102ca90611a4d565b60685460408051630c8ed27d60e31b815290516000926001600160a01b03169163647693e8916004808301926020929190829003018186803b1580156107f057600080fd5b505afa158015610804573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610828919061143e565b905082816001600160a01b03166370a08231306040518263ffffffff1660e01b815260040161085791906116b0565b60206040518083038186803b15801561086f57600080fd5b505afa158015610883573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a79190611629565b10156108c55760405162461bcd60e51b81526004016102ca906118f4565b60655460ff166108e75760405162461bcd60e51b81526004016102ca90611844565b6067826040516108f79190611663565b9081526040519081900360200190205460ff16156109275760405162461bcd60e51b81526004016102ca9061187b565b61093b6001600160a01b0382168585610f07565b600160678360405161094d9190611663565b908152604051908190036020018120805492151560ff19909316929092179091556001600160a01b038516907f3af0906e0f285adb932fbd9a93209987e0b87570e5a08dfe826d09243eff05ce906109a69086906116e8565b60405180910390a2505060016033555050565b6068546040805163481c6a7560e01b8152905133926001600160a01b03169163481c6a75916004808301926020929190829003018186803b1580156109fd57600080fd5b505afa158015610a11573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a35919061143e565b6001600160a01b031614610a5b5760405162461bcd60e51b81526004016102ca906117b0565b6068805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b805160208183018101805160678252928201919093012091525460ff1681565b600060026033541415610acf5760405162461bcd60e51b81526004016102ca90611b18565b6002603355610adf848484610ddb565b610afb5760405162461bcd60e51b81526004016102ca90611a4d565b60685460408051630c8ed27d60e31b815290516000926001600160a01b03169163647693e8916004808301926020929190829003018186803b158015610b4057600080fd5b505afa158015610b54573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b78919061143e565b905083816001600160a01b03166370a08231306040518263ffffffff1660e01b8152600401610ba791906116b0565b60206040518083038186803b158015610bbf57600080fd5b505afa158015610bd3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf79190611629565b1015610c155760405162461bcd60e51b81526004016102ca906118f4565b610c1e33610f8f565b610c3a5760405162461bcd60e51b81526004016102ca90611779565b3360009081526066602052604090205460ff16610c695760405162461bcd60e51b81526004016102ca90611951565b606783604051610c799190611663565b9081526040519081900360200190205460ff1615610ca95760405162461bcd60e51b81526004016102ca9061187b565b6001606784604051610cbb9190611663565b908152604051908190036020019020805491151560ff19909216919091179055610cef6001600160a01b0382163386610f07565b846001600160a01b03167f3af0906e0f285adb932fbd9a93209987e0b87570e5a08dfe826d09243eff05ce85604051610d2891906116e8565b60405180910390a25050600160335550919050565b6068546001600160a01b031681565b610d5581610f8f565b610d715760405162461bcd60e51b81526004016102ca90611779565b6001600160a01b03166000908152606660205260409020805460ff19169055565b610d9b81610f8f565b610db75760405162461bcd60e51b81526004016102ca90611779565b6001600160a01b03166000908152606660205260409020805460ff19166001179055565b600080610de885856104db565b60655490915061010090046001600160a01b0316610e0f84610e0984610f95565b90610fc5565b6001600160a01b03161495945050505050565b600054610100900460ff1680610e3b575060005460ff16155b610e575760405162461bcd60e51b81526004016102ca906119ae565b600054610100900460ff16158015610e82576000805460ff1961ff0019909116610100171660011790555b610e8a611064565b8015610e9c576000805461ff00191690555b50565b600054610100900460ff1680610eb8575060005460ff16155b610ed45760405162461bcd60e51b81526004016102ca906119ae565b600054610100900460ff16158015610eff576000805460ff1961ff0019909116610100171660011790555b610e8a6110d7565b610f8a8363a9059cbb60e01b8484604051602401610f269291906116c4565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611150565b505050565b3b151590565b600081604051602001610fa8919061167f565b604051602081830303815290604052805190602001209050919050565b600080600080845160411415610fef5750505060208201516040830151606084015160001a61104e565b8451604014156110365750505060408201516020830151907f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81169060ff1c601b0161104e565b60405162461bcd60e51b81526004016102ca9061180d565b61105a868285856111df565b9695505050505050565b600054610100900460ff168061107d575060005460ff16155b6110995760405162461bcd60e51b81526004016102ca906119ae565b600054610100900460ff16158015610e8a576000805460ff1961ff0019909116610100171660011790558015610e9c576000805461ff001916905550565b600054610100900460ff16806110f0575060005460ff16155b61110c5760405162461bcd60e51b81526004016102ca906119ae565b600054610100900460ff16158015611137576000805460ff1961ff0019909116610100171660011790555b60016033558015610e9c576000805461ff001916905550565b60006111a5826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166112d59092919063ffffffff16565b805190915015610f8a57808060200190518101906111c391906115d2565b610f8a5760405162461bcd60e51b81526004016102ca90611abb565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156112215760405162461bcd60e51b81526004016102ca906118b2565b8360ff16601b148061123657508360ff16601c145b6112525760405162461bcd60e51b81526004016102ca90611a0b565b60006001868686866040516000815260200160405260405161127794939291906116f1565b6020604051602081039080840390855afa158015611299573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166112cc5760405162461bcd60e51b81526004016102ca90611742565b95945050505050565b606061061c8484600085856112e985610f8f565b6113055760405162461bcd60e51b81526004016102ca90611a84565b600080866001600160a01b031685876040516113219190611663565b60006040518083038185875af1925050503d806000811461135e576040519150601f19603f3d011682016040523d82523d6000602084013e611363565b606091505b509150915061137382828661137e565b979650505050505050565b6060831561138d57508161061f565b82511561139d5782518084602001fd5b8160405162461bcd60e51b81526004016102ca919061170f565b600082601f8301126113c7578081fd5b813567ffffffffffffffff8111156113e1576113e1611bcc565b6113f4601f8201601f1916602001611b4f565b818152846020838601011115611408578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215611433578081fd5b813561061f81611be2565b60006020828403121561144f578081fd5b815161061f81611be2565b60008060006060848603121561146e578182fd5b833561147981611be2565b925060208481013561148a81611be2565b9250604085013567ffffffffffffffff808211156114a6578384fd5b818701915087601f8301126114b9578384fd5b8135818111156114cb576114cb611bcc565b83810291506114db848301611b4f565b8181528481019084860184860187018c10156114f5578788fd5b8795505b83861015611523578035945061150e85611be2565b848352600195909501949186019186016114f9565b508096505050505050509250925092565b60008060408385031215611546578182fd5b823561155181611be2565b946020939093013593505050565b600080600060608486031215611573578283fd5b833561157e81611be2565b925060208401359150604084013567ffffffffffffffff8111156115a0578182fd5b6115ac868287016113b7565b9150509250925092565b6000602082840312156115c7578081fd5b813561061f81611bf7565b6000602082840312156115e3578081fd5b815161061f81611bf7565b6000602082840312156115ff578081fd5b813567ffffffffffffffff811115611615578182fd5b611621848285016113b7565b949350505050565b60006020828403121561163a578081fd5b5051919050565b60609290921b6bffffffffffffffffffffffff19168252601482015260340190565b60008251611675818460208701611b79565b9190910192915050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c810191909152603c0190565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b901515815260200190565b90815260200190565b93845260ff9290921660208401526040830152606082015260800190565b600060208252825180602084015261172e816040850160208701611b79565b601f01601f19169190910160400192915050565b60208082526018908201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604082015260600190565b6020808252601e908201527f5141697264726f703a206e6f7420636f6e747261637420616464726573730000604082015260600190565b60208082526023908201527f5141697264726f703a2063616c6c6572206973206e6f7420746865206d616e6160408201527f6765720000000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252601f908201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604082015260600190565b60208082526017908201527f5141697264726f703a206e6f7420636c61696d61626c65000000000000000000604082015260600190565b60208082526019908201527f5141697264726f703a20616c726561647920636c61696d656400000000000000604082015260600190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604082015261756560f01b606082015260800190565b60208082526021908201527f5141697264726f703a206e6f7420656e6f756768207173746b2062616c616e6360408201527f6500000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526022908201527f5141697264726f703a206e6f742077686974656c697374656420636f6e74726160408201527f6374000000000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201527f647920696e697469616c697a6564000000000000000000000000000000000000606082015260800190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604082015261756560f01b606082015260800190565b6020808252601b908201527f5141697264726f703a20696e76616c6964207369676e61747572650000000000604082015260600190565b6020808252601d908201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604082015260600190565b6020808252602a908201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60408201527f6f74207375636365656400000000000000000000000000000000000000000000606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b60405181810167ffffffffffffffff81118282101715611b7157611b71611bcc565b604052919050565b60005b83811015611b94578181015183820152602001611b7c565b838111156107565750506000910152565b6000600019821415611bc557634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610e9c57600080fd5b8015158114610e9c57600080fdfea2646970667358221220a7ab3a1b3944c6fb1be70e7d50b81230f22cddee92124d8d22db71b74e88800964736f6c63430008000033";

export class QAirdrop__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<QAirdrop> {
    return super.deploy(overrides || {}) as Promise<QAirdrop>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): QAirdrop {
    return super.attach(address) as QAirdrop;
  }
  connect(signer: Signer): QAirdrop__factory {
    return super.connect(signer) as QAirdrop__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QAirdropInterface {
    return new utils.Interface(_abi) as QAirdropInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QAirdrop {
    return new Contract(address, _abi, signerOrProvider) as QAirdrop;
  }
}
