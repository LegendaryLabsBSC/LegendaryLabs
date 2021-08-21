import React from 'react'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const BlzdWinnings = () => {
  const { claimAmount } = useTotalClaim()
  return <CardValue value={getBalanceNumber(claimAmount)} />
}

export default BlzdWinnings
