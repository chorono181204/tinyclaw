import React from "react";
import ReactDOM from "react-dom/client";
import logoUrl from "../../../assets/logo.png";

import { App } from "./App";
import { I18nProvider } from "./i18n/provider";
import "./styles/index.css";

document.title = "Ducky";

let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;

if (!favicon) {
  favicon = document.createElement("link");
  favicon.rel = "icon";
  document.head.appendChild(favicon);
}

favicon.href = logoUrl;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
);
