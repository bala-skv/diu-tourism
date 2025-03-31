import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Places/Home";
import Nagoa from "./components/Places/Nagoa";
import Ghoghla from "./components/Places/Ghoghla";
import Buses from "./components/Transport/Buses";
import Login from "./components/Auth/Login";
import Sign_up from "./components/Auth/Sign_up";
import PlacesLayout from "./components/Places/PlacesLayout"; // New layout component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/places",
    element: <PlacesLayout />, // Parent layout for all places
    children: [
      { path: "nagoa", element: <Nagoa /> },
      { path: "ghoghla", element: <Ghoghla /> },
    ],
  },

  {
    path: "/buses",
    element: <Buses />,
  },

  {
    path: "/signup",
    element: <Sign_up />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
