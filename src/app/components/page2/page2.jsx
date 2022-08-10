import * as React from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box } from "@mui/material";

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

export default function Page2() {
  const routeMatch = useRouteMatch([
    "/show-business-process-model",

    "/show-pop-mission",
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
              key="three"
              value="/page2"
              to="/page2/show-business-process-model"
              component={Link}
              variant={
                currentTab == "/show-business-process-model" ? "contained" : "text"
              }
            >
              Show Business Process Model
            </Button>
            <Button
              key="four"
              value="/page2"
              to="/page2/show-pop-mission"
              component={Link}
              variant={
                currentTab == "/show-pop-mission" ? "contained" : "text"
              }
            >
              Show PoP Mission
            </Button>
            {/* <Button
              key="five"
              value="/page2"
              to="/page2/show-constituent-process"
              component={Link}
            >
              Show Constituent Process
            </Button> */}
          </ButtonGroup>
        </Box>

        <Outlet />
      </Box>
    </>
  );
}
