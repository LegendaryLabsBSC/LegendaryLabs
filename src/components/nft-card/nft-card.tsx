// import { Card } from '@legendarylabs/uikit'
import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  & {
    width: 600px;
    text-align: center;
    padding-top: 25px;
    img {
      padding: 25px;
      border-radius: 2em;
    }
    background-color: whiteSmoke;
    border-radius: 10px;
    h3 {
      color: #000;
    }
    color: #000;
  }
`

// eslint-disable-next-line import/prefer-default-export
export const NftCard: React.FC = ({ children }) => {
  return <StyledCard>{children}</StyledCard>
}
