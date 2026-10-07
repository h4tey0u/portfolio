import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./hub/hub.css"
import { App } from "./hub/App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
