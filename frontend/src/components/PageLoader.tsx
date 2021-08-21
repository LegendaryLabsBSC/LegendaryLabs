import React from 'react'
import styled from 'styled-components'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoIcon = styled.div`
  transition: transform 0.3s ease;
  margin-bottom: 24px;
  animation: pulse 1.25s ease-in-out infinite;
  @keyframes pulse {
    0% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
    50% {
      -webkit-transform: scale3d(1.05, 1.05, 1.05);
      transform: scale3d(1.05, 1.05, 1.05);
    }
    to {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <LogoIcon>
        <img
          style={{ height: 86 }}
          src="https://raw.githubusercontent.com/blzd-dev/blzd-frontend/master/public/images/blzd/logo.png"
          alt="logo"
        />
      </LogoIcon>
    </Wrapper>
  )
}

export default PageLoader
