import { createBrowserRouter } from "react-router-dom";
import Nagoa from "./components/Places/Nagoa";
import Ghoghla from "./components/Places/Ghoghla";
import Chakratirth from "./components/Places/Chakratirth";
import DiuFort from "./components/Places/DiuFort";
import PaniKotha from "./components/Places/PaniKotha";
import Jallandhar from "./components/Places/Jallandhar";
import Gomtimata from "./components/Places/Gomtimata";
import Home from "./components/Places/Home";
import LocalBuses from "./components/Transport/LocalBuses";
import Flights from "./components/Transport/Flights";
import Login from "./components/Auth/Login";
import Sign_up from "./components/Auth/Sign_up";
import SideBar from "./components/Slidebar/Slidebar";
import EventPlanner from "./components/event planner/EventPlanner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/places/nagoa",
    element: <Nagoa />
  },
  {
    path: "/places/ghoghla",
    element: <Ghoghla />
  },
  {
    path: "/places/chakratirth",
    element: <Chakratirth />
  },
  {
    path: "/places/jallandhar",
    element: <Jallandhar />
  },
  {
    path: "/places/gomtimata",
    element: <Gomtimata />
  },
  {
    path: "/places/DiuFort",
    element: <DiuFort />
  },
  {
    path: "/places/PaniKotha",
    element: <PaniKotha />
  },

  {
    path: "/signup",
    element: <Sign_up />
  },
  {
    path: "/sidebar",
    element: <SideBar />
  },

  {
    path: "/login",
    element: <Login />
  },

  // {
  //   path: "/feedback",
  //   element: <Feedb />
  // },

  {
    path: "/transport/buses",
    element: <LocalBuses />
  },
  {
    path: "/transport/flights",
    element: <Flights />
  },
  {
    path: "/eventplanner",
    element: <EventPlanner />
  },

]);

export default router;
