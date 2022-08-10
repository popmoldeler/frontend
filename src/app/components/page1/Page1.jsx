import * as React from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box } from "@mui/material";
// import ShowAllianceMember from "./ShowAllianceMember";
// import ShowBusinessAlliance from "./showBusinessAlliance";

import { useLocation, Outlet, Link, matchPath } from "react-router-dom";

function useRouteMatch(patterns) {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  if (path[2] === "") {
    path[2] = "page1";
  }
  const path1 = "/" + path[2];

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];

    const possibleMatch = matchPath(pattern, path1);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default function Page1() {
  
  const routeMatch = useRouteMatch([
    "/showalliancemember",
    "/showbusinessalliance",
  ]);
  const currentTab = routeMatch?.pattern?.path;
  

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          marginTop: "49px",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#fafafa",
        }}
      >
        <Box
          component={"nav"}
          sx={{
            borderRight: 1,
            borderColor: "divider",
            width: "max-content",
            position: "sticky",
            height: " -webkit-fill-available",
            backgroundColor: "#fafafa",
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="text"
            size="large"
            sx={{ width: "max-content" }}
          >
            <Button
              key="one"
              value="/page1"
              to="/page1/showalliancemember"
              component={Link}
              variant={
                currentTab == "/showalliancemember" ? "contained" : "text"
              }
            >
              Show Alliance Member
            </Button>
            <Button
              key="two"
              value="/page1"
              to="/page1/showbusinessalliance"
              component={Link}
              variant={
                currentTab == "/showbusinessalliance" ? "contained" : "text"
              }
            >
              Show Business Alliance
            </Button>
          </ButtonGroup>
        </Box>

        <Outlet />
      </Box>
    </>
  );
}
