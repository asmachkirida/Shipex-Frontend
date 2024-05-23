import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock, MdMap,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import livreur from "views/admin/livreur";
import DataTables from "views/admin/dataTables";
import Clients from "views/admin/Clients";

// Auth Imports
import SignInCentered from "views/auth/signIn";


const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "MAP",
    layout: "/admin",
    path: "/map",
    icon: (
      <Icon
        as={MdMap}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Packages",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Drivers",
    layout: "/admin",
    path: "/livreur",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: livreur,
  },
  {
    name: "Clients",
    layout: "/admin",
    path: "/client-default",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Clients,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  }


];

export default routes;
