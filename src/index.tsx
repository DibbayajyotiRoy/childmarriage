import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // This imports your main App component
import "./index.css"; // This imports your global styles

// Find the 'root' div in your index.html
const container = document.getElementById("root");

// This is a safety check
if (!container) {
  throw new Error("Could not find root element to mount to");
}

// Create a React root and render your App component into it
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
