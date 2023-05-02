import React from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useFormik } from "formik";

import { useAddMissionProcessMutation } from "../../../features/business_alliance/bussinesAllianceApiSlice";

import SelectPopControl from "../../selectPoPControl/SelectPopControl";
import { useUpdateOverallViewMutation } from "../../../features/overall_view/overallViewApiSlice";
function AddPopAsConstituentProcessModel({
  openRegisterPopMission,
  setOpenRegisterPopMission,
  mission,
  handleClose,
  allianceMembers,
  popExternalCollaboration,
  adicionandoConstituentProcessModel,
  constituentProcessesJaCadastrados,
  missionProcesses,
  popOverall,
  pop,
}) {
  const [membro, setMembro] = React.useState([]);
  const [addMissionProcess] = useAddMissionProcessMutation();
  const [pop_id, setPop_id] = React.useState(null);
  const [updateOverallView] = useUpdateOverallViewMutation();

  const formik = useFormik({
    initialValues: {
      pop_mission_id: mission,
 
      pop_id: pop_id,
      entry_date: new Date(),
      exit_date: new Date(),
    },
    onSubmit: async (values) => {
      addMissionProcess(values);
     
      adicionandoConstituentProcessModel();
      if (popOverall.overall_view != null) {
        // console.log(popOverall);

        const overallView = { id: popOverall.overall_view.id, updated: 'false' }
        updateOverallView(overallView);
      }
      formik.resetForm();
    },
  });

  const handleConstituentId = (id) => {
    formik.values.constituent_process_id = id;
  };
  const handlePopId = (id) => {
    formik.values.pop_id = id;
  };

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
         
          <SelectPopControl pop={pop} handlePopId={handlePopId} popExternalCollaboration={popExternalCollaboration} missionProcesses={missionProcesses}/> 

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

export default AddPopAsConstituentProcessModel;
