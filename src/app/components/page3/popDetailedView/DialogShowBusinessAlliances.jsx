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
import { MuiFileInput } from "mui-file-input";
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
  setPopMissionId,
  saveFile,
  updateFile,
  setpopDetailedModelId,
  setNameVariabilityButton,
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
          PoP Mission Detailed Model
        </Button>
      </Box>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle sx={{ alignSelf: "center" }}>
          PoP Mission Detailed Model
        </DialogTitle>
        <DialogContent>
          <ShowBusinessAlliace
            user_id={user_id}
            handleSetXmlString={handleSetXmlString}
            setPopMissionId={setPopMissionId}
            saveFile={saveFile}
            updateFile={updateFile}
            setpopDetailedModelId={setpopDetailedModelId}
            setNameVariabilityButton={setNameVariabilityButton}
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
  setPopMissionId,
  saveFile,
  updateFile,
  setpopDetailedModelId,
  setNameVariabilityButton,
}) {
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
              setPopMissionId={setPopMissionId}
              saveFile={saveFile}
              updateFile={updateFile}
              setpopDetailedModelId={setpopDetailedModelId}
              user_id={user_id}
              setNameVariabilityButton={setNameVariabilityButton}
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
  setPopMissionId,
  saveFile,
  updateFile,
  setpopDetailedModelId,
  user_id,
  setNameVariabilityButton,
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
                    setPopMissionId={setPopMissionId}
                    saveFile={saveFile}
                    updateFile={updateFile}
                    setpopDetailedModelId={setpopDetailedModelId}
                    user_id={user_id}
                    setNameVariabilityButton={setNameVariabilityButton}
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
    setPopMissionId,
    saveFile,
    updateFile,
    setpopDetailedModelId,
    user_id,
    setNameVariabilityButton,
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
                    setPopMissionId={setPopMissionId}
                    saveFile={saveFile}
                    updateFile={updateFile}
                    setpopDetailedModelId={setpopDetailedModelId}
                    user_id={user_id}
                    setNameVariabilityButton={setNameVariabilityButton}
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
  setPopMissionId,
  saveFile,
  updateFile,
  setpopDetailedModelId,
  user_id,
  setNameVariabilityButton,
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
            setPopMissionId={setPopMissionId}
            saveFile={saveFile}
            updateFile={updateFile}
            setpopDetailedModelId={setpopDetailedModelId}
            user_id={user_id}
            setNameVariabilityButton={setNameVariabilityButton}
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
  setPopMissionId,
  saveFile,
  updateFile,
  setpopDetailedModelId,
  user_id,
  setNameVariabilityButton,
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
    setPopMissionId(mission.id);
    // console.log(mission.id)
    const sources = []; //doms dos constituents

    let bigger = [];
    let maior = 0;
    let maiorBounds = 0;

    for (let i = 0; i < mission.mission_processes.length; i++) {
      const source = new DOMParser().parseFromString(
        mission.mission_processes[i].constituent_process.file_text,
        "text/xml"
      );
      sources.push(source);

      for (
        let j = 0;
        j < sources[i].getElementsByTagName("dc:Bounds").length;
        j++
      ) {
        if (
          Number(
            sources[i].getElementsByTagName("dc:Bounds")[j].attributes.height
              .value
          ) > maior
        ) {
          maior = Number(
            sources[i].getElementsByTagName("dc:Bounds")[j].attributes.height
              .value
          );
        }
      }

      for (
        let j = 0;
        j < sources[i].getElementsByTagName("Bounds").length;
        j++
      ) {
        if (
          Number(
            sources[i].getElementsByTagName("Bounds")[j].attributes.height.value
          ) > maiorBounds
        ) {
          maiorBounds = Number(
            sources[i].getElementsByTagName("Bounds")[j].attributes.height.value
          );
        }
      }

      if (maiorBounds > maior) {
        bigger.push(maiorBounds);
      } else {
        bigger.push(maior);
      }
      maior = 0;
    }

    //começa aqui

    const sourceBase = [];
    let baseNumber;

    for (let i = 0; i < sources.length; i++) {
      if (sources[i].getElementsByTagName("collaboration").length != 0) {
        sourceBase.push(sources[i].getElementsByTagName("definitions"));
        baseNumber = i;
      }
      if (sources[i].getElementsByTagName("bpmn:collaboration").length != 0) {
        sourceBase.push(sources[i].getElementsByTagName("bpmn:definitions"));
      }
    }

    if (baseNumber >= 0) {
      // has bpmn from other source

      const collaborationBase = [];

      collaborationBase.push(
        sources[baseNumber].getElementsByTagName("collaboration")
      );

      for (let i = 0; i < mission.mission_processes.length - 1; i++) {
        const collaboration = sources[i].getElementsByTagName("collaboration");

        if (collaboration.length == 0) {
          const collaborationBPMN =
            sources[i].getElementsByTagName("bpmn:collaboration");

          while (collaborationBPMN[0].children[0] != undefined) {
            const collaborationBPMNChild = collaborationBPMN[0].children[0];

            collaborationBase[0][0].appendChild(collaborationBPMNChild);
          }
        } else {
          while (collaboration[0].children[0] != undefined) {
            const collaborationChild = collaboration[0].children[0];
            collaborationBase[0][0].appendChild(collaborationChild);
          }
        }
      }

      // //bpmn:process

      for (let i = 0; i < mission.mission_processes.length - 1; i++) {
        const process = sources[i].getElementsByTagName("bpmn:process");
        if (process.length != 0) {
          sourceBase[baseNumber][0].appendChild(process[0]);
        }
      }

      // //process
      for (let i = 0; i < mission.mission_processes.length - 1; i++) {
        const process = sources[i].getElementsByTagName("process");

        if (process.length != 0) {
          sourceBase[baseNumber][0].appendChild(process[0]);
        }
      }

      // //get bigger Y
      // // let biggerY = 0;
      const bounds = [];

      // //diagram and plane
      const planeBase = [];
      planeBase.push(sources[baseNumber].getElementsByTagName("BPMNPlane"));

      // //get plane for each constituent, minus the planeBase
      let valorY = 0;
      let tanto = 200;

      let reverse = bigger.length;
      let biggerY = 0;

      for (let i = 0; i < mission.mission_processes.length; i++) {
        // console.log("biggerY", biggerY);
        if (i == 0) {
          biggerY += tanto + bigger[reverse - 1];
        } else {
          biggerY += tanto + bigger[i - 1];
        }

        if (i != baseNumber) {
          const plane = sources[i].getElementsByTagName("BPMNPlane");

          for (let k = 0; k < bounds.length; k++) {
            planeChild.children.item(k).attributes.y.value =
              Number(planeChild.children.item(k).attributes.y.value) +
              Number(valorY) +
              Number(biggerY);
          }

          if (plane.length != 0) {
            for (let j = 0; j < plane.length; j++) {
              while (plane[0].children[0] != undefined) {
                const planeChild = plane[j].children[0];

                if (planeChild.tagName == "BPMNEdge") {
                  for (let k = 0; k < planeChild.children.length; k++) {
                    if (planeChild.children.item(k)?.attributes?.y?.value) {
                      planeChild.children.item(k).attributes.y.value =
                        Number(planeChild.children.item(k).attributes.y.value) +
                        Number(valorY) +
                        Number(biggerY);
                    }
                    if (planeChild.children.item(k).children.length != 0) {
                      for (
                        let index = 0;
                        index < planeChild.children.item(k).children.length;
                        index++
                      ) {
                        const childChild = planeChild.children
                          .item(k)
                          .children.item(index);
                        if (childChild?.attributes?.y?.value) {
                          childChild.attributes.y.value =
                            Number(childChild.attributes.y.value) +
                            Number(valorY) +
                            Number(biggerY);
                        }
                      }
                    }
                  }
                }
                if (planeChild.tagName == "BPMNShape") {
                  for (let k = 0; k < planeChild.children.length; k++) {
                    if (planeChild.children.item(k)?.attributes?.y?.value) {
                      planeChild.children.item(k).attributes.y.value =
                        Number(planeChild.children.item(k).attributes.y.value) +
                        Number(valorY) +
                        Number(biggerY);
                    }

                    if (planeChild.children.item(k).children.length != 0) {
                      for (
                        let index = 0;
                        index < planeChild.children.item(k).children.length;
                        index++
                      ) {
                        const childChild = planeChild.children
                          .item(k)
                          .children.item(index);
                        if (childChild?.attributes?.y?.value) {
                          childChild.attributes.y.value =
                            Number(childChild.attributes.y.value) +
                            Number(valorY) +
                            Number(biggerY);
                        }
                      }
                    }
                  }
                }

                planeBase[0][0].appendChild(planeChild);
              }
            }
          }
        }
        if (i != baseNumber) {
          const plane = sources[i].getElementsByTagName("bpmndi:BPMNPlane");

          for (let k = 0; k < bounds.length; k++) {
            planeChild.children.item(k).attributes.y.value =
              Number(planeChild.children.item(k).attributes.y.value) +
              Number(valorY) +
              Number(biggerY);
          }

          if (plane.length != 0) {
            for (let j = 0; j < plane.length; j++) {
              while (plane[0].children[0] != undefined) {
                const planeChild = plane[j].children[0];

                if (planeChild.tagName == "bpmndi:BPMNEdge") {
                  for (let k = 0; k < planeChild.children.length; k++) {
                    if (planeChild.children.item(k)?.attributes?.y?.value) {
                      planeChild.children.item(k).attributes.y.value =
                        Number(planeChild.children.item(k).attributes.y.value) +
                        Number(valorY) +
                        Number(biggerY);
                    }
                    if (planeChild.children.item(k).children.length != 0) {
                      for (
                        let index = 0;
                        index < planeChild.children.item(k).children.length;
                        index++
                      ) {
                        const childChild = planeChild.children
                          .item(k)
                          .children.item(index);
                        if (childChild?.attributes?.y?.value) {
                          childChild.attributes.y.value =
                            Number(childChild.attributes.y.value) +
                            Number(valorY) +
                            Number(biggerY);
                        }
                      }
                    }
                  }
                }
                if (planeChild.tagName == "bpmndi:BPMNShape") {
                  for (let k = 0; k < planeChild.children.length; k++) {
                    if (planeChild.children.item(k)?.attributes?.y?.value) {
                      planeChild.children.item(k).attributes.y.value =
                        Number(planeChild.children.item(k).attributes.y.value) +
                        Number(valorY) +
                        Number(biggerY);
                    }

                    if (planeChild.children.item(k).children.length != 0) {
                      for (
                        let index = 0;
                        index < planeChild.children.item(k).children.length;
                        index++
                      ) {
                        const childChild = planeChild.children
                          .item(k)
                          .children.item(index);
                        if (childChild?.attributes?.y?.value) {
                          childChild.attributes.y.value =
                            Number(childChild.attributes.y.value) +
                            Number(valorY) +
                            Number(biggerY);
                        }
                      }
                      // console.log("filho de filho");
                    }
                  }
                }
                planeBase[0][0].appendChild(planeChild);
              }
            }
          }
        }
      }

      const serializer = new XMLSerializer();
      const xmlFinal = serializer.serializeToString(sourceBase[baseNumber][0]);
      // // console.log(xmlFinal);

      const newPopDetailedModel = {
        name: "PoP Detailed Model",
        file_text: xmlFinal,
        user_id: user_id,
        pop_mission_id: mission.id,
        updated: true,
      };
      if (mission.detailed_view == null) {
        saveFile(newPopDetailedModel).then(({ data }) => {
          setpopDetailedModelId(data.id);
        });
        // console.log(newPopDetailedModel);
        handleSetXmlString(xmlFinal);
      } else {
        const updatePopDetailedModel = {
          name: "PoP Detailed Model",
          file_text: xmlFinal,
          user_id: user_id,
          pop_mission_id: mission.id,
          updated: true,
          id: mission.detailed_view.id,
        };
        updateFile(updatePopDetailedModel).then(({ data }) => {
          setpopDetailedModelId(data.id);
        });
      }
      handleSetXmlString(xmlFinal);
    } else {
      // Pega a collaboration
      console.log("ELSE");
      const collaborationBase = [];
      baseNumber = baseNumber == undefined && 0;
      collaborationBase.push(
        sources[baseNumber].getElementsByTagName("bpmn:collaboration")
      );
      for (let i = 0; i < mission.mission_processes.length; i++) {
        if (i != baseNumber) {
          const collaboration =
            sources[i].getElementsByTagName("bpmn:collaboration");
          while (collaboration[0].children[0] != undefined) {
            const collaborationChild = collaboration[0].children[0];
            collaborationBase[0][0].appendChild(collaborationChild);
          }
        }
      }
      //bpmn:process
      for (let i = 0; i < mission.mission_processes.length; i++) {
        if (i != baseNumber) {
          const process = sources[i].getElementsByTagName("bpmn:process");
          if (process.length != 0) {
            sourceBase[0][0].appendChild(process[0]);
          }
        }
      }
      //process
      for (let i = 0; i < mission.mission_processes.length; i++) {
        const process = sources[i].getElementsByTagName("bpmn:process");
        if (process.length != 0) {
          sourceBase[0][0].appendChild(process[0]);
        }
      }

      //get bigger Y
      // let biggerY = 0;
      const bounds = [];
      //diagram and plane
      const planeBase = [];
      planeBase.push(
        sources[baseNumber].getElementsByTagName("bpmndi:BPMNPlane")
      );
      //get plane for each constituent, minus the planeBase
      let valorY = 0;
      let tanto = 100;

      let reverse = bigger.length;
      let biggerY = 0;

      for (let i = 0; i < mission.mission_processes.length; i++) {
        if (i == 0) {
          biggerY += tanto + bigger[reverse - 1];
        } else {
          biggerY += tanto + bigger[i - 1];
        }

        if (i != baseNumber) {
          const plane = sources[i].getElementsByTagName("bpmndi:BPMNPlane");
          for (let k = 0; k < bounds.length; k++) {
            planeChild.children.item(k).attributes.y.value =
              Number(planeChild.children.item(k).attributes.y.value) +
              Number(valorY) +
              Number(biggerY);
          }
          if (plane.length != 0) {
            for (let j = 0; j < plane.length; j++) {
              while (plane[0].children[0] != undefined) {
                const planeChild = plane[j].children[0];
                if (planeChild.tagName == "bpmndi:BPMNEdge") {
                  for (let k = 0; k < planeChild.children.length; k++) {
                    if (planeChild.children.item(k)?.attributes?.y?.value) {
                      planeChild.children.item(k).attributes.y.value =
                        Number(planeChild.children.item(k).attributes.y.value) +
                        Number(valorY) +
                        Number(biggerY);
                    }
                    if (planeChild.children.item(k).children.length != 0) {
                      for (
                        let index = 0;
                        index < planeChild.children.item(k).children.length;
                        index++
                      ) {
                        console.log(planeChild);
                        const childChild = planeChild.children
                          .item(k)
                          .children.item(index);
                        if (childChild?.attributes?.y?.value) {
                          childChild.attributes.y.value =
                            Number(childChild.attributes.y.value) +
                            Number(valorY) +
                            Number(biggerY);
                        }
                      }
                    }
                  }
                }
                if (planeChild.tagName == "bpmndi:BPMNShape") {
                  for (let k = 0; k < planeChild.children.length; k++) {
                    if (planeChild.children.item(k)?.attributes?.y?.value) {
                      planeChild.children.item(k).attributes.y.value =
                        Number(planeChild.children.item(k).attributes.y.value) +
                        Number(valorY) +
                        Number(biggerY);
                    }
                    if (planeChild.children.item(k).children.length != 0) {
                      for (
                        let index = 0;
                        index < planeChild.children.item(k).children.length;
                        index++
                      ) {
                        const childChild = planeChild.children
                          .item(k)
                          .children.item(index);
                        if (childChild?.attributes?.y?.value) {
                          childChild.attributes.y.value =
                            Number(childChild.attributes.y.value) +
                            Number(valorY) +
                            Number(biggerY);
                        }
                      }
                      // console.log("filho de filho");
                    }
                  }
                }
                planeBase[0][0].appendChild(planeChild);
              }
            }
          }
        }
      }

      const serializer = new XMLSerializer();
      const xmlFinal = serializer.serializeToString(sourceBase[0][0]);
      // const newPopDetailedModel = {
      //   name: "PoP Detailed Model",
      //   file_text: xmlFinal,
      //   user_id: user_id,
      //   pop_mission_id: mission.id,
      //   updated: true,
      // };
      // if (mission.detailed_view == null) {
      //   saveFile(newPopDetailedModel).then(({ data }) => {
      //     setpopDetailedModelId(data.id);
      //   });
      //   console.log(newPopDetailedModel);
      //   handleSetXmlString(xmlFinal);
      // } else {
      //   const updatePopDetailedModel = {
      //     name: "PoP Detailed Model",
      //     file_text: xmlFinal,
      //     user_id: user_id,
      //     pop_mission_id: mission.id,
      //     updated: true,
      //     id: mission.detailed_view.id,
      //   };
      //   updateFile(updatePopDetailedModel).then(({ data }) => {
      //     setpopDetailedModelId(data.id);
      //   });
      // }
      handleSetXmlString(xmlFinal);
    }
  }

  async function handleClickLoadPopMissionModel() {
    // console.log(mission);
    setPopMissionId(mission.id);
    setpopDetailedModelId(mission.detailed_view.id);
    handleSetXmlString(mission.detailed_view.file_text);

    if (mission.detailed_view.variability_constraints_model != null) {
      setNameVariabilityButton(
        mission.detailed_view.variability_constraints_model
      );
    } else {
      setNameVariabilityButton("add");
    }
  }

  async function handleClickUploadPopMissionModel() {
    setMissao(mission);

    console.log("mission", mission.id);
  }

  const [missao, setMissao] = React.useState(null);

  const handleChange = (newFile) => {
    const reader = new FileReader();
    reader.readAsText(newFile);
    reader.onload = function () {
      // console.log(reader.result);
      setPopMissionId(missao.id);
      console.log("missao", missao);

      // setpopDetailedModelId(missao.detailed_view.id);

      const newPopDetailedModel = {
        name: "PoP Detailed Model",
        file_text: reader.result,
        user_id: user_id,
        pop_mission_id: missao.id,
        updated: true,
      };
      if (missao.detailed_view == null) {
        // saveFile(newPopDetailedModel).then(({ data }) => {
        //   setpopDetailedModelId(data.id);
        // });
        handleSetXmlString(reader.result);
      } else {
        const updatePopDetailedModel = {
          name: "PoP Detailed Model",
          file_text: reader.result,
          user_id: user_id,
          pop_mission_id: missao.id,
          updated: true,
          id: missao.detailed_view.id,
        };
        // updateFile(updatePopDetailedModel).then(({ data }) => {
        //   setpopDetailedModelId(data.id);
        // });
        handleSetXmlString(reader.result);
      }

      if (missao.detailed_view.variability_constraints_model != null) {
        setNameVariabilityButton(
          missao.detailed_view.variability_constraints_model
        );
      } else {
        setNameVariabilityButton("add");
      }
      handleClose();
    };

    // console.log(reader.readAsText(newFile));
  };

  // console.log(file);
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
        onClose={handleClose}
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
        <MenuItem
          component="label"
          onClick={() => handleClickUploadPopMissionModel(mission)}
        >
          <MuiFileInput
            sx={{ display: { xs: "none", md: "none" } }}
            onChange={handleChange}
          />
          Upload PoP Detailed Model
        </MenuItem>
      </Menu>
    </div>
  );
}
