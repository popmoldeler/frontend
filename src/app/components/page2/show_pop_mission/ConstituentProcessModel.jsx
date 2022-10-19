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

export default function ConstituentProcessModel({ constituent }) {

  
  return (
    <React.Fragment>
      {/* ConstituenProcessModel*/}

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">
          {constituent.constituent_process.name}
        </TableCell>
        <TableCell align="left">
          {constituent.constituent_process.description}
        </TableCell>
        
      </TableRow>
    </React.Fragment>
  );
}
