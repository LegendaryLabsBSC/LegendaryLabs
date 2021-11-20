import React, { useState, useEffect } from "react";
import "./App.css";
import { legendaryLabs } from "./config/labInterface";
import ManageApp from "./_tests/ManageApp";
import Element from "./components/InputForm/InputElement";
import formJSON from "./_tests/formElement.json";
import { Grid, Box } from "@chakra-ui/react";
import InputForm from "./components/InputForm/InputForm";

// async function requestAccount() {
//   try {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//   } catch (error) {
//     console.log("error");
//     console.error(error);

//     alert("Login to Metamask first");
//   }
// }

const App = () => {
  return (
    <div className="App">
      <InputForm />
    </div>
  );
};

export default App;
