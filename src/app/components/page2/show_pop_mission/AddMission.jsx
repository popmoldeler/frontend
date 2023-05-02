import React from "react";
import { Button } from "@mui/material";
import TransferList from "../TransferListPoP";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";

import { useAddPopMissionMutation } from "../../../features/business_alliance/bussinesAllianceApiSlice";
import { useUpdatePopMissionModelMutation } from "../../../features/pop_mission_model/popMissionModel";

function AddPopMission({
  openRegisterPopMission,
  setOpenRegisterPopMission,
  handleClose,
  id,
  pop,
}) {
  const [addPopMission] = useAddPopMissionMutation();
  const [updatePopMissionModel] = useUpdatePopMissionModelMutation();

  const formik = useFormik({
    initialValues: {
      tittle: "",
      description: "",
      status: true,
      pop_id: id,
    },
    onSubmit: async (values) => {
      addPopMission(values);
      const popMissionModel = {
        id: pop.pop_mission_model.id,
        updated: false,
       
      };

      updatePopMissionModel(popMissionModel);
      formik.resetForm();

      handleClose();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            m: 1,
          }}
        >
          <TextField
            sx={{ minWidth: 320, marginBottom: 1 }}
            id="tittle"
            name="tittle"
            label="Tittle"
            variant="standard"
            value={formik.values.tittle}
            onChange={formik.handleChange}
          />

          <TextField
            rows={4}
            multiline
            sx={{ minWidth: 320, marginBottom: 1 }}
            id="description"
            name="description"
            label="Description"
            variant="standard"
            value={formik.values.description}
            onChange={formik.handleChange}
          />

          <Box
            sx={{
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ m: 1, width: "15ch" }}
              color="error"
              variant="outlined"
              fullWidth
              onClick={handleClose}
            >
              Close
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
        </Grid>
      </form>
    </>
  );
}

export default AddPopMission;
