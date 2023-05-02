import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function SelectPopAsConstituentControl({
  handleClose,
  onSuccess,
  allianceMembers,
  pop_mission_id,
  pop,
  popExternalCollaboration,
  missionProcesses,
}) {

  let content = []

  popExternalCollaboration.map((pop) => {
    content.push(pop)
  })
  pop.map((pop) => {
    content.push(pop)
  })
  // console.log(content)
  // console.log(missionProcesses)

  // .filter(
  //   ({ name: id1 }) =>
  //     !constituentProcessesJaCadastrados.some(
  //       ({ constituent_process: id2 }) => id2.name === id1
  //     )
  // )


  const filteredContent= content.filter(obj1 => !missionProcesses.some(obj2 =>  obj2.pop ? obj1.name === obj2.pop.name : null));


  
  // content.filter(
  //   ({ name: id1 }) =>
  //     !missionProcesses.some(
  //       ({ pop: id2 }) => {
  //         // id2?.name === id1
  //         id2 ? id2.name === id1 : null
  //         // console.log( id2)

  //       }
  //     )
  // ).map((constituent) => console.log(constituent))

  return (
    <>
      <Paper sx={{ margin: 1, width: "90%", height: "91%" }}>
        <TableContainer sx={{ height: "100%" }}>
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
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContent.map((row) => (
                <Row
                  handleClose={handleClose}
                  onSuccess={onSuccess}
                  key={row.id}
                  row={row}

                // ={}
                // handleOrgDelete={handleOrgDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

function Row({ row, onSuccess, handleClose }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSelectAlliance = () => {
    onSuccess(row);

    handleClose();
  };
  return (
    <>
      <TableRow key={row.id}>
        <TableCell align="center">{row.name}</TableCell>

        <TableCell align="center">
          <IconButton
            aria-label="Select Alliance Member"
            onClick={handleSelectAlliance}
          >
            <AddCircleIcon
              titleAccess={"Select Alliance Member"}
              color={"primary"}
            />
          </IconButton>
          {/* <MenuOrganization
              onClick: (row.alliance_member) => {
                    onSuccess(row.alliance_member);
              },                    
              editando={editando}
              deletando={deletando}
            ></MenuOrganization> */}
        </TableCell>
      </TableRow>
    </>
  );
}
