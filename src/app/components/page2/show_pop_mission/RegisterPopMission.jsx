import React from "react";

import Paper from "@mui/material/Paper";

import { Button } from "@mui/material";
import TransferList from "../TransferListPoP";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
// import { setPop, fetchPops } from "../../store/Pops/Pops.actions";

import { Formik, Field, Form, useFormik } from "formik";
import { LegendToggle } from "@mui/icons-material";

function RegisterPopMission({
  openRegisterPopMission,
  setOpenRegisterPopMission,
}) {
  // const { data } = useAlliancesQuery();
  // const [addPops] = useAddPopsMutation();
  // const [addPopMissions] = useAddPopMissionsMutation();
  // const [updatePop] = useUpdatePopMutation();

  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [right, setRight] = React.useState([]);

  const formik = useFormik({
    initialValues: {
      alliance: "",
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      console.log(right);
      // addPops(values).then((res) =>
      //   right.map((mission) => {
      //     // console.log(res.data.last_insert_id);
      //     mission.pop = res.data.last_insert_id;
      //     // console.log(mission);
      //     addPopMissions(mission);
      //   })
      // );
      // formik.resetForm();
      setRight([]);
    },
  });

  function handleCloseClick() {
    setOpenRegisterPopMission();
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            justifyContent: "space-around",
            m: 1,
            width: 800,
            height: 670,
            textAlign: "center",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle1" gutterBottom component="div">
              Register PoP Mission
            </Typography>

            
          </Grid>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-around",
                alignItems: "center",

                height: 300,
              }}
            >
              <FormControl variant="standard" sx={{ width: 320 }}>
                <InputLabel id="allianceMember">Alliance Member</InputLabel>
                <Select
                  sx={{ width: 320 }}
                  labelId="demo-simple-select-standard-label"
                  id="alliance"
                  name="alliance"
                  value={formik.values.alliance}
                  onChange={formik.handleChange}
                  label="Alliance"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/* {data.map((alliance) => (
                    <MenuItem key={alliance.id} value={alliance.id}>
                      {alliance.name}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>

              <TextField
                sx={{ minWidth: 320 }}
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
                sx={{ minWidth: 320 }}
                id="description"
                name="description"
                label="Description"
                variant="standard"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </Box>

            <TransferList right={right} setRight={setRight}></TransferList>

            <Button type="submit" variant="outlined" color="primary">
              Save
            </Button>
          </Box>
        </Paper>
      </form>
    </>
  );
}

export default RegisterPopMission;
