import * as React from "react";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

import LoginPage from "./components/login/LoginPage";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import ResetPassword from "./components/login/ResetPassword";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import Page1 from "./components/page1/Page1";
import ShowAllianceMember from "./components/page1/alliance_member/ShowAllianceMember";
import ShowBusinessAlliance from "./components/page1/business_alliance/ShowBusinessAlliance";
import Page2 from "./components/page2/page2";
import ShowBusinessProcessModel from "./components/page2/show_busines_process_model/ShowBusinessProcessModel";
import ShowConstituentProcess from "./components/page2/show_constituent_process/ShowConstituentProcess";
import ShowPopMission from "./components/page2/show_pop_mission/ShowPopMission";
import { useSelector } from "react-redux";
import { selectCurrentUser, logOut } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  matchPath,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  if (path[1] === "") {
    path[1] = "page1";
  }
  const path1 = "/" + path[1];

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];

    const possibleMatch = matchPath(pattern, path1);
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
  const routeMatch = useRouteMatch(["/page2", "/page3", "/page1"]);
  const currentTab = routeMatch?.pattern?.path;
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = async () => {
    dispatch(logOut());

    navigate("/login");
  };

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
        <Tab
          label="Business Alliance Management"
          value="/page1"
          component={Link}
          to="/page1"
        />
        <Tab
          label="PoP Management"
          value="/page2"
          to="/page2"
          component={Link}
        />
        <Tab label="PoP Modeling" value="/page3" to="/page3" component={Link} />
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ marginTop: 1, paddingLeft: 25 }}
          >
            Welcome {user}
          </Typography>

          <IconButton
            aria-label="Log Out"
            style={{ left: 25 }}
            component={Button}
            onClick={logout}
          >
            <LogoutIcon titleAccess={"Log Out"} color={"primary"} />
          </IconButton>
        </Box>
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
      <Outlet>
        <Outlet></Outlet>
      </Outlet>

      {/* You can add a footer to get fancy in here :) */}
    </>
  );
}
export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Routes>
        <Route element={<LoginPage />}>
          <Route path="/signin" element={<SignIn></SignIn>} />

          <Route path="/signup" element={<SignUp></SignUp>} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<LayoutsWithNavbar />}>
            <Route index element={<Page1></Page1>} />

            <Route path="page1" element={<Page1></Page1>}>
              <Route
                path="showalliancemember"
                element={<ShowAllianceMember></ShowAllianceMember>}
              />
              <Route
                path="showbusinessalliance"
                element={<ShowBusinessAlliance></ShowBusinessAlliance>}
              />
            </Route>
            <Route path="/page2" element={<Page2></Page2>}>
              <Route
                path="show-business-process-model"
                element={<ShowBusinessProcessModel></ShowBusinessProcessModel>}
              />
              <Route
                path="show-pop-mission"
                element={<ShowPopMission></ShowPopMission>}
              />
              <Route
                path="show-constituent-process"
                element={<ShowConstituentProcess></ShowConstituentProcess>}
              />
            </Route>

            {/* <Route path="/page3" element={<Page3></Page3>} /> */}
          </Route>
        </Route>
        <Route path="/reset/:token" element={<ResetPassword></ResetPassword>} />

        <Route path="*" element={<Navigate to="/signin" replace></Navigate>} />
      </Routes>
    </Router>
  );
}
