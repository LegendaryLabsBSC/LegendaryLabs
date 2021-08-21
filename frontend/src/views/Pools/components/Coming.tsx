import React from 'react'
import styled from 'styled-components'
import { Image, Button } from '@legendarylabs/uikit'
import { CommunityTag } from 'components/Tags'
import useI18n from 'hooks/useI18n'
import Card from './Card'
import CardTitle from './CardTitle'

const Balance = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 40px;
  font-weight: 600;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 16px;
`

const DetailPlaceholder = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 6px;
`
const Value = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`

const Footer = styled.div`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  padding: 24px;
`
const Coming: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Card>
      <div style={{ padding: '24px' }}>
        <CardTitle>{TranslateString(414, 'Your Project?')} </CardTitle>
        <Image
          src="https://raw.githubusercontent.com/blzd-dev/blzd-frontend/master/public/images/monster-question.png"
          width={64}
          height={64}
          alt="Your project here"
        />
        <Balance>???</Balance>
        <Label>{TranslateString(416, 'Create a pool for your token')}</Label>
        <Button
          variant="secondary"
          as="a"
          href="https://docs.google.com/forms/"
          external
          mb="16px"
          style={{ width: '100%' }}
        >
          {TranslateString(418, 'Apply Now')}
        </Button>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APR')}:</div>
          <Value>??</Value>
        </DetailPlaceholder>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>
            <span role="img" aria-label="syrup">
              ❄️{' '}
            </span>
            {TranslateString(384, 'Your Stake')}:
          </div>
          <Value>??? BLZD</Value>
        </DetailPlaceholder>
      </div>
      <Footer>
        <CommunityTag />
      </Footer>
    </Card>
  )
}

export default Coming
