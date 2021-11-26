import React, { useState, useEffect, lazy } from "react";
import { Heading, Flex, Spacer, HStack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import TestingPortal from "./components/TestingPortal/TestingPortal";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink,
} from "react-router-dom";
import Home from "./Home";
import ContractSelection from "./pages/ContractSelection/ContractSelection";
import Settings from "./Settings";

const App = () => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Router>
        <Sidebar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<TestingPortal />} />
          <Route path="/contract-selection" element={<ContractSelection />} />
          <Route path="/testing-portal" element={<TestingPortal />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </Flex>
  );
};

export default App;
