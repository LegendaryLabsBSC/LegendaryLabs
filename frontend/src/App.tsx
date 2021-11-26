import React, { useState, useEffect, lazy } from "react";
import { Heading, Flex, Spacer, HStack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import TestingPortal from "./pages/TestingPortal/TestingPortal";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import ContractSelection from "./pages/ContractSelection/ContractSelection";
import Settings from "./pages/Settings/Settings";

const App = () => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testing-portal" element={<TestingPortal />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </Flex>
  );
};

export default App;
