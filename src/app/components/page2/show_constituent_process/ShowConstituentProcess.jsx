import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TranferListRegisterConstituintProcess from "../TranferListRegisterConstituentProcess";

export default function ShowConstituintProcess({
  penRegisterConstituintProcess,
  setOpenRegisterConstituintProcess,
}) {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      alliance: "",
      pops: "",
      popsMission: "",
    },
    onSubmit: async (values) => {},
  });

  function handleCloseClick() {
    setOpenRegisterConstituintProcess();
  }

  // const alliance = useAlliancesQuery();

  const [pops, setPops] = React.useState([]);
  const [missions, setMissions] = React.useState([]);
  const [organizations, setOrganizations] = React.useState([]);

  function handleAlliance(e) {
    setPops([]);
    setOrganizations([]);

    setMissions([]);

    // const resp = filterItems(e.target.value, alliance.data);
    // resp.map((pop) => {
    //   setOrganizations(pop.alliance_members);
    //   setPops([pop.pops]);

    //   //   setPops([...pops, pop.pops]);
    // });
  }
  function handlePop(e) {
    setMissions([]);

    const resp = filterItems(e.target.value, pops);
    resp.map((pop) => {
      // setMissions([...missions, pop.pops]);
      setMissions(pop.popmissions);

      console.log(pop.popmissions);
      // setMissions( [pop.pops]);
    });
  }

  function filterItems(query, set) {
    const resp = set.filter(function (el) {
      return el.id === query;
    });
    return resp;
  }
  if (formik.values.alliance === "") {
    formik.values.pops = "";
    formik.values.popsMission = "";
  }
  if (formik.values.pops === "") {
    formik.values.popsMission = "";
  }
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          justifyContent: "space-around",
          m: 1,
          width: 750,
          height: 625,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1" gutterBottom component="div">
            Register Constituent Process
          </Typography>

         
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "30ch" }}
              id="name"
              name="name"
              label="Name"
              variant="standard"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField
              sx={{ width: "30ch" }}
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              variant="standard"
              onChange={formik.handleChange}
            />

            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="alliance">Alliance</InputLabel>
              <Select
                sx={{ width: "27ch" }}
                labelId="demo-simple-select-standard-label"
                id="alliance"
                name="alliance"
                value={formik.values.alliance}
                onChange={(e) => {
                  handleAlliance(e);
                  formik.handleChange(e);
                }}
                label="Alliance"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {/* {alliance.data.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="pops">PoPs</InputLabel>
              <Select
                sx={{ width: "27ch" }}
                labelId="demo-simple-select-standard-label"
                id="pops"
                name="pops"
                value={formik.values.pops}
                onChange={(e) => {
                  handlePop(e);
                  formik.handleChange(e);
                }}
                label="Pops"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {pops.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="pops">PoPs Missions</InputLabel>
              <Select
                sx={{ width: "27ch" }}
                labelId="demo-simple-select-standard-label"
                id="popsMission"
                name="popsMission"
                value={formik.values.popsMission}
                onChange={(e) => {
                  // handlePop(e);
                  formik.handleChange(e);
                }}
                label="Pops Missions"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {missions.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TranferListRegisterConstituintProcess
              organizations={organizations}
              setOrganizations={setOrganizations}
            ></TranferListRegisterConstituintProcess>
            <Button
              sx={{ m: 1, width: "30ch" }}
              color="primary"
              variant="outlined"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
}
