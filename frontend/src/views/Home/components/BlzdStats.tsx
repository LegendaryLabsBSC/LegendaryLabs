import React from 'react'
import { Card, CardBody, Heading, Text } from '@legendarylabs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceBlzdBusd } from '../../../state/hooks'

const StyledBlzdStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const BlzdStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms()
  const blzdPrice = usePriceBlzdBusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const blzdSupply = getBalanceNumber(circSupply)
  const marketCap = blzdPrice.times(circSupply)

  let blzdPerBlock = 0
  if (farms && farms[0] && farms[0].blzdPerBlock) {
    blzdPerBlock = new BigNumber(farms[0].blzdPerBlock).div(new BigNumber(10).pow(18)).toNumber()
  }

  return (
    <StyledBlzdStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'BLZD Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total BLZD Supply')}</Text>
          {blzdSupply && <CardValue fontSize="14px" value={blzdSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total BLZD Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New BLZD/block')}</Text>
          <Text bold fontSize="14px">
            {blzdPerBlock}
          </Text>
        </Row>
      </CardBody>
    </StyledBlzdStats>
  )
}

export default BlzdStats
