import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { format } from "date-fns";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import {
  useUpdateInternalCollaborationMutation,
  useAddInternalCollaborationMutation,
} from "../../../features/business_alliance/internalCollaborationApiSlice";

import MenuMember from "./MenuMember";

function ResponsiveDateTimePickers({ setFormik, value1 }) {
  if (value1 === undefined) {
    value1 = new Date();
    //  setFormik(value1);
  }
  const [value, setValue] = React.useState(value1);
  setFormik(value);
  const handleChange = (newValue) => {
    setValue(newValue);
    setFormik(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Entry Date"
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField variant="standard" sx={{ width: "18ch" }} {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

function formatDate(data) {
  if (data === null) {
    return;
  }
  var date = new Date(data.replace(/-/g, "/"));
  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear()
  );
  // console.log(date);
}

export default function ShowInternalCollaboration({
  member,
  responsable,
  date,
}) {
  const relations = ["Merge", "Acquisition", "Partnership"];

  const [editingMember, setEditing] = React.useState(false);
  const [deletingMember, setDeletingMember] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [updateInternalCollaboration] = useUpdateInternalCollaborationMutation();
  const [addInternalCollaboration] = useAddInternalCollaborationMutation();
  const block = member.exit_date ? false : true;
  const user = useSelector(selectCurrentUser);
  function editando() {
    setEditing(!editingMember);
  }
  function deletando() {
    setDeletingMember(!deletingMember);
  }

  const formik = useFormik({
    initialValues: {
      id: member.id,
      business_alliance_id: member.business_alliance_id,
      alliance_member_id: member.alliance_member.id,

      relationship: member.relationship,
      entry_date: member.entry_date,
      exit_date: member.exit_date,
    },
    onSubmit: async (values) => {
      if (member.relationship !== values.relationship) {
        const m = {
          business_alliance_id: member.business_alliance_id,
          alliance_member_id: member.alliance_member.id,

          relationship: member.relationship,
          entry_date: member.entry_date,
          exit_date: format(new Date(values.entry_date), "yyyy-MM-dd"),
        };
        // console.log("old",m);
       addInternalCollaboration(m);
      }
      updateInternalCollaboration(values);

      // console.log("new",values);
    },
  });
  function click(e) {
    if (editingMember) {
      formik.handleSubmit();
      editando();
    }
    if (deletingMember) {
      handleDelete(e);
      deletando();
    }
  }
  function handleDelete(params) {
    // formik.values.organization= formik.values.organization.cnpj
    // console.log("->", formik.values);
    updateInternalCollaboration(formik.values);
  }
  function setFormikExitDate(params) {
    formik.values.exit_date = format(new Date(params), "yyyy-MM-dd");
  }
  function setFormikEntryDate(params) {
    formik.values.entry_date = format(new Date(params), "yyyy-MM-dd");
  }
  return (
    <TableRow key={member.id + 1}>
      <TableCell align="center">{member.alliance_member.name}</TableCell>
      <TableCell align="center">
        {block && editingMember ? (
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="relationship">Relationship</InputLabel>
            <Select
              sx={{ width: "15ch" }}
              labelId="demo-simple-select-standard-label"
              id="relationship"
              name="relationship"
              value={formik.values.relationship}
              onChange={formik.handleChange}
              label="Relationship"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {relations.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          member.relationship
        )}
      </TableCell>
      <TableCell align="center">
        {member?.alliance_member?.users?.name}
      </TableCell>
      <TableCell align="center">
        {editingMember ? (
          <form onSubmit={formik.handleSubmit}>
            <ResponsiveDateTimePickers
              setFormik={setFormikEntryDate}
              value1={formatDate(formik.values.entry_date)}
            ></ResponsiveDateTimePickers>
          </form>
        ) : (
          formatDate(member.entry_date)
        )}
      </TableCell>
      <TableCell align="center">
        {deletingMember || (editingMember && !block) ? (
          <form onSubmit={formik.handleSubmit}>
            <ResponsiveDateTimePickers
              setFormik={setFormikExitDate}
              value1={formatDate(formik.values.exit_date)}
            ></ResponsiveDateTimePickers>
          </form>
        ) : (
          formatDate(member.exit_date)
        )}
      </TableCell>

      <TableCell align="center">
        {member.relationship !== "Responsible" &&
          (deletingMember || editingMember ? (
            <>
              <form onSubmit={formik.handleSubmit}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(e) => click(e)}
                >
                  <CheckIcon></CheckIcon>
                </IconButton>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={() => {
                    if (deletingMember === true) {
                      deletando();
                    } else {
                      editando();
                    }
                  }}
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </form>
            </>
          ) : (
            <MenuMember
              editando={editando}
              deletando={deletando}
              block={member.exit_date ? true : false}
            ></MenuMember>
          ))}
      </TableCell>
    </TableRow>
  );
}
