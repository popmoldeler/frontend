import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BpmnModdle from "bpmn-moddle";

import {
  Box,
  Collapse,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Button } from "@mui/material";

import { useGetBusinessAlliancesQuery } from "../../../features/business_alliance/bussinesAllianceApiSlice";

export default function DialogShowBusinessAlliances({
  handleSetXmlString,
  saveFile,
  updateFile,
  user_id,
  setSaveOrUpdataPopMissionModel,
  saveOrUpdataPopMissionModel,
  setPopMissionModelId,
  setOpenDialogPopMissionModelOutOfDate,
  setPopId,
  setNameConstraintsButton,

  setPopMissionNumber,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
          PoP Missions Model
        </Button>
      </Box>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle sx={{ alignSelf: "center" }}>
          PoP Missions Model
        </DialogTitle>
        <DialogContent>
          <ShowBusinessAlliace
            user_id={user_id}
            handleSetXmlString={handleSetXmlString}
            handleCloseDialog={handleCloseDialog}
            setSaveOrUpdataPopMissionModel={setSaveOrUpdataPopMissionModel}
            saveOrUpdataPopMissionModel={saveOrUpdataPopMissionModel}
            setPopMissionModelId={setPopMissionModelId}
            setOpenDialogPopMissionModelOutOfDate={
              setOpenDialogPopMissionModelOutOfDate
            }
            setPopId={setPopId}
            setNameConstraintsButton={setNameConstraintsButton}
            saveFile={saveFile}
            setPopMissionNumber={setPopMissionNumber}
            updateFile={updateFile}
          />
          <Box
            sx={{
              alignSelf: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Button
              sx={{ m: 1, width: "15ch" }}
              color="error"
              variant="outlined"
              fullWidth
              onClick={handleCloseDialog}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function ShowBusinessAlliace({
  user_id,
  handleSetXmlString,
  handleCloseDialog,
  saveFile,
  setPopMissionModelId,
  setOpenDialogPopMissionModelOutOfDate,
  updateFile,
  setPopId,
  setNameConstraintsButton,

  setPopMissionNumber,
}) {
  const { isLoading, isSuccess, isError, error, data } =
    useGetBusinessAlliancesQuery(user_id);

  let content;

  if (isLoading) {
    content = [
      {
        business_goal: "Loading",
        id: 0,
        name: "Loading",
        responsable_member_id: 0,
        creation_date: "2022-03-16",
        pops: [
          {
            id: 1,
            name: "loading",
            description: "loading",
            business_alliance_id: 1,
            pop_missions: [
              {
                id: 1,
                status: 1,
                description: "loading",
                tittle: "loading",
                pop_id: 1,
              },
            ],
          },
        ],
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
  } else if (isSuccess) {
    content = data;
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
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
      </Box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => (
            <Row
              row={row}
              key={row.id}
              handleSetXmlString={handleSetXmlString}
              handleCloseDialog={handleCloseDialog}
              saveFile={saveFile}
              user_id={user_id}
              setPopMissionModelId={setPopMissionModelId}
              setOpenDialogPopMissionModelOutOfDate={
                setOpenDialogPopMissionModelOutOfDate
              }
              updateFile={updateFile}
              setPopId={setPopId}
              setNameConstraintsButton={setNameConstraintsButton}
              setPopMissionNumber={setPopMissionNumber}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({
  row,
  handleSetXmlString,
  handleCloseDialog,
  saveFile,
  user_id,
  setPopMissionModelId,
  setOpenDialogPopMissionModelOutOfDate,
  updateFile,
  setPopId,
  setNameConstraintsButton,

  setPopMissionNumber,
}) {
  const [openShowPopMission, setOpenShowPopMission] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenShowPopMission(!openShowPopMission)}
          >
            {openShowPopMission ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">
          {/* <DialogAddPopMission id={row.id} /> */}
        </TableCell>
      </TableRow>
      <TableRow>
        {/* PoP */}
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={openShowPopMission} timeout="auto" unmountOnExit>
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
                PoP
              </Typography>
            </Box>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Menu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.pops.map((mission) => (
                  <PopMission
                    mission={mission}
                    key={mission.id}
                    handleSetXmlString={handleSetXmlString}
                    handleCloseDialog={handleCloseDialog}
                    saveFile={saveFile}
                    user_id={user_id}
                    setPopMissionModelId={setPopMissionModelId}
                    setOpenDialogPopMissionModelOutOfDate={
                      setOpenDialogPopMissionModelOutOfDate
                    }
                    updateFile={updateFile}
                    setPopId={setPopId}
                    setNameConstraintsButton={setNameConstraintsButton}
                    setPopMissionNumber={setPopMissionNumber}
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

function PopMission({
  mission,
  handleSetXmlString,
  handleCloseDialog,
  saveFile,
  user_id,
  setPopMissionModelId,
  setOpenDialogPopMissionModelOutOfDate,
  updateFile,
  setPopId,
  setNameConstraintsButton,
  setPopMissionNumber,
}) {
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small"></IconButton>
        </TableCell>
        <TableCell align="left">{mission.name}</TableCell>
        <TableCell align="left">{mission.description}</TableCell>
        <TableCell align="left">
          <MenuSelectMission
            pop={mission}
            handleSetXmlString={handleSetXmlString}
            handleCloseDialog={handleCloseDialog}
            saveFile={saveFile}
            user_id={user_id}
            setPopMissionModelId={setPopMissionModelId}
            setOpenDialogPopMissionModelOutOfDate={
              setOpenDialogPopMissionModelOutOfDate
            }
            updateFile={updateFile}
            setPopId={setPopId}
            setNameConstraintsButton={setNameConstraintsButton}
            setPopMissionNumber={setPopMissionNumber}
          />
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
    </React.Fragment>
  );
}

function MenuSelectMission({
  pop,
  handleSetXmlString,
  handleCloseDialog,
  saveFile,
  user_id,
  setPopMissionModelId,
  setOpenDialogPopMissionModelOutOfDate,
  updateFile,
  setPopId,
  setNameConstraintsButton,
  setPopMissionNumber,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function handleClickCreatePopMissionModel(params) {
    setPopMissionNumber(pop.pop_missions.length);
    createXml(pop, user_id, setPopMissionModelId, saveFile, updateFile).then(
      (res) => {
        handleSetXmlString(res);
        if (
          pop.pop_mission_model.constituent_processes_constraints_model != null
        ) {
          setNameConstraintsButton(
            pop.pop_mission_model.constituent_processes_constraints_model
          );
        } else {
          setNameConstraintsButton("add");
        }
        setPopId(pop.id);
        handleCloseDialog();
      }
    );
  }

  async function handleClickLoadPopMissionModel(params) {
    setPopMissionNumber(pop.pop_missions.length);

    if (pop.pop_mission_model.updated == false) {
      setOpenDialogPopMissionModelOutOfDate(true);
    } else {
      handleSetXmlString(pop.pop_mission_model.file_text);
      setPopId(pop.id);
      setPopMissionModelId(pop.pop_mission_model.id);
      if (
        pop.pop_mission_model.constituent_processes_constraints_model != null
      ) {
        setNameConstraintsButton(
          pop.pop_mission_model.constituent_processes_constraints_model
        );
      } else {
        setNameConstraintsButton("add");
      }
      handleCloseDialog();
    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}

        // onBlur={handleClickBlur}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={
            () => handleClickCreatePopMissionModel(pop)
            // getConstituent(pop.id, pop),
            // pop.overall_view == null
            //   ? (setSaveOrUpdataOverallView("save"), setSaveOrUpdate("save"))
            //   : (setSaveOrUpdataOverallView("update"),
            //     setSaveOrUpdate("update"))
          }
        >
          Create new PoP Missions Model
        </MenuItem>
        <MenuItem
          onClick={
            () => handleClickLoadPopMissionModel(pop)
            // loadOverallView(pop),
            // pop.overall_view == null
            //   ? (setSaveOrUpdataOverallView("save"), setSaveOrUpdate("save"))
            //   : (setSaveOrUpdataOverallView("update"),
            //     setSaveOrUpdate("update")),
            // handleOpenDialogOutOfDate(pop)
          }
          disabled={pop.pop_mission_model != null ? false : true}
        >
          Load PoP Missions Model
        </MenuItem>
      </Menu>
    </div>
  );
}
async function createXml(
  pop,
  user_id,
  setPopMissionModelId,
  saveFile,
  updateFile
) {
  var xmlStr =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_0z7m68t" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="11.5.0">' +
    "</bpmn:definitions>";

  const moddle = new BpmnModdle();

  const { rootElement: definitions } = await moddle.fromXML(xmlStr);
  let x = 0;
  let y = 0;

  const bpmnCollaboration = moddle.create("bpmn:Collaboration", {
    id: `Collaboration_${Math.floor(Math.random() * 999)}`,
    participants: [],
  });

  var process = moddle.create("bpmn:Process", {
    id: `Process_${Math.floor(Math.random() * 999)}`,
    laneSets: [],
  });
  const participant = moddle.create("bpmn:Participant", {
    id: `Participant_${Math.floor(Math.random() * 999)}`,
    name: `${pop.name}`,
    processRef: process,
  });
  bpmnCollaboration.participants.push(participant);

  var plane = moddle.create("bpmndi:BPMNPlane", {
    id: `Plane_${Math.floor(Math.random() * 999)}`,
    bpmnElement: bpmnCollaboration,
    planeElement: [],
  });

  var diagram = moddle.create("bpmndi:BPMNDiagram", {
    id: `Diagram_${Math.floor(Math.random() * 999)}`,
  });

  pop.pop_missions.map((missao) => {
    var subProcess = moddle.create("bpmn:SubProcess", {
      id: `Activity_${Math.floor(Math.random() * 999)}`,
      name: `${missao.tittle}`,
    });
    process.laneSets.push(subProcess);

    const bpmnActivity = moddle.create("bpmndi:BPMNShape", {
      id: `Shape_${Math.floor(Math.random() * 999)}`,
      bpmnElement: subProcess,

      bounds: moddle.create("dc:Bounds", {
        x: `${x + 220}`,
        y: `${y + 90}`,
        width: "100",
        height: "80",
      }),
      label: moddle.create("bpmndi:BPMNLabel"),
    });
    plane.planeElement.push(bpmnActivity);
    y = y + 100;
  });

  const bpmnPool = moddle.create("bpmndi:BPMNShape", {
    id: `Shape_${Math.floor(Math.random() * 999)}`,
    bpmnElement: participant,
    isHorizontal: true,
    bounds: moddle.create("dc:Bounds", {
      x: "160",
      y: "80",
      width: "600",
      height: `${(pop.pop_missions.length + 1) * 90}`,
    }),
    label: moddle.create("bpmndi:BPMNLabel"),
  });

  plane.planeElement.push(bpmnPool);

  diagram.plane = plane;

  definitions.get("rootElements").push(bpmnCollaboration);
  definitions.get("rootElements").push(process);

  diagram.plane = plane;

  definitions.get("rootElements").push(diagram);
  process.laneSets.map((activity) => {
    var diagram1 = moddle.create("bpmndi:BPMNDiagram", {
      id: `Diagram_${Math.floor(Math.random() * 999)}`,
      plane: moddle.create("bpmndi:BPMNPlane", {
        id: `Plane_${Math.floor(Math.random() * 999)}`,
        bpmnElement: activity,
      }),
    });

    definitions.get("rootElements").push(diagram1);
  });
  const { xml } = await moddle.toXML(definitions);

  const popMissionModel = {
    name: "PoP Mission Model",
    file_text: xml,
    user_id: user_id,
    pop_id: pop.id,
  };
  console.log(popMissionModel);
  if (pop.pop_mission_model == null) {
    // this.props.addOverallView(overallview);
    console.log("save");
    saveFile(popMissionModel).then(({ data }) => {
      setPopMissionModelId(data.id);
    });
  } else {
    const newPopMissionModel = {
      name: "PoP Mission Model",
      file_text: xml,
      user_id: user_id,
      pop_id: pop.id,
      id: pop.pop_mission_model.id,
      updated: true,
    };
    console.log("update", newPopMissionModel);
    updateFile(newPopMissionModel).then(({ data }) => {
      setPopMissionModelId(data.id);
    });
    // this.props.updateOverallView(newoverallview)
  }
  return xml;
}
