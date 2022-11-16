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

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Mission from "./Mission";

export default function SelectPoPMission(props) {
  const { mission } = props;

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

  const editando = () => {
    setEdit(!edit);
  };

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
        <TableCell align="left">{mission.name}</TableCell>
        <TableCell align="left">{mission.description}</TableCell>
      </TableRow>
      <TableRow>
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
                {mission?.pop_missions.map((mission) => (
                  <Mission
                    mission={mission}
                    key={mission.id}
                    allianceMembers={allianceMembers}
                    pop_id={mission.pop_id}
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
