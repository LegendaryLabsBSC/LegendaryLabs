import React from 'react'
// import ethers from 'hardhat'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Card } from '@legendarylabs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from './components/FarmStakingCard'
// import LotteryCard from './components/LotteryCard'
import BlzdStats from './components/BlzdStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
// import TwitterCard from './components/TwitterCard'

// const LegendaryLabs = async () => {
//   await ethers.getContractFactory("LegendsNFT");
//   const CONTRACT_ADDRESS = process.env.CONTRACT

//   const Labratory = async () => {
//     await ethers.getContractFactory("LegendsNFT"); 
//   } // The string can be the name of any .sol file inside ./contracts
//   const CONTRACT_ADDRESS = process.env.CONTRACT;
//   LegendaryLabs.attach(CONTRACT_ADDRESS);
// }

const Hero = styled.div`
  align-items: center;
  background-image: url('https://raw.githubusercontent.com/blzd-dev/blzd-frontend/master/public/images/blzd/3.png');
  background-size: 110px;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('https://raw.githubusercontent.com/blzd-dev/blzd-frontend/master/public/images/blzd/3.png'),
      url('https://raw.githubusercontent.com/blzd-dev/blzd-frontend/master/public/images/blzd/3b.png');
    background-size: 150px;
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Card>
          <Heading as="h1" size="xl" mb="24px" color="primary">
            {TranslateString(576, 'BLIZZARD.MONEY')}
          </Heading>
          <Text>{TranslateString(578, 'The best DEFI app on Binance Smart Chain.')}</Text>
        </Card>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <BlzdStats />
        </Cards>
      </div>
      <TotalValueLockedCard />
      {/* <TwitterCard/> */}
    </Page>
  )
}

export default Home
