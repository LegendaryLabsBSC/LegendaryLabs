import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@legendarylabs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useXBlzdApprove } from 'hooks/useApprove'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { useXBlzdAllowance } from 'hooks/useAllowance'
import useExchangeXBlzd from 'hooks/useExchangeXBlzd'
import BlzdWalletBalance from './BlzdWalletBalance'

const StyledFarmStakingCard = styled(Card)``

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`

const RowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.textSubtle};
  margin: 16px 0;
`

const CardImage = styled.img`
  margin-right: 8px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const ExchangeBLZDCard = () => {
  const { account } = useWallet()
  const blzdBalance = useTokenBalance(getCakeAddress())
  const [requestedApproval, setRequestedApproval] = useState(false)
  const allowance = useXBlzdAllowance()
  const onApprove = useXBlzdApprove()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const { onExchange } = useExchangeXBlzd()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderApprovalOrExchangeButton = () => {
    return isApproved ? (
      <Button
        style={{ width: '100%' }}
        mt="8px"
        disabled={blzdBalance.isLessThanOrEqualTo(0)}
        onClick={async () => {
          await onExchange(blzdBalance.toString())
        }}
      >
        Exchange
      </Button>
    ) : (
      <Button style={{ width: '100%' }} mt="8px" disabled={requestedApproval} onClick={handleApprove}>
        Approve
      </Button>
    )
  }

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          Exchange BLZD to xBLZD
        </Heading>
        <RowBetween>
          <CardImage
            src="https://raw.githubusercontent.com/blzd-dev/blzd-frontend/master/public/images/blzd/2.png"
            alt="blzd logo"
            width={64}
            height={64}
          />
          <Block>
            <Label>BLZD in Wallet</Label>
            <BlzdWalletBalance />
          </Block>
        </RowBetween>
        <Divider />
        <RowBetween>
          <CardImage
            src="https://raw.githubusercontent.com/blzd-dev/blzd-frontend/master/public/images/blzd/2.png"
            alt="blzd logo"
            width={64}
            height={64}
          />
          <Block>
            <Label>xBLZD</Label>
            <BlzdWalletBalance />
          </Block>
        </RowBetween>
        <Actions>{account ? renderApprovalOrExchangeButton() : <UnlockButton fullWidth />}</Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default ExchangeBLZDCard
