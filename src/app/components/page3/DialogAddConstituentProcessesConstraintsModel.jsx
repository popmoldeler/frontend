import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Grid, TextField } from "@mui/material";
import AddBpmn from "./AddBpmn";
import { Button } from "@mui/material";
import { useFormik } from "formik";

export default function DialogAddConstituentProcessesConstraintsModel({
  overallViewId,
  updateFile,
  nameConstraintsButton,
  setNameConstraintsButton,
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
      constituent_processes_constraints_model: "",
      id: "",
    },
    onSubmit: async (values) => {
      console.log("mission", values);
      updateFile(values);

      setNameConstraintsButton("Update");
      handleClose();
    },
  });

  {
    nameConstraintsButton === "add"
      ? (formik.initialValues.constituent_processes_constraints_model = "")
      : (formik.initialValues.constituent_processes_constraints_model =
          nameConstraintsButton);
  }
  formik.initialValues.id = overallViewId;

  return (
    <Box>
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
          {nameConstraintsButton === "add"
            ? "Add Constituent Processes Constraints Model"
            : "Update Constituent Processes Constraints Model"}
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center" }}>
          Constituent Processes Constraints Model
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
                label=" Add Constituent Processes Constraints Model"
                variant="standard"
                multiline
                rows={6}
                id="constituent_processes_constraints_model"
                name="constituent_processes_constraints_model"
                sx={{ width: "400px" }}
                value={formik.values.constituent_processes_constraints_model}
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
