import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'
// import App from './views/Farms'

const Farms = lazy(() => import('./views/Farms'))

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      {/* <h1>Placeholder for Farms Component</h1> */}
      <App />
      {/* <Farms /> */}
    </Providers>
  </React.StrictMode>,
  document.getElementById('root-react-app'),
)
