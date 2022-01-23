import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import App from './views/Farms'

// const Farms = lazy(() => import('./views/Farms'))

ReactDOM.render(
  <React.StrictMode>
    {/* <h1>Placeholder for Farms Component</h1> */}
    <App />
    {/* <Farms /> */}
  </React.StrictMode>,
  document.getElementById('root-react-app'),
)
