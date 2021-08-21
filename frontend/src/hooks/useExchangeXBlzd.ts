import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync } from 'state/actions'
import { exchangeXBlzd } from 'utils/callHelpers'
import { useXBlzd } from './useContract'

const useExchangeXBlzd = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const xBlzdContract = useXBlzd()

  const handleExchange = useCallback(
    async (amount: string) => {
      const txHash = await exchangeXBlzd(xBlzdContract, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, xBlzdContract],
  )

  return { onExchange: handleExchange }
}
export default useExchangeXBlzd
