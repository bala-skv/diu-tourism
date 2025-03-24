import { createBrowserRouter } from "react-router-dom";
import Nagoa from "./components/Places/Nagoa";
import Ghoghla from "./components/Places/Ghoghla";
import Home from "./components/Places/Home";
import Buses from "./components/Transport/Buses";
import Login from "./components/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/places",
    element: <Nagoa />, // Parent route
    children: [
      {
        path: "nagoa",
        element: <Nagoa />
      },
      {
        path: "ghoghla",
        element: <Ghoghla />
      },
    ]
  },
  {
    path: "/buses",
    element: <Buses />
  },
  {
    path: "/login",
    element: <Login />
  },
]);

export default router;
