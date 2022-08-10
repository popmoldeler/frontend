import * as React from "react";
import { Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useAddPermissionMutation } from "../../../../features/business_alliance/bussinesAllianceApiSlice";

import { format } from "date-fns";
import { useFormik } from "formik";

import SearchUsers from "./SearchUsers";
function ResponsiveDateTimePickers({ setFormik }) {
  const [value, setValue] = React.useState(new Date());
  setFormik(value);
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

function ManagePermission({
  openRegNewMember,
  handleCloseClickNewMember,
  BusinessAlliance,
  handleClose,
}) {
  const types = ["Viewer", "Editor"];

  function setFormik(params) {
    formik.values.entry_date = params;
  }
  const today = new Date();
  const [addPermission] = useAddPermissionMutation();

  const formik = useFormik({
    initialValues: {
      type: "",
      user_id: "",
      entry_date: "",
      business_alliance_id: "",
    },
    onSubmit: async (values) => {
      formik.values.entry_date = format(
        new Date(values.entry_date),
        "yyyy-MM-dd"
      );
      formik.values.business_alliance_id = BusinessAlliance.id;

      addPermission(formik.values);

      handleClose();
    },
  });
  function handleChangeUserId(value) {
   
    formik.values.user_id = value?.id;
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
          <SearchUsers handleChangeUserId={handleChangeUserId}></SearchUsers>
          <FormControl
            variant="standard"
            sx={{ minWidth: 120, paddingBottom: "5px" }}
          >
            <InputLabel id="relationship">Type</InputLabel>
            <Select
              sx={{ width: "36ch" }}
              labelId="demo-simple-select-standard-label"
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              label="Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {types.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
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

export default ManagePermission;
