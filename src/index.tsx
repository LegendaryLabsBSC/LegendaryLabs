import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./components/apollo-client/apollo-client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <ChakraProvider> */}
        <App />
      {/* </ChakraProvider> */}
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root-react-app")
);
