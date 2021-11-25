import React, { useState, useEffect } from "react";
import "./App.css";
import { Heading, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";

import TestingPortal from "./components/TestingPortal/TestingPortal";

const App = () => {
  return (
    <Flex flexDirection="row">
      <Sidebar />
      <TestingPortal />
    </Flex>
  );
};

export default App;
