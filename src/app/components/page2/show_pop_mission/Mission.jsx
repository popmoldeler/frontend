import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";

import {
  useUpdatePopMissionMutation,
  useDeletePopMissionMutation,
} from "../../../features/business_alliance/bussinesAllianceApiSlice";
import { useFormik } from "formik";

import DialogAddConstituentProcessModel from "./DialogAddConstituentProcessModel";
import MenuMission from "./MenuMission";
import ConstituentProcessModel from "./ConstituentProcessModel";
import DialogAddPoPAsConstituentProcessModel from "./DialogAddPoPAsConstituentProcessModel";
import ExtractRequirementsDialog from "../../interoperabilityRequirementsExtract/extractRequirementsDialog";
import ExtractReliabilityDialog from "../../reliabilityRequirementsExtract/extractReliabilityDialog";
// Nova em inglês
import ExtractReliabilityDialogEnglish from "../../reliabilityRequirementsExtractEnglish/extractReliabilityDialogEnglish";

export default function Mission({ mission, allianceMembers, pop_id, pop,popExternalCollaboration ,popOverall}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [updatePopMission] = useUpdatePopMissionMutation();
  const [deletePopMission] = useDeletePopMissionMutation();
  const [openConstituentProcess, setOpenConstituentProcess] =
    React.useState(false);

  const [edit, setEdit] = React.useState(false);
  const [delet, setDelet] = React.useState(false);
  const [
    openDialogAddConstientProcessModel,
    setOpenDialogAddConstientProcessModel,
  ] = React.useState(false);
  const [
    openDialogAddPopAsConstientProcessModel,
    setOpenDialogAddPopAsConstientProcessModel,
  ] = React.useState(false);
  const [
    openRequirementsDialog,
    setOpenRequirementsDialog,
  ] = React.useState(false);

  const [
    openReliabilityDialog,
    setOpenReliabilityDialog,
  ] = React.useState(false);

  const [
    openReliabilityDialogEnglish,
    setOpenReliabilityDialogEnglish,
  ] = React.useState(false);

  const adicionandoConstituentProcessModel = () => {
    setOpenDialogAddConstientProcessModel(!openDialogAddConstientProcessModel);
  };

  const adicionandoPopAsConstituentProcessModel = () => {
    setOpenDialogAddPopAsConstientProcessModel(!openDialogAddPopAsConstientProcessModel);
  };

  const extractInteroperabilityRequirements = () => {
    setOpenRequirementsDialog(true);
  };

  const extractReliabilityRequirements = () => {
    setOpenReliabilityDialog(true);
  };

  const extractReliabilityRequirementsEnglish = () => {
    setOpenReliabilityDialogEnglish(true);
  };

  const deletando = () => {
    setDelet(!delet);
    setEdit(false);
  };
  const editando = () => {
    setEdit(!edit);
    setDelet(false);
  };
  const formik = useFormik({
    initialValues: {
      tittle: mission.tittle,
      description: mission.description,
      id: mission.id,
    },
    onSubmit: async (values) => {
      // console.log(values);
      updatePopMission(values);
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
    deletePopMission(formik.values);
  }
  
 
  return (
    <React.Fragment>
      <DialogAddConstituentProcessModel
        openDialogAddConstientProcessModel={openDialogAddConstientProcessModel}
        setOpenDialogAddConstientProcessModel={
          setOpenDialogAddConstientProcessModel
        }
        allianceMembers={allianceMembers}
        mission={mission.id}
        pop_id={pop_id}
        adicionandoConstituentProcessModel={adicionandoConstituentProcessModel}
        constituentProcessesJaCadastrados={mission?.mission_processes}
        popOverall={popOverall}
        pop={pop}
      />

      <DialogAddPoPAsConstituentProcessModel
        openDialogAddPopAsConstientProcessModel={openDialogAddPopAsConstientProcessModel}
        setOpenDialogAddPopAsConstientProcessModel={
          setOpenDialogAddPopAsConstientProcessModel
        }
        mission={mission.id}
        popExternalCollaboration={popExternalCollaboration}
        missionProcesses={mission.mission_processes}
        // allianceMembers={allianceMembers}
        // pop_id={pop_id}
        // adicionandoConstituentProcessModel={adicionandoConstituentProcessModel}
        // constituentProcessesJaCadastrados={mission?.mission_processes}
        popOverall={popOverall}
        pop={pop}
      />
     
      <ExtractRequirementsDialog
        openRequirementsDialog={openRequirementsDialog}
        setOpenRequirementsDialog={
          setOpenRequirementsDialog
        }
        mission={mission}
      />

      <ExtractReliabilityDialog
        openReliabilityDialog={openReliabilityDialog}
        setOpenReliabilityDialog={
          setOpenReliabilityDialog
        }
        mission={mission}
      />

    <ExtractReliabilityDialogEnglish
            openReliabilityDialogEnglish={openReliabilityDialogEnglish}
            setOpenReliabilityDialogEnglish={
              setOpenReliabilityDialogEnglish
            }
            mission={mission}
          />

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenConstituentProcess(!openConstituentProcess)}
          >
            {openConstituentProcess ? (
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
                id="tittle"
                name="tittle"
                label="Tittle"
                variant="standard"
                value={formik.values.tittle}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            mission.tittle
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
          {mission.status == 1 ? "able" : "disable"}
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
            <MenuMission
              editando={editando}
              deletando={deletando}
              adicionandoConstituentProcessModel={
                adicionandoConstituentProcessModel
              }
              adicionandoPopAsConstituentProcessModel={
                adicionandoPopAsConstituentProcessModel
              }
              extractInteroperabilityRequirements={
                extractInteroperabilityRequirements
              }
              extractReliabilityRequirements={
                extractReliabilityRequirements
              }
              extractReliabilityRequirementsEnglish={
                extractReliabilityRequirementsEnglish
              }
            ></MenuMission>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        {/* PoP Mission */}
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={openConstituentProcess} timeout="auto" unmountOnExit>
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
                Constituent Processes
              </Typography>
            </Box>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mission?.mission_processes?.map((mission) => (
                  <ConstituentProcessModel
                    constituent={mission}
                    key={mission.id}
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
