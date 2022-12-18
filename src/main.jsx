import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Global.scss";
import axios from "axios";
import { AuthContextProvider } from "./contexts/AuthContext";
import { FollowContextProvider } from "./contexts/FollowContext";

axios.defaults.baseURL = "http://localhost:8800/api/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FollowContextProvider>
        <App />
      </FollowContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
