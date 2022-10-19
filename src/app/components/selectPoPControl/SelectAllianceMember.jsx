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

export default function SelectAllianceMember({
  handleClose,
  onSuccess,
  allianceMembers,
  pop_mission_id,
}) {
  // const [filtered, setFiltered] = React.useState(allianceMembers);

  let filtered = [...allianceMembers];

  function compare(a, b) {
   
    if (a.alliance_member.name < b.alliance_member.name) {
      return -1;
    }
    if (a.alliance_member.name > b.alliance_member.name) {
      return 1;
    }
    return 0;
  }

 

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
              Alliance Members
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
              {filtered.sort(compare).map((row) => (
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

function Row({ row, onSuccess, handleClose,  }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSelectAlliance = () => {
    onSuccess(row.alliance_member);
   

    handleClose();
  };
  return (
    <>
      <TableRow key={row.cnpj}>
        <TableCell align="center">{row.alliance_member.name}</TableCell>

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
