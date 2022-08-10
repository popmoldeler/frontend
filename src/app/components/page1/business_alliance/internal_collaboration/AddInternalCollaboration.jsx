import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { useFormik } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useAddInternalCollaborationMutation } from "../../../../features/business_alliance/bussinesAllianceApiSlice";
import { useGetAllianceMemberQuery } from "../../../../features/alliance_member/allianceMemberApiSlice";

function ResponsiveDateTimePickers({ setFormik, value1 }) {
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
  const relations = ["Merge", "Acquisition", "Partnership"];

  function setFormik(params) {
    formik.values.entry_date = params;
  }
  const today = new Date();
  const [addInternalCollaboration] = useAddInternalCollaborationMutation();

  const formik = useFormik({
    initialValues: {
      alliance_member_id: "",
      relationship: "",
      entry_date: today,
      business_alliance_id: null,
      type_view_process: "",
    },
    onSubmit: async (values) => {
      formik.values.entry_date = format(
        new Date(values.entry_date),
        "yyyy-MM-dd"
      );
      formik.values.business_alliance_id = BusinessAlliance.id;

      addInternalCollaboration(formik.values);
      handleClose();
    },
  });
  const { isSuccess, isLoading, data } = useGetAllianceMemberQuery();
  let res;
  if (isLoading) {
    res = [
      {
        category_id: 0,
        category: { id: 0 },

        city: "Loading",
        cnpj: "Loading",
        country: "Loading",
        id: 1,
        name: "Loading",
        neighborhood: "Loading",
        number: "Loading",
        site: "Loading",
        state: "Loading",
        street: "Loading",
        zip_code: "Loading",
      },
    ];
  } else if (isSuccess) {
    res = data.filter(
      (n) =>
        !BusinessAlliance.internal_collaborations.some(
          (n2) => n.id == n2.alliance_member_id
        )
    );
    res = res.filter((n) => n.id !== BusinessAlliance.responsable_member_id);
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
            <InputLabel id="alliance_member_id">
              Add Internal Collaboration
            </InputLabel>
            <Select
              sx={{ width: "36ch" }}
              labelId="demo-simple-select-standard-label"
              id="alliance_member_id"
              name="alliance_member_id"
              value={formik.values.alliance_member_id}
              onChange={formik.handleChange}
              label="Internal Collaboration"
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

export default AddInternalCollaboration;
