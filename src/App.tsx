import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Team from "./components/team/team";
import Home from "./components/home/home";
import { AllLegends } from "./components/AllLegends";
import ComingSoon from "./components/coming-soon/coming-soon";
import { Marketplace } from "./components/marketplace/marketplace";
import TempAdmin from "./components/TempAdmin/TempAdmin";
import CreatePromoForm from "./components/TempAdmin/forms/CreatePromoForm";
import MetaMaskConnection from "./components/MetaMaskConnection/MetaMaskConnection";
import { Box } from "@mui/material";
import MetaMaskProvider from "./context/metaMaskContext";

const App: React.FC = () => {
  useEffect(() => {
    const path = document.location.pathname;
    const tab = document.getElementById(path === "/" ? "/home" : path);
    if (tab) tab.classList.add("active");
  }, []);

  return (
    <MetaMaskProvider>
      <Box position="absolute" right={50}>
        <MetaMaskConnection />
      </Box>
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
        </Routes>
      </Router>
    </MetaMaskProvider>
  );
};

export default React.memo(App);
