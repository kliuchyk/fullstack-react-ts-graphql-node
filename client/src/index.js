import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Listings } from "./sections";
import "./index.css";

const client = new ApolloClient({
  uri: "/api",
});

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Listings />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
