import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import {
  useUpdatePopMutation,
  useDeletePopMutation,
} from "../../../features/business_alliance/bussinesAllianceApiSlice";
import { useFormik } from "formik";

import DialogAddMission from "./DialogAddMission";
import MenuPop from "./MenuPop";
// import MenuMission from "./MenuMission";
import Mission from "./Mission";

export default function PopMission(props) {
  const { mission, pop, popExternalCollaboration, popOverall } = props;
 
  const { allianceMembers } = props;
  const [openPopMission, setOpenPopMission] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const [openDialogAdd, setOpenDialogAdd] = React.useState(false);

  const [edit, setEdit] = React.useState(false);
  const [delet, setDelet] = React.useState(false);

  const adicionando = () => {
    setOpenDialogAdd(!openDialogAdd);
  };
  const deletando = () => {
    setDelet(!delet);
  };
  const editando = () => {
    setEdit(!edit);
  };
  const [updatePop] = useUpdatePopMutation();
  const [deletePop] = useDeletePopMutation();
  const formik = useFormik({
    initialValues: {
      name: mission.name,
      description: mission.description,
      id: mission.id,
    },
    onSubmit: async (values) => {
      console.log(values);
      updatePop(values);
      // formik.resetForm();
    },
  });
  function handleUpdateOrDelete(e) {
    if (edit) {
      formik.handleSubmit();
      editando();
    }
    if (delet) {
      handleDelete(e);
      deletando();
    }
  }
  function handleDelete() {
    //  console.log(formik.values.id)
    deletePop(formik.values);
  }
  return (
    <React.Fragment>
      <DialogAddMission
        openDialogAdd={openDialogAdd}
        setOpenDialogAdd={setOpenDialogAdd}
        id={mission.id}
        pop={popOverall}
      />

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenPopMission(!openPopMission)}
          >
            {openPopMission ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          {edit ? (
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
            mission.name
          )}
        </TableCell>
        <TableCell align="left">
          {edit ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="description"
                name="description"
                label="Description"
                variant="standard"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            mission.description
          )}
        </TableCell>
        <TableCell align="left">
          {edit || delet ? (
            <>
              <form onSubmit={formik.handleSubmit}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleUpdateOrDelete}
                >
                  <CheckIcon></CheckIcon>
                </IconButton>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={() => {
                    if (delet === true) {
                      deletando();
                    } else {
                      editando();
                    }
                  }} //fecha menu
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </form>
            </>
          ) : (
            <MenuPop
              editando={editando}
              deletando={deletando}
              adicionando={adicionando}
              canDelete={mission.pop_missions.length > 0 ? true : false}
            ></MenuPop>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        {/* PoP Mission */}
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={openPopMission} timeout="auto" unmountOnExit>
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
                PoP Mission
              </Typography>
            </Box>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Menu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mission?.pop_missions.map((mission) => (
                  <Mission
                    popExternalCollaboration={popExternalCollaboration}
                    mission={mission}
                    key={mission.id}
                    allianceMembers={allianceMembers}
                    pop_id={mission.pop_id}
                    pop={pop}
                    popOverall={popOverall}
                  />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
