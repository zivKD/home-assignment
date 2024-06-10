import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ServiceContextProvider } from './contexts/service.context.tsx';
import "./main.css";

const root = document.getElementById("root");
if (root) ReactDOM.createRoot(root).render(<ServiceContextProvider><App /></ServiceContextProvider>);
