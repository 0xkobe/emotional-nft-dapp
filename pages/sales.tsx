import { BigNumber } from '@ethersproject/bignumber'
import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts'
import { formatEther, parseEther } from '@ethersproject/units'
import Head from 'next/head'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import Button from '../components/button/button'
import Input from '../components/input/input'
import ModalError from '../components/modal/modal-error'
import ModalMetamask from '../components/modal/modal-metamask'
import ModalProcessing from '../components/modal/modal-processing'
import ModalTransactionSucceed from '../components/modal/modal-transaction-succeed'
import { abi, deployedAddresses } from '../data/smartContract'
import useContract from '../hooks/useContract'
import useWallet from '../hooks/useWallet'
import { QCrowdSale } from '../types/contracts'

export default function Mint(): JSX.Element {
  // init wallet
  const { account, signer, error: walletError } = useWallet()

  // init QCrowdSale smart contract
  const { contract: qCrowdSale } = useContract<QCrowdSale>(
    deployedAddresses.qCrowdSale,
    abi.qCrowdSale,
  )

  // state variables
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)
  const [saleStarted, setSaleStarted] = useState<boolean>()
  const [qstkAmount, setQstkAmount] = useState<BigNumber>()
  const [qstkPrice, setQstkPrice] = useState<BigNumber>()
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [receipt, setReceipt] = useState<ContractReceipt>()
  const [tx, setTx] = useState<ContractTransaction>()

  // connect walletError to error
  useEffect(() => {
    if (walletError) setError(walletError.message)
  }, [walletError])

  // manage isLoading
  useEffect(() => {
    if (saleStarted === undefined || qstkPrice === undefined) return
    setIsLoading(false)
  }, [saleStarted, qstkPrice])

  // fetch qstkPrice
  useEffect(() => {
    qCrowdSale?.qstkPrice().then(setQstkPrice).catch(setError)
  }, [qCrowdSale])

  // check if sale is started
  useEffect(() => {
    qCrowdSale?.started().then(setSaleStarted).catch(setError)
  }, [qCrowdSale])

  const totalPrice = useMemo(() => {
    if (!qstkAmount || !qstkPrice) return
    return qstkAmount.mul(qstkPrice).div(BigNumber.from(10).pow(18))
  }, [qstkAmount, qstkPrice])

  // button handle function
  const handleSubmit = () => {
    if (isDisabled()) return
    setIsPurchasing(true)
  }

  // sign & broadcast transaction
  useEffect(() => {
    if (!isPurchasing || !account || !qCrowdSale || !signer || !qstkAmount)
      return

    qCrowdSale
      .connect(signer)
      .buyQStk(qstkAmount, { value: totalPrice })
      .then(setTx)
      .catch((error) => {
        console.error('sign and broadcast tx error', error)
        setError(error.error?.message || error.message)
        setIsPurchasing(false)
      })
    return () => {
      setTx(undefined)
    }
  }, [signer, qstkAmount, isPurchasing, account, qCrowdSale, totalPrice])

  // wait for receipt
  useEffect(() => {
    if (!tx) return
    tx.wait()
      .then(setReceipt)
      .catch((error) => {
        console.error('receipt error', error)
        setError(error.message)
        setIsPurchasing(false)
      })
    return () => {
      setReceipt(undefined)
    }
  }, [tx])

  function transactionUI() {
    if (!isPurchasing) return
    if (receipt) {
      return (
        <ModalTransactionSucceed
          title="Transaction Succeeded"
          text={
            <>
              You successfully purchased{' '}
              {qstkAmount ? formatEther(qstkAmount) : '-'} QSTK tokens
            </>
          }
          href=""
          buttonText={<>Check my wallet on Etherscan</>}
          onModalClose={() => {
            setReceipt(undefined)
          }}
          onRequestClose={() => {
            setReceipt(undefined)
          }}
        />
      )
    }
    if (tx) {
      return <ModalProcessing isShown={true} transactionHash={tx.hash} />
    }
    return (
      <ModalMetamask
        title="Continue on Wallet"
        content={
          <>
            Please open your Ethereum wallet and follow the instructions to
            continue the purchase process
          </>
        }
        isShown
        onRequestClose={() => setIsPurchasing(false)}
      ></ModalMetamask>
    )
  }

  function errorUI() {
    if (!error) return
    return (
      <ModalError
        onRequestClose={() => setError(undefined)}
        isShown={true}
        error={error}
      />
    )
  }

  function isDisabled() {
    return qstkAmount === undefined || qstkAmount.eq(0)
  }

  return (
    <>
      <Head>
        <title>Purchase QSTK</title>
      </Head>
      <div>
        {isLoading && 'loading...'}
        {!isLoading &&
          (saleStarted ? (
            <div>
              <Input
                placeholder="1,000"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setQstkAmount(parseEther(e.target.value || '0'))
                }}
              />
              <span>
                Total: {totalPrice ? formatEther(totalPrice) : '-'} ETH
              </span>
              <span className="cursor-pointer">
                <Button disabled={isDisabled()} onClick={handleSubmit}>
                  Purchase
                </Button>
              </span>
            </div>
          ) : (
            'Sale is not started'
          ))}
        {isPurchasing && transactionUI()}
        {error && errorUI()}
      </div>
    </>
  )
}
