import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Team from './components/team/team'
import Home from './components/home/home'
import AllLegends from './components/all-legends/all-legends'
import ComingSoon from './components/coming-soon/coming-soon'

const App: React.FC = () => {
  useEffect(() => {
    const path = document.location.pathname
    const tab = document.getElementById(path === '/' ? '/home' : path)
    if (tab) tab.classList.add('active')
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/legends' element={<ComingSoon />} />
        <Route path='/marketplace' element={<ComingSoon />} />
        <Route path='/arena' element={<ComingSoon />} />
        <Route path='/team' element={<Team />} />
        {/* <Route path={['/legends']} exact>
          <AllLegends />
        </Route> */}
      </Routes>
    </Router>
  )
}

export default React.memo(App)
