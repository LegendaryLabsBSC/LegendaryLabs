import React, { useState, useEffect, lazy } from "react";
import { Heading, Flex, Spacer, HStack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import ContractTesting from "./pages/ContractTesting/ContractTesting";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import ContentContainer from "./components/Sidebar/ContentContainer";

const App = () => {
  const [navSize, changeNavSize] = useState("large");

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Router>
        <Sidebar changeNavSize={changeNavSize} navSize={navSize} />
        <Routes>
          <Route path="/" element={<Home navSize={navSize} />} />
          <Route
            path="/contract-testing"
            element={<ContractTesting navSize={navSize} />}
          />
          <Route path="/settings" element={<Settings navSize={navSize} />} />
        </Routes>
      </Router>
    </Flex>
  );
};

export default App;
