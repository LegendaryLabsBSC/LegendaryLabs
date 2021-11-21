import React, { useState, useEffect } from "react";
import "./App.css";
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
  const [page, setPage] = useState("0");

  const handleOnClick = (config: any) => {
    setPage(config.page);
  };

  return (
    <div className="App">
      <div className="manage-app">
        <h1>Manage Application</h1>
        <button
          onClick={() =>
            handleOnClick({ page: 0, title: "Create Promo Event" })
          }
        >
          Create Promo Event
        </button>
        <button
          onClick={() => handleOnClick({ page: 1, title: "Close Promo Event" })}
        >
          Dispense Promo Ticket
        </button>
        <button
          onClick={() =>
            handleOnClick({ page: 2, title: "Dispense Promo Ticket" })
          }
        >
          Redeem Promo Ticket
        </button>
        <button
          onClick={() =>
            handleOnClick({ page: 2, title: "Redeem Promo Ticket" })
          }
        >
          Close Promo Event
        </button>
      </div>

      <InputForm page={page} />
    </div>
  );
};

export default App;
