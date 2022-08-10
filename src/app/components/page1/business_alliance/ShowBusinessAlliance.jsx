import * as React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import MenuBusinessAlliance from "./MenuBusinessAlliance";
import DialogAddBusinessAlliance from "./DialogAddBusinessAlliance";
import DialogAddInternalCollaboration from "./internal_collaboration/DialogAddInternalCollaboration";
import DialogAddExternalCollaboration from "./external_collaboration/DialogAddExternalCollaboration";
import DialogManagePermission from "./manage_permission/DialogManagePermission";
import ShowInternalCollaboration from './ShowInternalCollaboration'
import ShowExternalCollaboration from "./ShowExternalCollaboration";

import { format } from "date-fns";
import { useFormik } from "formik";
import { selectCurrentUserId } from "../../../features/auth/authSlice";
import {
  useGetBusinessAlliancesQuery,
  useGetBusinessAlliancesPublicQuery,
  useUpdateBusinessAllianceMutation,
  useGetOwnBusinessAllianceQuery,
  useGetBusinessAlliancesPermissionsQuery,
} from "../../../features/business_alliance/bussinesAllianceApiSlice";

import { useSelector } from "react-redux";

function ResponsiveDateTimePickers({ setFormik, value1 }) {
  if (value1 === undefined) {
    value1 = new Date();
    //  setFormik(value1);
  }
  const [value, setValue] = React.useState(value1);
  setFormik(value);
  const handleChange = (newValue) => {
    setValue(newValue);
    setFormik(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Entry Date"
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField variant="standard" sx={{ width: "18ch" }} {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

function formatDate(data) {
  if (data === null) {
    return;
  }
  var date = new Date(data.replace(/-/g, "/"));
  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear()
  );
  // console.log(date);
}

export default function ShowBusinessAlliance({
  openShowAlliance,
  handleOpenShowAlliance,
}) {
  const [openRegNewMember, setOpenRegNewMember] = React.useState(false);
  const [alliance, setAlliance] = React.useState();
  const [filter, setFilter] = React.useState("All");

  const options = [
    { id: 1, name: "All" },
    { id: 2, name: "Invites" },
    { id: 3, name: "Public" },
    { id: 4, name: "Owner" },
  ];
  function handleCloseClickNewMember(e) {
    setOpenRegNewMember(!openRegNewMember);
    setAlliance(e);
  }
  function handleCloseClick() {
    handleOpenShowAlliance();
  }

  let content = [
    {
      business_goal: "Loading",
      id: 0,
      name: "Loading",
      responsable_member_id: 0,
      creation_date: "2022-03-16",
      permission: [
        {
         
          type: "View",
         
        },
      ],
      responsable_member: {
        category_id: 0,
        category: { id: 0 },
        city: "Loading",
        cnpj: "Loading",
        country: "Loading",
        id: 0,
        name: "Loading",
        neighborhood: "Loading",
        number: "Loading",
        site: "Loading",
        state: "Loading",
        street: "Loading",
        zip_code: "Loading",
      },
      internal_collaborations: [
        {
          alliance_member_id: 1,
          business_alliance_id: 1,
          exit_date: null,
          id: 1,
          relationship: "Loading",
          alliance_member: {
            category_id: 0,
            category: { id: 0 },
            city: "Loading",
            cnpj: "Loading",
            country: "Loading",
            id: 0,
            name: "Loading",
            neighborhood: "Loading",
            number: "Loading",
            site: "Loading",
            state: "Loading",
            street: "Loading",
            zip_code: "Loading",
          },
        },
      ],
      external_collaborations: [],
    },
  ];
  const user_id = useSelector(selectCurrentUserId);


  if (filter == "Owner") {
    const { isLoading, isSuccess, isError, error, data } =
      useGetOwnBusinessAllianceQuery(user_id);

    if (isLoading) {
      content = [];
    } else if (isSuccess) {
      content = data;
    } else if (isError) {
      content = <p>{error}</p>;
    }
  }
  if (filter == "Public") {
    const { isLoading, isSuccess, isError, error, data } =
      useGetBusinessAlliancesPublicQuery();

    if (isLoading) {
    } else if (isSuccess) {
      content = data;
    } else if (isError) {
      content = <p>{error}</p>;
    }
  }
  if (filter == "All") {
    const { isLoading, isSuccess, isError, error, data } =
      useGetBusinessAlliancesQuery(user_id);

    if (isLoading) {
    } else if (isSuccess) {
      content = data;
    } else if (isError) {
      content = <p>{error}</p>;
    }
  }
  // const {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  //   data: invites,
  // } = usegetBusinessAlliancesPermissionsQuery(user_id);
  if (filter == "Invites") {
    const { isLoading, isSuccess, isError, error, data } =
      useGetBusinessAlliancesQuery(user_id);

    if (isLoading) {
    } else if (isSuccess) {
      content = [];
      data.map((permission) => {
        if (permission.permission.length > 0) {
          content.push(permission);
        }
      });
    } else if (isError) {
      content = <p>{error}</p>;
    }
  }

  return (
    <>
      <TableContainer
        sx={{ margin: 1, width: "100%", height: "91%" }}
        component={Paper}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "98%",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              paddingLeft: "16px",
              marginTop: "16px",
            }}
          >
            Business Alliances
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              id="standard-basic"
              sx={{ m: 2, minWidth: 75, bottom: 8 }}
              variant="standard"
              select
              label="Filter"
              defaultValue="All"
              onChange={(e) =>
                // setHandleRelation(e.target.value, value.razaoSocial)
                setFilter(e.target.value)
              }
            >
              {options.map((option) => (
                <MenuItem value={option.name} key={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <DialogAddBusinessAlliance />
          </Box>
        </Box>
        <Table
          aria-label="collapsible table"
          sx={{ "& > *": { borderBottom: "unset" }, width: "100%" }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Show Members</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Business Goal</TableCell>
              <TableCell align="left">Creation Date</TableCell>
              <TableCell align="left">Responsible Member</TableCell>
              <TableCell align="left">Owner</TableCell>
              <TableCell align="left">Permission type</TableCell>
              <TableCell align="left">Menu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content.map(
              (row, i) => (
                (
                  <Row
                    type={row?.permission[i]?.type}
                    key={row.id}
                    row={row}
                    handleCloseClickNewMember={handleCloseClickNewMember}
                  />
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <RegisterNewMember
            openRegNewMember={openRegNewMember}
            handleCloseClickNewMember={handleCloseClickNewMember}
            alliance={alliance}
          /> */}
    </>
  );
}

function Row({ row, handleCloseClickNewMember, type }) {
  const [open, setOpen] = React.useState(false);
  const [openDialogInternal, setOpenDialogInternal] = React.useState(false);
  const [openDialogExternal, setOpenDialogExternal] = React.useState(false);
  const [openDialogPermission, setOpenDialogPermission] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const user_id = useSelector(selectCurrentUserId);
  const permissionType =
    type || row.users?.id === user_id ? "Editor" : "Viewer";
  const [editingAlliance, setEditing] = React.useState(false);
  const [addAlliance, setAdicionando] = React.useState(false);
  const [updateBusinessAlliance] = useUpdateBusinessAllianceMutation();

  function editando() {
    //click menu->update

    setEditing(!editingAlliance);
  }
  function adicionandoInternal() {
    //click menu->add member

    setOpenDialogInternal(true);
  }
  function managePermission() {
    //click menu->add member
    setOpenDialogPermission(true);
  }

  function adicionandoExternal() {
    setOpenDialogExternal(true);
  }
  const formik = useFormik({
    initialValues: {
      id: row.id,
      name: row.name,
      business_goal: row.business_goal,
      creation_date: row.creation_date,
      responsable_organization: row.responsable_member.cnpj,
    },
    onSubmit: async (values) => {
      await updateBusinessAlliance(values);

      // formik.resetForm();
    },
  });
  function click() {
    if (editingAlliance) {
      //click update confirma
      formik.handleSubmit();
      editando();
    }
  }

  function setFormik(params) {
    formik.values.creation_date = format(new Date(params), "yyyy-MM-dd");
  }
  const internal_collaborationsSorted = [...row.internal_collaborations];

  internal_collaborationsSorted.sort(function (a, b) {
    let x = new Date(a.exit_date);
    let y = new Date(b.exit_date);
    let x2 = new Date(a.entry_date);
    let y2 = new Date(b.entry_date);
    return x - y || x2 - y2;
  });

  const external_collaborationsSorted = [...row.external_collaborations];

  external_collaborationsSorted.sort(function (a, b) {
    let x = new Date(a.exit_date);
    let y = new Date(b.exit_date);
    let x2 = new Date(a.entry_date);
    let y2 = new Date(b.entry_date);
    return x - y || x2 - y2;
  });

  return (
    <React.Fragment>
      <DialogAddInternalCollaboration
        openDialog={openDialogInternal}
        setOpenDialogInternal={setOpenDialogInternal}
        BusinessAlliance={row}
      ></DialogAddInternalCollaboration>
      <DialogAddExternalCollaboration
        openDialog={openDialogExternal}
        setOpenDialogExternal={setOpenDialogExternal}
        BusinessAlliance={row}
      ></DialogAddExternalCollaboration>
      <DialogManagePermission
        openDialog={openDialogPermission}
        setOpenDialogPermission={setOpenDialogPermission}
        BusinessAlliance={row}
      ></DialogManagePermission>

      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          {editingAlliance ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="name"
                name="name"
                label="Name"
                variant="standard"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.name
          )}
        </TableCell>
        <TableCell align="left">
          {editingAlliance ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="business_goal"
                name="business_goal"
                label="Business Goal"
                variant="standard"
                value={formik.values.business_goal}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.business_goal
          )}
        </TableCell>
        <TableCell align="left">
          {editingAlliance ? (
            <form onSubmit={formik.handleSubmit}>
              <ResponsiveDateTimePickers
                setFormik={setFormik}
                value1={formatDate(formik.values.creation_date)}
              ></ResponsiveDateTimePickers>
            </form>
          ) : (
            formatDate(row.creation_date)
          )}
        </TableCell>
        <TableCell align="left">{row.responsable_member.name}</TableCell>
        <TableCell align="left">{row.users?.name}</TableCell>
        <TableCell align="left">{permissionType}</TableCell>

        <TableCell align="left">
          {editingAlliance ? (
            <>
              <form onSubmit={formik.handleSubmit}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={click}
                >
                  <CheckIcon></CheckIcon>
                </IconButton>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={editando} //fecha menu
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </form>
            </>
          ) : (
            <MenuBusinessAlliance
              permissionType={permissionType}
              editando={editando}
              adicionandoInternal={adicionandoInternal}
              adicionandoExternal={adicionandoExternal}
              managePermission={managePermission}
            ></MenuBusinessAlliance>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={{
                  paddingLeft: "16px",
                  marginTop: "16px",
                }}
                variant="h6"
                component="div"
              >
                Internal Collaboration
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Alliance Member</TableCell>
                    <TableCell align="center">Relationship</TableCell>
                    <TableCell align="center">Owner</TableCell>

                    <TableCell align="center">Entry Date</TableCell>
                    <TableCell align="center">Exit Date</TableCell>
                    <TableCell align="center">Menu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {internal_collaborationsSorted.map((member) => (
                    <ShowInternalCollaboration
                      key={member.id}
                      member={member}
                      open={open}
                      responsable={row.responsable_member}
                      date={row.creation_date}
                    ></ShowInternalCollaboration>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={{
                  paddingLeft: "16px",
                  marginTop: "16px",
                }}
                variant="h6"
                component="div"
              >
                External Collaboration
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Business Alliance</TableCell>
                    <TableCell align="center">Relationship</TableCell>
                    <TableCell align="center">Process View</TableCell>
                    <TableCell align="center">Entry Date</TableCell>
                    <TableCell align="center">Exit Date</TableCell>
                    <TableCell align="center">Menu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
               

                  {external_collaborationsSorted.map((member) => (
                    <ShowExternalCollaboration
                      key={member.id}
                      member={member}
                      open={open}
                    ></ShowExternalCollaboration>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

