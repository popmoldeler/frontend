import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useFormik } from "formik";

export default function DialogAddPopMissionsConstraintsMissionModel({
  popMissionModelId,
  updateFile,
  nameConstraintsButton,
  setNameConstraintsButton,
  setPopMissionConstraints,
  popMissionConstraints,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      pop_missions_constraints_model: "",
      id: "",
    },
    onSubmit: async (values) => {
      updateFile(values);
      console.log(values);
      setNameConstraintsButton("Update");
      handleClose();
    },
  });

  {
    nameConstraintsButton === "add"
      ? (popMissionConstraints = "")
      : (formik.initialValues.pop_missions_constraints_model =
          nameConstraintsButton);
  }
  formik.initialValues.id = popMissionModelId;
  // formik.initialValues.pop_missions_constraints_model = popMissionConstraints;

  return (
    <Box>
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
          {nameConstraintsButton === "add"
            ? "Add PoP Missions Constraints Model"
            : "Update PoP Missions Constraints Model"}
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center" }}>
          PoP Missions Constraints Model
        </DialogTitle>
        <DialogContent>
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
                label="Add PoP Missions Constraints Model"
                variant="standard"
                multiline
                rows={6}
                id="pop_missions_constraints_model"
                name="pop_missions_constraints_model"
                sx={{ width: "400px" }}
                value={formik.values.pop_missions_constraints_model}
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
        </DialogContent>
      </Dialog>
    </Box>
  );
}
