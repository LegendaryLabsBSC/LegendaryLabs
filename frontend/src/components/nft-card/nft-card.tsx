// import { Card } from '@legendarylabs/uikit'
import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  & {
    width: 300px;
    text-align: center;
    padding-top: 25px;
    img {
      padding: 25px;
    }
    background-color: whiteSmoke;
    border-radius: 10%;
    h3 {
      color: #000
    }
  }
`

// eslint-disable-next-line import/prefer-default-export
export const NftCard: React.FC = ({ children }) => {
  return <StyledCard>{children}</StyledCard>
}
