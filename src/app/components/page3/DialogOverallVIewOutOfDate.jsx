import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@mui/material";




export default function DialogOverallVIewOutOfDate({ openDialogOutOfDate, setOpenDialogOutOfDate }) {
  const handleClose = () => {

    setOpenDialogOutOfDate(false);
  };


  return (
    <div>
      <Dialog open={openDialogOutOfDate} onClose={handleClose}>


        <DialogContent>
          <DialogTitle>
            Your PoP Overall Model is out of date
          </DialogTitle>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>

        </DialogActions>

      </Dialog>
    </div >
  );
}
