import { Card } from '@legendarylabs/uikit'
import React from 'react'

// eslint-disable-next-line import/prefer-default-export
export const NftCard: React.FC = ({ children }) => {

  return (
    <Card>
      {children}
    </Card>
  )
}