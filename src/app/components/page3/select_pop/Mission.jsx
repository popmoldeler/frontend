import * as React from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MenuMission from "./MenuMission";

export default function Mission({ mission, allianceMembers, pop_id }) {
  console.log(mission);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const [openConstituentProcess, setOpenConstituentProcess] =
    React.useState(false);

  const [edit, setEdit] = React.useState(false);
  const [delet, setDelet] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{mission.tittle}</TableCell>
        <TableCell align="left">{mission.description}</TableCell>
        <TableCell align="left">
          {mission.status == 1 ? "able" : "disable"}
        </TableCell>
        <TableCell align="left">
          <MenuMission />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
