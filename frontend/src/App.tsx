import React, { useState} from "react";
import { Flex} from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import ContractTesting from "./pages/ContractTesting/ContractTesting";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import BackDrop from "./components/BackDrop/BackDrop";

const App = () => {
  const [navSize, changeNavSize] = useState("large");

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Router>
        <Sidebar changeNavSize={changeNavSize} navSize={navSize} />
        <BackDrop navsize={navSize}>
          <Routes>
            <Route path="/" element={<Home navSize={navSize} />} />
            <Route
              path="/contract-testing"
              element={<ContractTesting navSize={navSize} />}
            />
            <Route path="/settings" element={<Settings navSize={navSize} />} />
          </Routes>
        </BackDrop>
      </Router>
    </Flex>
  );
};

export default App;
