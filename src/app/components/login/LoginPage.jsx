import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import IconButton from "@mui/material/IconButton";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  matchPath,
  Outlet,
} from "react-router-dom";

import UfmsLogo from "../../../utils/ufms.png";
import FacomLogo from "../../../utils/facom.png";
import CapesLogo from "../../../utils/capes.png";
import CnpqLogo from "../../../utils/cnpq.jpg";
import FundectLogo from "../../../utils/fundect.png";
import LedesLogo from "../../../utils/ledes_logo.jpg";
import { padding } from "@mui/system";

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(["/signin", "/signup", "/about"]);
  const currentTab = routeMatch?.pattern?.path ?? "/signin";

  return (
    <>
      <Tabs
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          // position: 'fixed',
          // minWidth: '40ch',
          backgroundColor: "#fafafa",
          borderBottom: 1,
          borderColor: "divider",
        }}
        value={currentTab}
        centered
      >
        <Tab label="Sign in" value="/signin" to="/signin" component={Link} />
        <Tab label="Sign up" value="/signup" to="/signup" component={Link} />
        <Tab label="About" value="/about" to="/about" component={Link} />
      </Tabs>
    </>
  );
}
function LayoutsWithNavbar() {
  return (
    <>
      {/* Your navbar component */}

      <MyTabs />

      {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
      <Outlet />

      <footer>
        <Box
          sx={{
            width: "65vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 1,
            position: "absolute",
            bottom: 8,
            // left: 0,
          }}
        >
          <Link to="https://ufms.br">
            <img src={UfmsLogo} alt="UFMS logo" height="40" />
          </Link>
          <Link to="https://www.facom.ufms.br">
            <img src={FacomLogo} alt="Facom UFMS logo" height="40" />
          </Link>
          <Link to="http://portal.ledes.net/">
            <img src={LedesLogo} alt="Ledes logo" height="40" />
          </Link>
          <Link to="http://portal.cnpq.br">
            <img src={CnpqLogo} alt="CNPq logo" height="40" />
          </Link>
          <Link to="https://www.gov.br/capes/pt-br">
            <img src={CapesLogo} alt="Capes logo" height="40" />
          </Link>
          <Link to="https://www.fundect.ms.gov.br">
            <img src={FundectLogo} alt="Fundect logo" height="40" />
          </Link>
        </Box>
      </footer>

      {/* You can add a footer to get fancy in here :) */}
    </>
  );
}
export default function LoginPage() {
  return <LayoutsWithNavbar />;
}
