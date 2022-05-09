import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Team from "./components/team/team";
import Home from "./components/home/home";
import { AllLegends } from "./components/all-legends/AllLegends";
import ComingSoon from "./components/coming-soon/coming-soon";
import { Marketplace } from "./components/marketplace/marketplace";
import TempAdmin from "./components/TempAdmin/TempAdmin";
import CreatePromoForm from "./components/TempAdmin/forms/CreatePromoForm";
import MetaMaskConnection from "./components/metamask-connection/MetaMaskConnection";
import { Grid } from "@mui/material";
import MetaMaskProvider from "./context/metaMaskContext";
import { MyLegends } from "./components/my-legends/MyLegends";
import { SingleLegend } from "./components/single-legend/SingleLegend";

const App: React.FC = () => {
  const [home, setHome] = useState(false);
  useEffect(() => {
    const path = document.location.pathname;
    if (path === "/home") setHome(true);
    else if (path === "/") setHome(true);
    else setHome(false);
    const tab = document.getElementById(path === "/" ? "/home" : path);
    if (tab) tab.classList.add("active");
  }, []);

  return (
    <MetaMaskProvider>
      {home && (
        <Grid display="flex" justifyContent="flex-end" p={5}>
          <MetaMaskConnection />
        </Grid>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path='/legends' element={<ComingSoon />} /> */}
          <Route path="/legends" element={<AllLegends itemsPerPage={9} />} />
          <Route path="/legends/:id" element={<SingleLegend />} />
          <Route path="/marketplace" element={<Marketplace />} />
          {/* <Route path='/marketplace' element={<ComingSoon />} /> */}
          {/* <Route path='/arena' element={<ComingSoon />} /> */}
          <Route path="/arena" element={<TempAdmin />} />
          <Route path="/myLegends" element={<MyLegends itemsPerPage={9}/>} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </Router>
    </MetaMaskProvider>
  );
};

export default React.memo(App);
