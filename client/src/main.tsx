import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ServicesContextProvider } from '@contexts';
import "./main.css";

const root = document.getElementById("root");
if (root) ReactDOM.createRoot(root).render(<ServicesContextProvider><App /></ServicesContextProvider>);
