import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./app";
import "./assets/css/custom.module.css";
// import { SocialIcon } from 'react-social-icons';

ReactDOM.render(
  <React.StrictMode>
    {/* <SocialIcon url="https://instagram.com/jaketrent" /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
