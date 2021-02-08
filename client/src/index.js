import React from "react";
import { render } from "react-dom";
import "./index.css";

import { Listings } from "./sections";

render(
  <React.StrictMode>
    <Listings />
  </React.StrictMode>,
  document.getElementById("root")
);
