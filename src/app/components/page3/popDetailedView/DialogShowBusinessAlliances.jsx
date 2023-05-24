import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BpmnModdle from "bpmn-moddle";
import BpmnJS from "bpmn-js";
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
import { useGetPoPConstituentProcessQuery } from "../../../features/constituent_process/constituenProcessApiSlice";

const moddle = new BpmnModdle();
const bpmnJS = new BpmnJS();

var xmlStr =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_0z7m68t" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="11.5.0">' +
  "</bpmn:definitions>";

export default function DialogShowBusinessAlliances({
  user_id,
  handleSetXmlString,
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
          PoP Mission
        </Button>
      </Box>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle sx={{ alignSelf: "center" }}>PoP Mission</DialogTitle>
        <DialogContent>
          <ShowBusinessAlliace
            user_id={user_id}
            handleSetXmlString={handleSetXmlString}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function ShowBusinessAlliace({ user_id, handleSetXmlString }) {
  const [popConstiuentId, setPopConstiuentId] = React.useState(false);
  const [skip, setSkip] = React.useState(true);
  const { data: constituentFileText } = useGetPoPConstituentProcessQuery(
    popConstiuentId,
    { skip }
  );

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
              setPopConstiuentId={setPopConstiuentId}
              constituentFileText={constituentFileText}
              setSkip={setSkip}
              skip={skip}
              handleSetXmlString={handleSetXmlString}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function Row({
  row,
  setPopConstiuentId,
  constituentFileText,
  setSkip,
  skip,
  handleSetXmlString,
}) {
  const [openShowPopMission, setOpenShowPopMission] = React.useState(false);

  let popExternalCollaboration = [];

  row.external_collaborations.map((pops) => {
    if (pops.business_collaboration_partner.pops.length > 0) {
      pops.business_collaboration_partner.pops.map((pop) => {
        popExternalCollaboration.push(pop);
      });
    }
  });

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
                </TableRow>
              </TableHead>
              <TableBody>
                {row.pops.map((pop) => (
                  <Pop
                    popExternalCollaboration={popExternalCollaboration}
                    pop={pop}
                    key={pop.id}
                    // pop={row.pops.filter((obj) => obj.id !== mission.id)}
                    popOverall={pop}
                    allianceMembers={row.internal_collaborations}
                    setPopConstiuentId={setPopConstiuentId}
                    constituentFileText={constituentFileText}
                    setSkip={setSkip}
                    skip={skip}
                    handleSetXmlString={handleSetXmlString}
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
function Pop(props) {
  const {
    pop,
    popExternalCollaboration,
    popOverall,
    setPopConstiuentId,
    constituentFileText,
    setSkip,
    skip,
    allianceMembers,
    handleSetXmlString,
  } = props;
  const [openPopMission, setOpenPopMission] = React.useState(false);

  return (
    <React.Fragment>
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
        <TableCell align="left">{pop.name}</TableCell>
        <TableCell align="left">{pop.description}</TableCell>
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
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Menu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pop.pop_missions?.map((mission) => (
                  <PopMission
                    popExternalCollaboration={popExternalCollaboration}
                    mission={mission}
                    key={mission.id}
                    allianceMembers={allianceMembers}
                    pop_id={mission.pop_id}
                    pop={pop}
                    popOverall={popOverall}
                    setPopConstiuentId={setPopConstiuentId}
                    constituentFileText={constituentFileText}
                    setSkip={setSkip}
                    skip={skip}
                    handleSetXmlString={handleSetXmlString}
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
  constituentFileText,
  setPopConstiuentId,
  setSkip,
  skip,
  handleSetXmlString,
}) {
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{mission.tittle}</TableCell>
        <TableCell align="left">{mission.description}</TableCell>
        <TableCell align="left">
          {mission.status == 1 ? "able" : "disable"}
        </TableCell>
        <TableCell align="left">
          <MenuSelectMission
            mission={mission}
            setPopConstiuentId={setPopConstiuentId}
            constituentFileText={constituentFileText}
            setSkip={setSkip}
            skip={skip}
            handleSetXmlString={handleSetXmlString}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function MenuSelectMission({
  mission,
  constituentFileText,
  setPopConstiuentId,
  setSkip,
  skip,
  handleSetXmlString,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [xml, setXml] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let inputXmls = [];

  var bpmnJSArray = [];
  var xmlFinal = "";

  async function handleClickCreatePopMissionModel(params) {
    const { rootElement: definitions } = await moddle.fromXML(xmlStr);
    const xmlStrings = [];
    const sources = [];

    for (let i = 0; i < mission.mission_processes.length; i++) {
      const xmlString =
        mission.mission_processes[i].constituent_process.file_text;
      xmlStrings.push(xmlString);

      const source = new DOMParser().parseFromString(xmlString, "text/xml");
      sources.push(source);

      console.log(xmlStrings);
    }

    //Pega todas as collaborations
    const collaborations = [];

    for (let i = 0; i < mission.mission_processes.length; i++) {
      const collaboration =
        sources[i].getElementsByTagName("bpmn:collaboration");
      if (collaboration.length > 0) {
        collaborations.push(collaboration);
      }
    }

    console.log(collaborations);

    //Pega todos os id's de processo no collaborations
    const collaboration_process_ids = [];
    for (let i = 0; i < collaborations[0].length; i++) {
      for (let j = 0; j < collaborations[i][i].children.length; j++) {
        console.log(
          collaborations[i][j].children[j].attributes.processRef.value
        );
        const collaboration_process_id =
          collaborations[i][j].children[j].attributes.processRef.value;
        //console.log(collaboration_process_id);
        collaboration_process_ids.push(collaboration_process_id);
      }
    }

    console.log(collaboration_process_ids);

    //Pega todos os process e poe no groups
    const groups = [];
    const outside_groups = [];

    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];

      const group = source.getElementsByTagName("bpmn:process");
      console.log(group[0].id);

      if (collaboration_process_ids.includes(group[0].id) == false) {
        groups.push(group);
      } else {
        console.log("Ta no collaboration" + group);
        outside_groups.push(group);
      }
    }

    console.log(groups);
    console.log(outside_groups);

    const grupoZero = groups[0];
    //o for começa no 1 porque ele vai pegar todos da frente e jogar no primeiro
    for (let i = 1; i < groups.length; i++) {
      const group = groups[i];
      console.log(group[0].children);
      console.log(grupoZero[0].children);

      while (group[0].children[0] !== undefined) {
        grupoZero[0].append(group[0].children[0]);
      }

      console.log(grupoZero[0]);
    }

    const group_planes = [];

    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      const group_plane = source.getElementsByTagName("bpmndi:BPMNPlane");
      group_planes.push(group_plane);
    }

    let valor = 200;
    for (let i = 1; i < group_planes.length; i++) {
      const group_plane = group_planes[i];
      // group_plane[0].children acessa todas as lista dos shapes e edge dentro do plane
      // o [0] nao precisa mudar
      //vamos iterar sobre todos os children

      console.log(group_plane[0].children[i].children);
      for (let j = 0; j < group_plane[0].children.length; j++) {
        for (let k = 0; k < group_plane[0].children[j].children.length; k++) {
          console.log(
            group_plane[0].children[j].children[k].attributes.y.value
          );
          group_plane[0].children[j].children[k].attributes.y.value =
            Number(group_plane[0].children[j].children[k].attributes.y.value) +
            Number(valor);
          console.log(
            group_plane[0].children[j].children[k].attributes.y.value
          );
        }
      }
      valor = Number(valor) + Number(200);
      console.log(valor);
    }

    const group_plane_zero = group_planes[0];
    for (let i = 1; i < group_planes.length; i++) {
      const group_plane = group_planes[i];

      while (group_plane[0].children[0] !== undefined) {
        group_plane_zero[0].appendChild(group_plane[0].children[0]);
      }

      console.log(group_plane_zero[0]);
    }

    const finalGroup = sources[0].getElementsByTagName("bpmn:definitions");

    finalGroup[0].appendChild(grupoZero[0]);
    console.log(outside_groups[0][0]);
    finalGroup[0].appendChild(outside_groups[0][0]);

    finalGroup[0].childNodes[2].appendChild(group_plane_zero[0]);

    finalGroup[0].appendChild(collaborations[0][0]);

    var newDocument = document.implementation.createDocument(null, null, null);

    newDocument.appendChild(finalGroup[0]);
    console.log(newDocument);

    const serializer = new XMLSerializer();
    const xmlFinal = serializer.serializeToString(newDocument);

    console.log(xmlFinal);
    // var xmlStr =
    //   '<?xml version="1.0" encoding="UTF-8"?>' +
    //   '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_0z7m68t" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="11.5.0">' +
    //   "</bpmn:definitions>";
    // const teste = new BpmnModdle();

    // const { rootElement: definitions } = await teste.fromXML(xmlStr);
    // const { xml } = await teste.toXML(xmlFinal);
    handleSetXmlString(xmlFinal)
  }

  async function handleClickLoadPopMissionModel(params) {}

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
        <MenuItem onClick={() => handleClickCreatePopMissionModel(mission)}>
          Create new PoP Detailed Model
        </MenuItem>
        <MenuItem
          onClick={() => handleClickLoadPopMissionModel()}
          // disabled={pop.pop_mission_model != null ? false : true}
        >
          Load PoP Detailed Model
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
