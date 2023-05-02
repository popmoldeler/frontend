import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/material";
import AddBpmn from "./AddBpmn";
import { Button } from "@mui/material";
import DialogOverallVIewOutOfDate from "./DialogOverallVIewOutOfDate";
import DialogActions from "@mui/material/DialogActions";


export default function DialogShowIsBlocked({
  openIsBlocked,
  setOpenIsBlocked,
  blocker
}) {


  if (blocker.state === "blocked") {
    return (

      <>
        <Dialog open={openIsBlocked} >
          <DialogContent>

            <DialogTitle sx={{ alignSelf: "center" }}>Changes that you made may not be saved! </DialogTitle>
          </DialogContent>
          <DialogActions>
            <Box>

              <Button
                variant="outlined"
                onClick={() => blocker.reset?.()}

              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={() => blocker.proceed?.()}
              >
                Leave
              </Button>

            </Box>
          </DialogActions >
        </Dialog >
      </>


    );

  }


}



