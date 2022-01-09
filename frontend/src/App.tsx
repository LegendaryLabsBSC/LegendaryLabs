import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
// import { ResetCSS } from '@legendarylabs/uikit'
import BigNumber from 'bignumber.js'
// import AllLegends from 'components/all-legends/all-legends'
// import Menu from './components/Menu'
// import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'
import Team from 'components/team/team'
import Home from 'components/home/home'
import ComingSoon from './components/coming-soon/coming-soon'
// import Menu from './components/Menu'
// import FarmsApp from './views/Farms'

const App: React.FC = () => {

  useEffect(() => {
    const path = document.location.pathname
    const tab = document.getElementById(path === '/' ? '/home' : path)
    if (tab) tab.classList.add('active')
  }, [])

  return (
    <Router>
      <Switch>
        <Route path={['/', '/home']} exact>
          <Home />
        </Route>
        <Route path={['/legends', '/marketplace', '/arena']} exact>
          <ComingSoon />
        </Route>
        {/* <Route path={['/legends']} exact>
          <AllLegends />
        </Route> */}
        <Route path={['/team']} exact>
          <Team />
        </Route>
        {/* Use FarmsApp for contract testing. import on line 9 */}
        {/* for testing on dev */}
      </Switch>
      {/* </Menu> */}
    </Router>
  )
}

export default React.memo(App)
