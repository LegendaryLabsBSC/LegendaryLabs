import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { legendaryLabs } from "./contract_config/ethers_config";

const App: React.FC = () => {
  async function createPromoEvent() {
    if (typeof window.ethereum !== "undefined") {
      await legendaryLabs.lab.write.createPromoEvent(
        "1",
        86400,
        true,
        0,
        false
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="submit" onClick={createPromoEvent}>
          Create Promo Event
        </button>
      </header>
    </div>
  );
};

export default App;
