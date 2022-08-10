import React from "react";
import { Button } from "@mui/material";
import TransferList from "../TransferListPoP";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";

import {
  useAddPopMutation,
  useAddPopMissionMutation,
} from "../../../features/business_alliance/bussinesAllianceApiSlice";

function AddPopMission({
  openRegisterPopMission,
  setOpenRegisterPopMission,
  handleClose,
  id,
}) {
  const [addPop] = useAddPopMutation();
  const [addPopMission] = useAddPopMissionMutation();
  // const [updatePop] = useUpdatePopMutation();

  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [right, setRight] = React.useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      business_alliance_id: id,
    },
    onSubmit: async (values) => {
      console.log(right);
      addPop(values).then((res) =>
        right.map((mission) => {
          mission.pop_id = res.data.id;
          console.log(mission);
          addPopMission(mission);
        })
      );
      formik.resetForm();
      setRight([]);
      handleClose();
    },
  });

  function handleCloseClick() {
    setOpenRegisterPopMission();
  }

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
          // container
          // direction="column"
          // justifyContent="center"
          // alignItems="center"
          // sx={{
          //   m: 1,
          //   // width: 800,
          //   // textAlign: "center",
          // }}
        >
          <TextField
            sx={{ minWidth: 320, marginBottom: 1 }}
            id="name"
            name="name"
            label="Name"
            variant="standard"
            value={formik.values.name}
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
          <TransferList right={right} setRight={setRight}></TransferList>

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
