import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {
  BrowserRouter as Router,
  Link,
  useLocation,
  matchPath,
  Outlet,
} from "react-router-dom";

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
  const routeMatch = useRouteMatch(["/signin", "/signup"]);
  const currentTab = routeMatch?.pattern?.path ?? "/signin";

  return (
    <>
      <Tabs
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#fafafa",
          position: "fixed",
          width: "100%",
        }}
        value={currentTab}
        centered
      >
        <Tab label="Sign in" value="/signin" to="/signin" component={Link} />
        <Tab label="Sign up" value="/signup" to="/signup" component={Link} />
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

      {/* You can add a footer to get fancy in here :) */}
    </>
  );
}
export default function LoginPage() {
  return <LayoutsWithNavbar />;
}
