import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { useFormik } from "formik";

import {
  useGetBusinessAlliancesQuery,
  useAddExternalCollaborationMutation,
} from "../../../../features/business_alliance/bussinesAllianceApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../../features/auth/authSlice";

function ResponsiveDateTimePickers({ setFormik }) {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
    setFormik(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        sx={{ paddingBottom: "5px" }}
        label="Entry Date"
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField sx={{ width: "320px" }} variant="standard" {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

function AddInternalCollaboration({
  openRegNewMember,
  handleCloseClickNewMember,
  BusinessAlliance,
  handleClose,
}) {
  const relations = [
    { id: 1, name: "Merge" },
    { id: 2, name: "Acquisition" },
    { id: 3, name: "Partnership" },
  ];
  const type_view = [
    { id: 4, name: "Private" },
    { id: 5, name: "Public" },
  ];

  function setFormik(params) {
    formik.values.entry_date = params;
  }
  const today = new Date();
  const [addExternalCollaboration] = useAddExternalCollaborationMutation();

  const formik = useFormik({
    initialValues: {
      business_collaboration_partner_id: "",
      relationship: "",
      entry_date: today,
      business_collaboration_main_id: null,
      type_view_process: "",
    },
    onSubmit: async (values) => {
      formik.values.entry_date = format(
        new Date(values.entry_date),
        "yyyy-MM-dd"
      );
      formik.values.business_collaboration_main_id = BusinessAlliance.id;

      addExternalCollaboration(formik.values);

      handleClose();
    },
  });
  const user_id = useSelector(selectCurrentUserId);

  const { isSuccess, isLoading, data } = useGetBusinessAlliancesQuery(user_id);
  let res = [];
  if (isLoading) {
    
  } else if (isSuccess) {
    res = data.filter(
      (n) =>
        !BusinessAlliance.external_collaborations.some(
          (n2) => n.id == n2.business_collaboration_partner_id
        )
    );
    res = res.filter((n) => n.id !== BusinessAlliance.id);
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl
            variant="standard"
            sx={{ minWidth: 120, paddingBottom: "5px" }}
          >
            <InputLabel id="business_collaboration_partner_id">
              Add External Collaboration
            </InputLabel>
            <Select
              sx={{ width: "36ch" }}
              labelId="demo-simple-select-standard-label"
              id="business_collaboration_partner_id"
              name="business_collaboration_partner_id"
              value={formik.values.business_collaboration_partner_id}
              onChange={formik.handleChange}
              label="External Collaboration"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {res.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ minWidth: 120, paddingBottom: "5px" }}
          >
            <InputLabel id="relationship">Relationship</InputLabel>
            <Select
              sx={{ width: "36ch" }}
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
          <FormControl
            variant="standard"
            sx={{ minWidth: 120, paddingBottom: "5px" }}
          >
            <InputLabel id="relationship">Type View Process</InputLabel>
            <Select
              sx={{ width: "36ch" }}
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

          <ResponsiveDateTimePickers
            setFormik={setFormik}
          ></ResponsiveDateTimePickers>

          <Box sx={{ paddingTop: "20px" }}>
            <Button
              sx={{ m: 1, width: "15ch" }}
              color="error"
              variant="outlined"
              fullWidth
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ m: 1, width: "15ch" }}
              color="success"
              variant="outlined"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default AddInternalCollaboration;
