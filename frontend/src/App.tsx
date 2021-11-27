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

const App = () => {
  const [navSize, changeNavSize] = useState("large");

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Router>
        <Sidebar changeNavSize={changeNavSize} navSize={navSize} />
        <Flex
          // pos="sticky"
          left="5"
          mr="4%"
          h="95vh"
          marginTop="2.5vh"
          boxShadow="0 4px 12px rgba(0,0,0,1)"
          borderRadius={"30px"}
          w={navSize === "small" ? "87vw" : "80vw"}
          flexDir="row"
          justifyContent="space-between"
          background="blue.500"
          // alignItems="center"
        >
          <Routes>
            <Route path="/" element={<Home navSize={navSize} />} />
            <Route
              path="/contract-testing"
              element={<ContractTesting navSize={navSize} />}
            />
            <Route path="/settings" element={<Settings navSize={navSize} />} />
          </Routes>
        </Flex>
      </Router>
    </Flex>
  );
};

export default App;
