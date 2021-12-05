import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@legendarylabs/uikit'
import BigNumber from 'bignumber.js'
import AllLegends from 'components/all-legends/all-legends'
// import Menu from './components/Menu'
// import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'
import ComingSoon from './components/coming-soon/coming-soon'
// import Menu from './components/Menu'
import FarmsApp from './views/Farms'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={['/marketplace.html', '/arena.html']} exact>
          <ComingSoon />
        </Route>
        <Route path={['/legends.html']} exact>
          <AllLegends />
        </Route>
        {/* Use FarmsApp for contract testing. import on line 9 */}
        {/* for testing on dev */}
        <Route path="/contracts" exact>
          {/* <Home /> */}
          <FarmsApp />
        </Route>
      </Switch>
      {/* </Menu> */}
    </Router>
  )
}

export default React.memo(App)
