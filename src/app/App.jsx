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
import Page3 from "./components/page3/page3";
import ReactBpmn from "./components/page3/ShowBpmn";
import Testebpmn from "./components/page3/Testebpmn";
import About from "./components/page4/About";
import PopMissionViewBpmn from "./components/page3/popMissionView/PopMissionViewBpmn";
import PopDetailedViewBpmn from "./components/page3/popDetailedView/PopDetailedViewBpmn";
import SelectPop from "./components/page3/select_pop/SelectPop";

import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUserId,
} from "./features/auth/authSlice";
import { selectCurrentUser, logOut } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  useAddOverallViewMutation,
  useGetOverallViewQuery,
  useUpdateOverallViewMutation,
} from "./features/overall_view/overallViewApiSlice";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Form,
  json,
  Link,
  Outlet,
  Route,
  RouterProvider,
  unstable_useBlocker as useBlocker,
  useLocation,
  Navigate,
  matchPath,
  useNavigate,
} from "react-router-dom";
import {
  useAddPopMissionModelMutation,
  useUpdatePopMissionModelMutation,
} from "./features/pop_mission_model/popMissionModel";
import { useGetPoPConstituentProcessQuery } from "./features/constituent_process/constituenProcessApiSlice";
import { useAddPopMissionDetailedModelMutation, useUpdatePopMissionDetailedModelMutation } from "./features/pop_mission_detailed_model/popMissionDetailedModel";

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<LoginPage />}>
        <Route path="/signin" element={<SignIn></SignIn>} />

        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/about" element={<About></About>} />
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

          <Route path="/page3" element={<Page3></Page3>}>
            <Route path="showbpmn" element={<ShowOverallView />} />
            <Route path="popmissionview" element={<PopMissionView />} />
            <Route path="popdetailedview" element={<PopDetailedView />} />
          </Route>
          <Route path="/page4" element={<About></About>} />
        </Route>
      </Route>
      <Route path="/reset/:token" element={<ResetPassword></ResetPassword>} />

      <Route path="*" element={<Navigate to="/signin" replace></Navigate>} />
    </Route>
  )
);

