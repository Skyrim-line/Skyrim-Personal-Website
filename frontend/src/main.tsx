import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StagewiseToolbar } from "@stagewise/toolbar-react";

const stagewiseConfig = {
  plugins: [],
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
    {import.meta.env.DEV && <StagewiseToolbar config={stagewiseConfig} />}
  </StrictMode>
);
