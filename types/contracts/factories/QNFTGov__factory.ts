/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { QNFTGov, QNFTGovInterface } from "../QNFTGov";

const _abi = [
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
        name: "ultisig",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "SafeWithdraw",
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
        name: "originAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentAmount",
        type: "uint256",
      },
    ],
    name: "UpdateVote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "multisig",
        type: "address",
      },
    ],
    name: "VoteGovernanceAddress",
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
        indexed: true,
        internalType: "address",
        name: "multisig",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawToGovernanceAddress",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "MIN_VOTE_DURATION",
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
    name: "PERCENT_MAX",
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
    name: "SAFE_VOTE_END_DURATION",
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
    name: "VOTE_QUORUM",
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
        name: "",
        type: "address",
      },
    ],
    name: "canVote",
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
        name: "_settings",
        type: "address",
      },
      {
        internalType: "address",
        name: "_qnftSettings",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "qnft",
    outputs: [
      {
        internalType: "contract IQNFT",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "qnftSettings",
    outputs: [
      {
        internalType: "contract IQNFTSettings",
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
        internalType: "address payable",
        name: "multisig",
        type: "address",
      },
    ],
    name: "safeWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IQNFT",
        name: "_qnft",
        type: "address",
      },
    ],
    name: "setQNft",
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
    name: "totalUsers",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voteAddressByVoter",
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
        name: "multisig",
        type: "address",
      },
    ],
    name: "voteGovernanceAddress",
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
    name: "voteResult",
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
    name: "voteStatus",
    outputs: [
      {
        internalType: "bool",
        name: "mintStarted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "mintFinished",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "ableToWithdraw",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "ableToSafeWithdraw",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "multisig",
        type: "address",
      },
    ],
    name: "withdrawToGovernanceAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506114ae806100206000396000f3fe60806040526004361061012d5760003560e01c8063838a4107116100a5578063bff1f9e111610074578063d151319411610059578063d151319414610309578063e06174e41461031e578063e893a5e71461033357610134565b8063bff1f9e1146102df578063c7761fab146102f457610134565b8063838a410714610252578063adfaa72e14610272578063af8bd2f51461029f578063b7d35ed4146102bf57610134565b806351b8f00f116100fc578063572ee8d4116100e1578063572ee8d4146101f85780637562a1071461020d5780637ae6ee321461022d57610134565b806351b8f00f146101c357806353f03635146101d857610134565b80630416614c146101365780633eedfc1014610156578063485cc955146101815780634fa2f3b0146101a157610134565b3661013457005b005b34801561014257600080fd5b50610134610151366004610f12565b610353565b34801561016257600080fd5b5061016b610490565b60405161017891906113ad565b60405180910390f35b34801561018d57600080fd5b5061013461019c366004610f51565b610497565b3480156101ad57600080fd5b506101b661055b565b6040516101789190610ff5565b3480156101cf57600080fd5b5061016b61056a565b3480156101e457600080fd5b506101346101f3366004610f12565b61056f565b34801561020457600080fd5b5061016b61066e565b34801561021957600080fd5b50610134610228366004610f12565b610675565b34801561023957600080fd5b506102426107d3565b6040516101789493929190611014565b34801561025e57600080fd5b5061013461026d366004610f12565b6109bc565b34801561027e57600080fd5b5061029261028d366004610f12565b610b2e565b6040516101789190611009565b3480156102ab57600080fd5b506101b66102ba366004610f12565b610b43565b3480156102cb57600080fd5b506101346102da366004610f89565b610b5e565b3480156102eb57600080fd5b5061016b610d02565b34801561030057600080fd5b5061016b610d08565b34801561031557600080fd5b506101b6610d0d565b34801561032a57600080fd5b506101b6610d1c565b34801561033f57600080fd5b5061016b61034e366004610f12565b610d2b565b6002603354141561037f5760405162461bcd60e51b815260040161037690611319565b60405180910390fd5b6002603355600061038e6107d3565b5092505050806103b05760405162461bcd60e51b815260040161037690611350565b606460466065546103c191906113fc565b6103cb91906113dc565b6001600160a01b03831660009081526066602052604090205410156104025760405162461bcd60e51b815260040161037690611202565b60405147906001600160a01b0384169082156108fc029083906000818181858888f1935050505015801561043a573d6000803e3d6000fd5b50826001600160a01b0316336001600160a01b03167f7e0b422a2aac4293f463a59c6f9f25547884d8efcd57173dbea1bc7b19dc15788360405161047e91906113ad565b60405180910390a35050600160335550565b62093a8081565b600054610100900460ff16806104b0575060005460ff16155b6104cc5760405162461bcd60e51b81526004016103769061125f565b600054610100900460ff161580156104f7576000805460ff1961ff0019909116610100171660011790555b6104ff610d3d565b610507610dba565b606a80546001600160a01b0380861673ffffffffffffffffffffffffffffffffffffffff1992831617909255606b8054928516929091169190911790558015610556576000805461ff00191690555b505050565b6069546001600160a01b031681565b606481565b606a546040805163481c6a7560e01b8152905133926001600160a01b03169163481c6a75916004808301926020929190829003018186803b1580156105b357600080fd5b505afa1580156105c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105eb9190610f35565b6001600160a01b0316146106115760405162461bcd60e51b8152600401610376906112bc565b6069546001600160a01b038281169116141561063f5760405162461bcd60e51b815260040161037690611035565b6069805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b621baf8081565b6000806106806107d3565b505091509150816106a35760405162461bcd60e51b815260040161037690611137565b806106c05760405162461bcd60e51b81526004016103769061106c565b3360009081526068602052604090205460ff166106ef5760405162461bcd60e51b8152600401610376906110da565b336000908152606760205260409020546001600160a01b03161561074457336000908152606760209081526040808320546001600160a01b031683526066909152812080549161073e8361141b565b91905055505b6001600160a01b038316600090815260666020526040812080549161076883611432565b909155505033600081815260676020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03881690811790915590519092917f9e6794e777d3e0ae066ce4c3b026bcd96209e81fe265b7e8f8be47399312ec1691a3505050565b600080600080606b60009054906101000a90046001600160a01b03166001600160a01b031663a9722cf36040518163ffffffff1660e01b815260040160206040518083038186803b15801561082757600080fd5b505afa15801561083b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085f9190610fbd565b9350606b60009054906101000a90046001600160a01b03166001600160a01b03166375143ef26040518163ffffffff1660e01b815260040160206040518083038186803b1580156108af57600080fd5b505afa1580156108c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e79190610fbd565b92508380156108f35750825b156109b657606b54604080517f717a002b00000000000000000000000000000000000000000000000000000000815290516000926001600160a01b03169163717a002b916004808301926020929190829003018186803b15801561095657600080fd5b505afa15801561096a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098e9190610fdd565b905061099d62093a80826113c4565b42101592506109af621baf80826113c4565b4210159150505b90919293565b606a546040805163481c6a7560e01b8152905133926001600160a01b03169163481c6a75916004808301926020929190829003018186803b158015610a0057600080fd5b505afa158015610a14573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a389190610f35565b6001600160a01b031614610a5e5760405162461bcd60e51b8152600401610376906112bc565b60026033541415610a815760405162461bcd60e51b815260040161037690611319565b60026033556000610a906107d3565b935050505080610ab25760405162461bcd60e51b81526004016103769061116e565b60405147906001600160a01b0384169082156108fc029083906000818181858888f19350505050158015610aea573d6000803e3d6000fd5b50826001600160a01b0316336001600160a01b03167f4f419798e514c337b327bb657066e69201f8adf380d6894b7f60cdf937ea9f038360405161047e91906113ad565b60686020526000908152604090205460ff1681565b6067602052600090815260409020546001600160a01b031681565b610b66610e22565b6069546001600160a01b03908116911614610b935760405162461bcd60e51b8152600401610376906110a3565b80821415610bb35760405162461bcd60e51b8152600401610376906111cb565b81610bf3576001600160a01b0383166000908152606860205260408120805460ff191660011790556065805491610be983611432565b9190505550610cba565b80610cba576001600160a01b038381166000908152606760205260409020541615610c86576001600160a01b03808416600090815260676020908152604080832054909316825260669052908120805491610c4d8361141b565b90915550506001600160a01b0383166000908152606760205260409020805473ffffffffffffffffffffffffffffffffffffffff191690555b6001600160a01b0383166000908152606860205260408120805460ff191690556065805491610cb48361141b565b91905055505b826001600160a01b03167f0c0afe219ec898fea002d3c79b846424ddec21c9787dc4be81bd87dbf85b00448383604051610cf59291906113b6565b60405180910390a2505050565b60655481565b604681565b606b546001600160a01b031681565b606a546001600160a01b031681565b60666020526000908152604090205481565b600054610100900460ff1680610d56575060005460ff16155b610d725760405162461bcd60e51b81526004016103769061125f565b600054610100900460ff16158015610d9d576000805460ff1961ff0019909116610100171660011790555b610da5610e26565b8015610db7576000805461ff00191690555b50565b600054610100900460ff1680610dd3575060005460ff16155b610def5760405162461bcd60e51b81526004016103769061125f565b600054610100900460ff16158015610e1a576000805460ff1961ff0019909116610100171660011790555b610da5610e99565b3390565b600054610100900460ff1680610e3f575060005460ff16155b610e5b5760405162461bcd60e51b81526004016103769061125f565b600054610100900460ff16158015610da5576000805460ff1961ff0019909116610100171660011790558015610db7576000805461ff001916905550565b600054610100900460ff1680610eb2575060005460ff16155b610ece5760405162461bcd60e51b81526004016103769061125f565b600054610100900460ff16158015610ef9576000805460ff1961ff0019909116610100171660011790555b60016033558015610db7576000805461ff001916905550565b600060208284031215610f23578081fd5b8135610f2e81611463565b9392505050565b600060208284031215610f46578081fd5b8151610f2e81611463565b60008060408385031215610f63578081fd5b8235610f6e81611463565b91506020830135610f7e81611463565b809150509250929050565b600080600060608486031215610f9d578081fd5b8335610fa881611463565b95602085013595506040909401359392505050565b600060208284031215610fce578081fd5b81518015158114610f2e578182fd5b600060208284031215610fee578081fd5b5051919050565b6001600160a01b0391909116815260200190565b901515815260200190565b93151584529115156020840152151560408301521515606082015260800190565b60208082526019908201527f514e4654476f763a20514e465420616c72656164792073657400000000000000604082015260600190565b6020808252601b908201527f514e4654476f763a204e46542073616c65206e6f7420656e6465640000000000604082015260600190565b6020808252601b908201527f514e4654476f763a2063616c6c6572206973206e6f7420514e46540000000000604082015260600190565b6020808252602a908201527f514e4654476f763a2063616c6c657220686173206e6f206c6f636b656420717360408201527f746b2062616c616e636500000000000000000000000000000000000000000000606082015260800190565b60208082526019908201527f514e4654476f763a206d696e74206e6f74207374617274656400000000000000604082015260600190565b60208082526026908201527f514e4654476f763a207761697420756e74696c207361666520766f746520656e60408201527f642074696d650000000000000000000000000000000000000000000000000000606082015260800190565b60208082526013908201527f514e4654476f763a206e6f206368616e67657300000000000000000000000000604082015260600190565b60208082526037908201527f514e4654476f763a20737065636966696564206d756c7469736967206164647260408201527f657373206973206e6f7420766f74656420656e6f756768000000000000000000606082015260800190565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201527f647920696e697469616c697a6564000000000000000000000000000000000000606082015260800190565b60208082526022908201527f514e4654476f763a2063616c6c6572206973206e6f7420746865206d616e616760408201527f6572000000000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b60208082526021908201527f514e4654476f763a207761697420756e74696c20766f746520656e642074696d60408201527f6500000000000000000000000000000000000000000000000000000000000000606082015260800190565b90815260200190565b918252602082015260400190565b600082198211156113d7576113d761144d565b500190565b6000826113f757634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156114165761141661144d565b500290565b60008161142a5761142a61144d565b506000190190565b60006000198214156114465761144661144d565b5060010190565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b0381168114610db757600080fdfea2646970667358221220b248fe4e49cafbf0847db7355a11c75c11bb49ff545285bb359c8901cb39e60064736f6c63430008000033";

export class QNFTGov__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<QNFTGov> {
    return super.deploy(overrides || {}) as Promise<QNFTGov>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): QNFTGov {
    return super.attach(address) as QNFTGov;
  }
  connect(signer: Signer): QNFTGov__factory {
    return super.connect(signer) as QNFTGov__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QNFTGovInterface {
    return new utils.Interface(_abi) as QNFTGovInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QNFTGov {
    return new Contract(address, _abi, signerOrProvider) as QNFTGov;
  }
}
