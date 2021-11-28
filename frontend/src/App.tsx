import React from 'react'
import AllLegends from 'components/all-legends/all-legends'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ComingSoon from './components/coming-soon/coming-soon'
// import Menu from './components/Menu'
import FarmsApp from './views/Farms'

const App: React.FC = () => {
  return (
    <Router>
      {/* Use Menu component to connect wallet when testing. import on line 8 */}
      {/* <Menu > */}
      <Switch>
        <Route path={['/marketplace.html', '/arena.html']} exact>
          <ComingSoon />
        </Route>
        <Route path={["/legends.html"]} exact>
              <AllLegends />
            </Route>
        {/* Use FarmsApp for contract testing. import on line 9 */}
        <Route path="/" exact>
              <FarmsApp />
            </Route>
      </Switch>
      {/* </Menu> */}
    </Router>
  )
}

export default React.memo(App)
