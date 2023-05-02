import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BpmnModdle from "bpmn-moddle";

import { useGetBusinessAlliancesQuery } from "../../features/business_alliance/bussinesAllianceApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../features/auth/authSlice";
import { Button, Menu, MenuItem } from "@mui/material";
import { useGetPoPConstituentProcessQuery, constituentProcessApiSlice } from "../../features/constituent_process/constituenProcessApiSlice";
import Mission from "./select_pop/Mission";
import { Pool } from "@mui/icons-material";
import { MissedVideoCallDimensions } from "@styled-icons/material/MissedVideoCall";
import DialogOverallVIewOutOfDate from "./DialogOverallVIewOutOfDate";
const moddle = new BpmnModdle();

var xmlStr =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_0z7m68t" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="11.5.0">' +
  "</bpmn:definitions>";

export default function AddBpmn({
  handleSetXmlString,
  handleClose,
  setPopMissionId,
  setPopId,
  setSaveOrUpdataOverallView,
  setOverallViewId,
  openDialogOutOfDate,
  setOpenDialogOutOfDate,
  saveFile,
  updateFile,
  setNameConstraintsButton,
}) {
  const user_id = useSelector(selectCurrentUserId);

  const [id, setId] = React.useState(null);
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



  const [skip, setSkip] = React.useState(true);
  const [saveOrUpdate, setSaveOrUpdate] = React.useState('');



  const { data: constituent, isSuccess: suc } = useGetPoPConstituentProcessQuery(id, { skip });

  // if (suc == true) {
  //   createXml(constituent);
  //   handleClose();
  // }

  const [popID, setPopID] = React.useState('');
  const [overallviewID, setOverallviewID] = React.useState('');


  React.useEffect(() => {
    if (suc) {

      createXml(constituent, popID, saveOrUpdate, overallviewID);
      handleClose();
    }
  }, [suc])



  const loadOverallView = (pop) => {

    if (pop?.overall_view?.constituent_processes_constraints_model) {
      setNameConstraintsButton(pop.overall_view.constituent_processes_constraints_model)
    }

    handleSetXmlString(pop.overall_view.file_text);
    setOverallViewId(pop.overall_view.id)
    setOverallviewID(pop.overall_view.id)
    setId(id)
    setPopId(pop.id)

    handleClose()

  };


  const getConstituent = (id, pop) => {
    if (pop?.overall_view?.constituent_processes_constraints_model) {
      setNameConstraintsButton(pop.overall_view.constituent_processes_constraints_model)
    }
    if (pop.overall_view) {

      setOverallViewId(pop.overall_view.id)
      setOverallviewID(pop.overall_view.id)
    }
    setId(id)
    setPopId(id)
    setSkip((skip) => !skip)
    setPopID(pop.id)

  };



  async function createXml(content_constituent, popID, saveOrUpdate, overallviewID) {

    const { rootElement: definitions } = await moddle.fromXML(xmlStr);

    var add = 0;
    const bpmnCollaboration = moddle.create("bpmn:Collaboration", {
      id: `Collaboration_${Math.floor(Math.random() * 999)}`,
      participants: [],
    });
    var plane = moddle.create("bpmndi:BPMNPlane", {
      id: `Plane_${Math.floor(Math.random() * 999)}`,
      bpmnElement: bpmnCollaboration,
      planeElement: [],
    });
    var diagram = moddle.create("bpmndi:BPMNDiagram", {
      id: `Diagram_${Math.floor(Math.random() * 999)}`,
    });

    content_constituent?.map((mission) => {
      const participant = moddle.create("bpmn:Participant", {
        id: `Participant_${Math.floor(Math.random() * 999)}`,
        name: `${mission.name}`,
        // processRef: bpmnProcess,
      });
      bpmnCollaboration.participants.push(participant);

      const bpmnShape = moddle.create("bpmndi:BPMNShape", {
        id: `Shape_${Math.floor(Math.random() * 999)}`,
        bpmnElement: participant,
        isHorizontal: true,
        bounds: moddle.create("dc:Bounds", {
          x: "160",
          y: `${add + 80}`,
          width: "600",
          height: "60",
        }),
        label: moddle.create("bpmndi:BPMNLabel"),
      });
      plane.planeElement.push(bpmnShape);

      add = add + 80;
    });
    definitions.get("rootElements").push(bpmnCollaboration);

    diagram.plane = plane;
    definitions.get("rootElements").push(diagram);

    const { xml } = await moddle.toXML(definitions);
    await handleSetXmlString(xml);

    const overallview = {
      name: "overallview",
      file_text: xml,
      user_id: user_id,
      pop_id: popID,
    };

    if (saveOrUpdate == "save") {
      // this.props.addOverallView(overallview);
      saveFile(overallview).then(({ data }) => { setOverallViewId(data.id), console.log('u', data.id) });

    } else {
      const newoverallview = {
        name: "overallview",
        file_text: xml,
        user_id: user_id,
        pop_id: popID,
        id: overallviewID,
        updated: true
      };
      // console.log('update');
      updateFile(newoverallview).then(({ data }) => { setOverallViewId(data.id), console.log('u', data.id) });
      // this.props.updateOverallView(newoverallview)
    }
  }

  const handleOpenDialogOutOfDate = (pop) => {
    if (pop.overall_view.updated == false) {
      console.log('uma vez')
      setOpenDialogOutOfDate(true);
    }

  };


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
            <Row setSaveOrUpdate={setSaveOrUpdate} row={row} key={row.id} getConstituent={getConstituent} handleClose={handleClose} setSaveOrUpdataOverallView={setSaveOrUpdataOverallView} loadOverallView={loadOverallView} handleOpenDialogOutOfDate={handleOpenDialogOutOfDate} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ setSaveOrUpdate, row, getConstituent, handleClose, setSaveOrUpdataOverallView, loadOverallView, handleOpenDialogOutOfDate }) {


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
                    setSaveOrUpdate={setSaveOrUpdate}
                    mission={mission}
                    key={mission.id}
                    getConstituent={getConstituent}
                    handleClose={handleClose}
                    setSaveOrUpdataOverallView={setSaveOrUpdataOverallView}
                    loadOverallView={loadOverallView}
                    handleOpenDialogOutOfDate={handleOpenDialogOutOfDate}
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

function PopMission({ setSaveOrUpdate, mission, getConstituent, handleClose, setSaveOrUpdataOverallView, loadOverallView, handleOpenDialogOutOfDate }) {

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small"></IconButton>
        </TableCell>
        <TableCell align="left">{mission.name}</TableCell>
        <TableCell align="left">{mission.description}</TableCell>
        <TableCell align="left">
          <MenuSelectMission setSaveOrUpdate={setSaveOrUpdate} pop={mission} getConstituent={getConstituent} handleCloseAdd={handleClose} setSaveOrUpdataOverallView={setSaveOrUpdataOverallView} loadOverallView={loadOverallView} handleOpenDialogOutOfDate={handleOpenDialogOutOfDate} />
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
    </React.Fragment>
  );
}

function MenuSelectMission({ setSaveOrUpdate, pop, getConstituent, handleCloseAdd, setSaveOrUpdataOverallView, loadOverallView, handleOpenDialogOutOfDate }) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };




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
          onClick={() => (
            getConstituent(pop.id, pop),


            pop.overall_view == null ? (setSaveOrUpdataOverallView('save'), setSaveOrUpdate('save')) : (setSaveOrUpdataOverallView('update'), setSaveOrUpdate('update'))

          )}>Create new PoP Overall Model</MenuItem>
        <MenuItem
          onClick={() => (
            loadOverallView(pop),

            pop.overall_view == null ? (setSaveOrUpdataOverallView('save'), setSaveOrUpdate('save')) : (setSaveOrUpdataOverallView('update'), setSaveOrUpdate('update')),
            handleOpenDialogOutOfDate(pop)
          )}
          disabled={pop.overall_view != null ? false : true}
        >Load PoP Overall Model</MenuItem>
      </Menu>
    </div >
  );
}
