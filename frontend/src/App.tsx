import React, { useState, useEffect } from "react";
import "./App.css";
import { Heading } from "@chakra-ui/react";

import TestingPortal from "./components/TestingPortal/TestingPortal";

const App = () => {
  return (
    <div className="App">
      <Heading as="h1" size="2xl">
        Legendary Labs Testing Portal
      </Heading>
      <TestingPortal />
    </div>
  );
};

export default App;
