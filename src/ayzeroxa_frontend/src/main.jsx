import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./components/App";
import { UserProvider } from "./components/context/UserContext";
import RouteTracker from "./components/utils/RouteTracker";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure you have <div id='root'></div> in index.html.");
}



const root = ReactDOM.createRoot(rootElement);
root.render(
    
  <React.StrictMode>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    
      <UserProvider>
        <RouteTracker />
        <App />
      </UserProvider>
    </HashRouter>
  </React.StrictMode>
);
