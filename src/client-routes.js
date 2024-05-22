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
import MainDashboard from "views/client/default";
import NFTMarketplace from "views/client/marketplace";
import livreur from "views/client/livreur";
import DataTables from "views/client/dataTables";
import Clients from "views/client/Clients";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Home",
    layout: "/client",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: " New Package",
    layout: "/client",
    path: "/new-package",
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
    name: "My packages",
    layout: "/client",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  }


];

export default routes;