function ShowOverallView() {
  const [saveOrUpdataOverallView, setSaveOrUpdataOverallView] =
    React.useState("save");
  const [nameConstraintsButton, setNameConstraintsButton] =
    React.useState("add");

  const [popMissionId, setPopMissionId] = React.useState("");
  const [popId, setPopId] = React.useState("");
  const [overallViewId, setOverallViewId] = React.useState("");

  const handleSetPopMissionId = (id) => setPopMissionId(id);

  const [xmlString, setXmlString] = React.useState("");
  function handleSetXmlString(xml) {
    setXmlString(xml);
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function onShown() {
    console.log("diagram shown");
  }

  function onLoading() {
    console.log("diagram loading");
  }

  function onError(err) {
    console.log("failed to show diagram");
  }
  const token = useSelector(selectCurrentToken);
  const user_id = useSelector(selectCurrentUserId);
  const [addOverallView] = useAddOverallViewMutation();
  const [updateOverallView] = useUpdateOverallViewMutation();
  // const { isLoading, data: overallview } = useGetOverallViewQuery(popId);

  // React.useEffect(() => {
  //   isLoading
  //     ? setOverallViewXmlString([])
  //     : setOverallViewXmlString(overallview);
  // }, [isLoading]);
  const [openDialogOutOfDate, setOpenDialogOutOfDate] = React.useState(false);

  return (
    <ReactBpmn
      url={xmlString}
      token={token}
      onShown={onShown}
      onLoading={onLoading}
      onError={onError}
      handleSetXmlString={handleSetXmlString}
      user_id={user_id}
      addOverallView={addOverallView}
      setPopMissionId={handleSetPopMissionId}
      popMissionId={popMissionId}
      setPopId={setPopId}
      popId={popId}
      setSaveOrUpdataOverallView={setSaveOrUpdataOverallView}
      saveOrUpdataOverallView={saveOrUpdataOverallView}
      updateOverallView={updateOverallView}
      setOverallViewId={setOverallViewId}
      overallViewId={overallViewId}
      openDialogOutOfDate={openDialogOutOfDate}
      setOpenDialogOutOfDate={setOpenDialogOutOfDate}
      setNameConstraintsButton={setNameConstraintsButton}
      nameConstraintsButton={nameConstraintsButton}
      // overallViewXmlString={overallViewXmlString}
    />
  );
}

function PopMissionView() {
  const token = useSelector(selectCurrentToken);
  const user_id = useSelector(selectCurrentUserId);
  const [popId, setPopId] = React.useState("");
  const [popMissionNumber, setPopMissionNumber] = React.useState("");

  const [nameConstraintsButton, setNameConstraintsButton] =
    React.useState("add");

  const [popMissionModelId, setPopMissionModelId] = React.useState("");
  const [
    openDialogPopMissionModelOutOfDate,
    setOpenDialogPopMissionModelOutOfDate,
  ] = React.useState(false);

  const [saveOrUpdataPopMissionModel, setSaveOrUpdataPopMissionModel] =
    React.useState("save");
  const [xmlString, setXmlString] = React.useState("");
  function handleSetXmlString(xml) {
    setXmlString(xml);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function onShown() {
    console.log("diagram shown");
  }

  function onLoading() {
    console.log("diagram loading");
  }

  function onError(err) {
    console.log("failed to show diagram");
  }
  const [addPopMissionModel] = useAddPopMissionModelMutation();
  const [updatePopMissionModel] = useUpdatePopMissionModelMutation();

  return (
    <PopMissionViewBpmn
      url={xmlString}
      onShown={onShown}
      onLoading={onLoading}
      onError={onError}
      handleChange={handleChange}
      handleSetXmlString={handleSetXmlString}
      token={token}
      user_id={user_id}
      addPopMissionModel={addPopMissionModel}
      updatePopMissionModel={updatePopMissionModel}
      setSaveOrUpdataPopMissionModel={setSaveOrUpdataPopMissionModel}
      saveOrUpdataPopMissionModel={saveOrUpdataPopMissionModel}
      popMissionModelId={popMissionModelId}
      setPopMissionModelId={setPopMissionModelId}
      openDialogPopMissionModelOutOfDate={openDialogPopMissionModelOutOfDate}
      setOpenDialogPopMissionModelOutOfDate={
        setOpenDialogPopMissionModelOutOfDate
      }
      setPopId={setPopId}
      popId={popId}
      nameConstraintsButton={nameConstraintsButton}
      setNameConstraintsButton={setNameConstraintsButton}
      popMissionNumber={popMissionNumber}
      setPopMissionNumber={setPopMissionNumber}
    />
  );
}

function PopDetailedView() {
  const token = useSelector(selectCurrentToken);
  const user_id = useSelector(selectCurrentUserId);
  const [popMissionId, setPopMissionId] = React.useState("");
  const [nameVariabilityButton, setNameVariabilityButton] =
    React.useState("add");

    
  const [popDetailedModelId, setpopDetailedModelId] = React.useState("");
  const [
    openDialogPopMissionModelOutOfDate,
    setOpenDialogPopMissionModelOutOfDate,
  ] = React.useState(false);

  const [saveOrUpdataPopMissionModel, setSaveOrUpdataPopMissionModel] =
    React.useState("save");
  const [xmlString, setXmlString] = React.useState("");
  function handleSetXmlString(xml) {
    setXmlString(xml);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function onShown() {
    console.log("diagram shown");
  }

  function onLoading() {
    console.log("diagram loading");
  }

  function onError(err) {
    console.log("failed to show diagram");
  }
  const [addPopMissionDetailedModel] = useAddPopMissionDetailedModelMutation();
  const [updatePopMissionDetailedModel] = useUpdatePopMissionDetailedModelMutation();



  return (
    <PopDetailedViewBpmn
      url={xmlString}
      onShown={onShown}
      onLoading={onLoading}
      onError={onError}
      token={token}
      user_id={user_id}
      handleSetXmlString={handleSetXmlString}
      popMissionId={popMissionId}
      setPopMissionId={setPopMissionId}
      popDetailedModelId={popDetailedModelId}
      setpopDetailedModelId={setpopDetailedModelId}
      addPopMissionDetailedModel={addPopMissionDetailedModel}
      updatePopMissionDetailedModel={updatePopMissionDetailedModel}
      nameVariabilityButton={nameVariabilityButton}
      setNameVariabilityButton={setNameVariabilityButton}
    />
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}

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
  const routeMatch = useRouteMatch(["/page2", "/page3", "/page4", "/page1"]);
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
    <Box
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
    >
      <Tabs value={currentTab} centered>
        <Tab
          label="Business Alliance Management"
          value="/page1"
          component={Link}
          to="/page1"
        />
        <Tab
          label="PoP Management"
          value="/page2"
          component={Link}
          to="/page2"
        />
        <Tab label="PoP Modeling" value="/page3" to="/page3" component={Link} />
        <Tab label="About" value="/page4" to="/page4" component={Link} />
      </Tabs>

      <Typography variant="subtitle1" sx={{ paddingLeft: 25 }}>
        Welcome {user}
      </Typography>

      <Tab
        aria-label="Log Out"
        value="/page1"
        component={Button}
        onClick={logout}
        icon={<LogoutIcon color="primary" />}
      />
    </Box>
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
