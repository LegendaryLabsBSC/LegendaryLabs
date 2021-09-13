import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@legendarylabs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPriceList, useFetchPublicData } from 'state/hooks'
import useGetDocumentTitlePrice from './hooks/useGetDocumentTitlePrice'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import Pools from './views/Pools'
import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'
import XBLZD from './views/XBLZD'
import FarmsApp from './views/Farms'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Pools = lazy(() => import('./views/Pools'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Nft = lazy(() => import('./views/Nft'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('connectorId')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()
  useFetchPriceList()
  useGetDocumentTitlePrice()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              {/* <Home /> */}
              <FarmsApp />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/caves">{/* <Farms tokenMode /> */}</Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/xBLZD">
              <XBLZD />
            </Route>
            {/* <Route path="/lottery"> */}
            {/*  <Lottery /> */}
            {/* </Route> */}
            {/* <Route path="/ifo"> */}
            {/*  <Ifos /> */}
            {/* </Route> */}
            {/* <Route path="/nft"> */}
            {/*  <Nft /> */}
            {/* </Route> */}
            {/* Redirect */}
            {/* <Route path="/staking"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* <Route path="/syrup"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      <NftGlobalNotification />
    </Router>
  )
}

export default React.memo(App)
