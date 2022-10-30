import React from "react"
import ReactDOM from "react-dom/client"
import { AppWithRoutes } from "./App"
import "@/setup/easterEgg"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppWithRoutes />
  </React.StrictMode>
)
