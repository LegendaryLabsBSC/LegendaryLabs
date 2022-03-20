import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Team from "./components/team/team";
import Home from "./components/home/home";
import { AllLegends } from "./components/all-legends/AllLegends";
import ComingSoon from "./components/coming-soon/coming-soon";
import { Marketplace } from "./components/marketplace/marketplace";
import TempAdmin from "./components/TempAdmin/TempAdmin";
import CreatePromoForm from "./components/TempAdmin/forms/CreatePromoForm";
import MetaMaskConnection from "./components/MetaMaskConnection/MetaMaskConnection";
import { Grid } from "@mui/material";
import MetaMaskProvider from "./context/metaMaskContext";
import { Forum } from "./components/forum/forum";

const App: React.FC = () => {
  const [home, setHome] = useState(false)
  useEffect(() => {
    const path = document.location.pathname;
    if (path === '/home') setHome(true)
    else if (path === '/') setHome(true)
    else setHome(false)
    const tab = document.getElementById(path === "/" ? "/home" : path);
    if (tab) tab.classList.add("active");
  }, []);
  
  return (
    <MetaMaskProvider>
      {home && <Grid display='flex' justifyContent="flex-end" p={5}>
        <MetaMaskConnection />
      </Grid>}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path='/legends' element={<ComingSoon />} /> */}
          <Route path="/legends" element={<AllLegends itemsPerPage={9} />} />
          <Route path="/marketplace" element={<Marketplace />} />
          {/* <Route path='/marketplace' element={<ComingSoon />} /> */}
          {/* <Route path='/arena' element={<ComingSoon />} /> */}
          <Route path="/arena" element={<TempAdmin />} />
          {/* <Route path='/arena' element={<CreatePromoForm />} /> */}
          <Route path="/team" element={<Team />} />
          <Route path='/forum' element={<Forum />} />
        </Routes>
      </Router>
    </MetaMaskProvider>
  );
};

export default React.memo(App);
