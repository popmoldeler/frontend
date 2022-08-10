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
  useUpdateExternalCollaborationMutation,
  useAddExternalCollaborationMutation,
} from "../../../features/business_alliance/externalCollaborationApiSlice";

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
export default function ShowExternalCollaboration({ member }) {
  const relations = [
    { id: 1, name: "Merge" },
    { id: 2, name: "Acquisition" },
    { id: 3, name: "Partnership" },
  ];
  const type_view = [
    { id: 4, name: "Private" },
    { id: 5, name: "Public" },
  ];

  const [editingMember, setEditing] = React.useState(false);
  const [deletingMember, setDeletingMember] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [updateExternalCollaboration] =
    useUpdateExternalCollaborationMutation();
  const [addExternalCollaboration] = useAddExternalCollaborationMutation();

  const block = member.exit_date ? false : true;
  function editando() {
    setEditing(!editingMember);
  }
  function deletando() {
    setDeletingMember(!deletingMember);
  }

  const formik = useFormik({
    initialValues: {
      id: member.id,
      business_collaboration_main_id: member.business_collaboration_main_id,
      business_collaboration_partner: member.business_collaboration_partner.id,
      type_view_process: member.type_view_process,
      relationship: member.relationship,
      entry_date: member.entry_date,
      exit_date: member.exit_date,
    },
    onSubmit: async (values) => {
      if (member.relationship !== values.relationship) {
        const m = {
          business_collaboration_main_id: member.business_collaboration_main_id,
          business_collaboration_partner_id:
            member.business_collaboration_partner.id,
          type_view_process: member.type_view_process,

          relationship: member.relationship,
          entry_date: member.entry_date,
          exit_date: format(new Date(values.entry_date), "yyyy-MM-dd"),
        };
        addExternalCollaboration(m);
        // console.log("old",m);
      }
      updateExternalCollaboration(values);

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
    updateExternalCollaboration(formik.values);
  }
  function setFormikExitDate(params) {
    formik.values.exit_date = format(new Date(params), "yyyy-MM-dd");
  }
  function setFormikEntryDate(params) {
    formik.values.entry_date = format(new Date(params), "yyyy-MM-dd");
  }
  return (
    <TableRow key={member.id}>
      <TableCell align="center">
        {member.business_collaboration_partner.name}
      </TableCell>
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
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          member.relationship
        )}
      </TableCell>
      <TableCell align="center">
        {block && editingMember ? (
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="relationship">Type View Process</InputLabel>
            <Select
              sx={{ width: "15ch" }}
              labelId="demo-simple-select-standard-label"
              id="type_view_process"
              name="type_view_process"
              value={formik.values.type_view_process}
              onChange={formik.handleChange}
              label="Type View Process"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {type_view.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          member.type_view_process
        )}
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
        {editingMember || deletingMember ? (
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
        )}
      </TableCell>
    </TableRow>
  );
}
