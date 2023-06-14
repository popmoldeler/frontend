import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useFormik } from "formik";

export default function DialogAddVariabilityConstraintsMissionModel({
  popDetailedModelId,
  updateFile,
  nameVariabilityButton,
  setNameVariabilityButton,
  
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
      variability_constraints_model: "",
      id: "",
    },
    onSubmit: async (values) => {
      updateFile(values);
      console.log(values);
      setNameVariabilityButton("Update");
      handleClose();
    },
  });

  {
    nameVariabilityButton === "add"
      ? (formik.initialValues.variability_constraints_model = "")
      : (formik.initialValues.variability_constraints_model =
          nameVariabilityButton);
  }
  formik.initialValues.id = popDetailedModelId;

  return (
    <Box>
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
          {nameVariabilityButton === "add"
            ? "Add Variability Constraints Model"
            : "Update Variability Constraints Model"}
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center" }}>
          Variability Constraints Model
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
                label=" Add Variability Constraints Model"
                variant="standard"
                multiline
                rows={6}
                id="variability_constraints_model"
                name="variability_constraints_model"
                sx={{ width: "400px" }}
                value={formik.values.variability_constraints_model}
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
