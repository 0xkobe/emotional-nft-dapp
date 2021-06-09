import { isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import {
  ChangeEvent,
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react'
import { abi, deployedAddresses } from '../../data/smartContract'
import useContract from '../../hooks/useContract'
import useWallet from '../../hooks/useWallet'
import { QNFT } from '../../types/contracts'
import Button from '../button/button'
import Input from '../input/input'
import Modal from '../modal/modal'
import ModalError from '../modal/modal-error'
import ModalMetamask from '../modal/modal-metamask'
import ModalProcessing from '../modal/modal-processing'
import ModalTransactionSucceed from '../modal/modal-transaction-succeed'

export type IProps = HTMLAttributes<any> & {
  tokenId: BigNumber
  onRequestClose?: () => void
  onModalClose?: () => void
}

const NFTTransferModal: FunctionComponent<IProps> = ({
  tokenId,
  onModalClose,
  onRequestClose,
}: IProps) => {
  const router = useRouter()
  const { push: redirect } = router

  // init wallet
  const { account, signer, error: walletError } = useWallet()

  // init QNFT smart contract
  const { contract: qnft } = useContract<QNFT>(deployedAddresses.qnft, abi.qnft)

  const [receiver, setReceiver] = useState('')
  const [receiverError, setReceiverError] = useState<string>()
  const [confirmTransfer, setConfirmTransfer] = useState(false)
  const [isTransferring, setIsTransferring] = useState(false)
  const [formIsFilled, setFormIsFilled] = useState(false)
  const [error, setError] = useState<string>()
  const [tx, setTx] = useState<ContractTransaction>()
  const [receipt, setReceipt] = useState<ContractReceipt>()

  // connect walletError to error
  useEffect(() => {
    if (walletError) setError(walletError.message)
  }, [walletError])

  // button handle function
  const handleSubmit = () => {
    setIsTransferring(true)
  }

  // activate / deactivate submit button
  useEffect(() => {
    if (!confirmTransfer) return setFormIsFilled(false)
    if (!receiver) return setFormIsFilled(false)
    if (receiverError) return setFormIsFilled(false)
    setFormIsFilled(true)
  }, [confirmTransfer, receiver, receiverError])

  // check receiver value
  useEffect(() => {
    if (receiver && !isAddress(receiver))
      return setReceiverError('Please enter a valid Ethereum address')
    setReceiverError(undefined)
  }, [receiver])

  // create and broadcast transaction
  useEffect(() => {
    if (!isTransferring) return
    if (!qnft) return
    if (!signer) return
    if (!account) return

    qnft
      .connect(signer)
      ['safeTransferFrom(address,address,uint256)'](account, receiver, tokenId)
      .then(setTx)
      .catch((error) => {
        console.error('sign and broadcast tx error', error)
        setError(error.error?.message || error.message)
        setIsTransferring(false)
      })
    return () => {
      setTx(undefined)
    }
  }, [isTransferring, qnft, signer, account, receiver, tokenId])

  // wait for receipt
  useEffect(() => {
    if (!tx) return
    tx.wait()
      .then(setReceipt)
      .catch((error) => {
        console.error('receipt error', error)
        setError(error.message)
        setIsTransferring(false)
      })
    return () => {
      setReceipt(undefined)
    }
  }, [tx])

  if (error)
    return (
      <ModalError
        onRequestClose={() => setError(undefined)}
        isShown
        error={error}
      />
    )
  if (!isTransferring)
    return (
      <Modal
        isShown
        onModalClose={onModalClose}
        onRequestClose={onRequestClose}
      >
        <div className="flex flex-col max-w-xs">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-3xl">
              <ArrowRightIcon className="w-5 h-5 stroke-current text-purple-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg leading-6 font-semibold text-purple-900 text-center mt-8">
                Transfer your NFT
              </span>
              <span className="text-sm leading-5 font-normal text-gray-500 text-center mt-2">
                Transfer this NFT and its QSTK Token allocated to another ETH
                address
              </span>
              <span className="text-sm leading-5 font-medium text-purple-900 mt-8">
                Receiver address
              </span>
              <Input
                className="mt-2 block"
                placeholder="0x00000000000000..."
                value={receiver}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setReceiver(e.target.value)
                }}
                isError={!!receiverError}
              />
              {receiverError && (
                <div className="text-red-500 text-xs mt-1">{receiverError}</div>
              )}
              <span className="text-sm leading-5 font-normal text-gray-500 text-left">
                <Input
                  id="transfer-checkbox-confirmation"
                  type="checkbox"
                  className="mt-8"
                  checked={confirmTransfer}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setConfirmTransfer(e.target.checked)
                  }}
                />
                <label
                  htmlFor="transfer-checkbox-confirmation"
                  className="ml-3"
                >
                  I understand that the QSTK token allocated with this NFT will
                  be transfer with it.
                </label>
              </span>
            </div>
          </div>
          <Button
            disabled={!formIsFilled}
            onClick={handleSubmit}
            className="mt-8"
          >
            Validate transfer
          </Button>
        </div>
      </Modal>
    )
  if (receipt) {
    return (
      <ModalTransactionSucceed
        text={<>Token successfully transferred</>}
        buttonText={<>Go to the Investor Space</>}
        href={`/wallet`}
        onRequestClose={() => void redirect(`/wallet`)}
      />
    )
  }
  if (tx) {
    return <ModalProcessing isShown transactionHash={tx.hash} />
  }
  return (
    <ModalMetamask
      title="Continue on Wallet"
      content={
        <>
          Please open your Ethereum wallet and follow the instructions to
          continue the Transfer process
        </>
      }
      isShown
      onRequestClose={() => setIsTransferring(false)}
    ></ModalMetamask>
  )
}

export default NFTTransferModal
