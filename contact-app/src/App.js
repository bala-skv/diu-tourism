import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes"; // Importing the router from routes.js

function App() {
  return <RouterProvider router={router} />;
}

export default App;
