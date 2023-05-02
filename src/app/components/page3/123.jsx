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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BpmnModdle from "bpmn-moddle";
import { useGetBusinessAlliancesQuery } from "../../features/business_alliance/bussinesAllianceApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../features/auth/authSlice";
import { Button } from "@mui/material";
import { useGetPoPConstituentProcessQuery } from "../../features/constituent_process/constituenProcessApiSlice";
const moddle = new BpmnModdle();

var xmlStr =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_0z7m68t" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="11.5.0">' +
  "</bpmn:definitions>";

//

function fetchBusinessAlliances(id) {
  return useGetBusinessAlliancesQuery(id);
}

export default function AddBpmn({ handleSetXmlString, handleClose }) {
  const user_id = useSelector(selectCurrentUserId);
  const [id, setId] = React.useState("");

  const [constituent, setconstituent] = React.useState([]);




  React.useEffect(() => {
    async function createXml() {
      const { rootElement: definitions } = await moddle.fromXML(xmlStr);

      const { currentData, isFetching, isError } = fetchBusinessAlliances(id);

      if (isError) return console.error("Error fetching data");

      if (isFetching && !currentData) return;

      setconstituent(currentData);

      // Create XML using the fetched data
      // ...
    }

    if (id) createXml();
  }, [id]);


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

  // const createXml = async (id, setconstituent) => {
  //   const { rootElement: definitions } = await moddle.fromXML(xmlStr);

  //   setconstituent(handleGet(id));
  //   console.log(constituent);
  //   // var add = 0;
  //   // const bpmnCollaboration = moddle.create("bpmn:Collaboration", {
  //   //   id: `Collaboration_${Math.floor(Math.random() * 999)}`,
  //   //   participants: [],
  //   // });
  //   // var plane = moddle.create("bpmndi:BPMNPlane", {
  //   //   id: `Plane_${Math.floor(Math.random() * 999)}`,
  //   //   bpmnElement: bpmnCollaboration,
  //   //   planeElement: [],
  //   // });
  //   // var diagram = moddle.create("bpmndi:BPMNDiagram", {
  //   //   id: `Diagram_${Math.floor(Math.random() * 999)}`,
  //   // });

  //   missions.map((mission) => {
  //     // const bpmnProcess = moddle.create("bpmn:Process", {
  //     //   id: `Process_${Math.floor(Math.random() * 999)}`,
  //     // });
  //     // definitions.get("rootElements").push(bpmnProcess);
  //     mission.mission_processes.map((constituent) => {
  //       const participant = moddle.create("bpmn:Participant", {
  //         id: `Participant_${Math.floor(Math.random() * 999)}`,
  //         name: `${constituent.constituent_process.name}`,
  //         // processRef: bpmnProcess,
  //       });
  //       bpmnCollaboration.participants.push(participant);

  //       const bpmnShape = moddle.create("bpmndi:BPMNShape", {
  //         id: `Shape_${Math.floor(Math.random() * 999)}`,
  //         bpmnElement: participant,
  //         isHorizontal: true,
  //         bounds: moddle.create("dc:Bounds", {
  //           x: "160",
  //           y: `${add + 80}`,
  //           width: "600",
  //           height: "60",
  //         }),
  //         label: moddle.create("bpmndi:BPMNLabel"),
  //       });
  //       plane.planeElement.push(bpmnShape);

  //       add = add + 80;
  //     });
  //   });

    definitions.get("rootElements").push(bpmnCollaboration);

    diagram.plane = plane;
    definitions.get("rootElements").push(diagram);

    const { xml } = await moddle.toXML(definitions);
    await handleSetXmlString(xml);
  };

  async function createXml(missions) {
    const { rootElement: definitions } = await moddle.fromXML(xmlStr);
    handleGet(id);
    console.log(constituent);
    // var add = 0;
    // const bpmnCollaboration = moddle.create("bpmn:Collaboration", {
    //   id: `Collaboration_${Math.floor(Math.random() * 999)}`,
    //   participants: [],
    // });
    // var plane = moddle.create("bpmndi:BPMNPlane", {
    //   id: `Plane_${Math.floor(Math.random() * 999)}`,
    //   bpmnElement: bpmnCollaboration,
    //   planeElement: [],
    // });
    // var diagram = moddle.create("bpmndi:BPMNDiagram", {
    //   id: `Diagram_${Math.floor(Math.random() * 999)}`,
    // });

    missions.map((mission) => {
      // const bpmnProcess = moddle.create("bpmn:Process", {
      //   id: `Process_${Math.floor(Math.random() * 999)}`,
      // });
      // definitions.get("rootElements").push(bpmnProcess);
      mission.mission_processes.map((constituent) => {
        const participant = moddle.create("bpmn:Participant", {
          id: `Participant_${Math.floor(Math.random() * 999)}`,
          name: `${constituent.constituent_process.name}`,
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
    });

    definitions.get("rootElements").push(bpmnCollaboration);

    diagram.plane = plane;
    definitions.get("rootElements").push(diagram);

    const { xml } = await moddle.toXML(definitions);
    await handleSetXmlString(xml);
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
              createXml={createXml}
              handleClose={handleClose}
              setId={setId}
              setconstituent={setconstituent}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ row, createXml, handleClose, setId, setconstituent }) {
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
                    allianceMembers={row.internal_collaborations}
                    createXml={createXml}
                    handleClose={handleClose}
                    setId={setId}
                    setconstituent={setconstituent}
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
  allianceMembers,
  createXml,
  handleClose,
  setId,
  setconstituent,
}) {
  const handleSelect = () => (
    setId(mission.id),
    createXml(mission.pop_missions, setconstituent),
    handleClose()
  );
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small"></IconButton>
        </TableCell>
        <TableCell align="left">{mission.name}</TableCell>
        <TableCell align="left">{mission.description}</TableCell>
        <TableCell align="left">
          <Button onClick={handleSelect}>Select</Button>
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
    </React.Fragment>
  );
}
