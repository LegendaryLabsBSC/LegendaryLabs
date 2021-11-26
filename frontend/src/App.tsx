import React, { useState, useEffect, lazy } from "react";
import { Heading, Flex, Spacer, HStack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import TestingPortal from "./components/TestingPortal/TestingPortal";

const App = () => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Sidebar />
      <TestingPortal />
    </Flex>
  );
};

export default App;
