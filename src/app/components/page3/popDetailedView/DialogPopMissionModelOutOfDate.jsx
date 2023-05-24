import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@mui/material";




export default function DialogPopMissionModelOutOfDate({ openDialogPopMissionModelOutOfDate, setOpenDialogPopMissionModelOutOfDate }) {
  const handleClose = () => {

    setOpenDialogPopMissionModelOutOfDate(false);
  };


  return (
    <div>
      <Dialog open={openDialogPopMissionModelOutOfDate} onClose={handleClose}>


        <DialogContent>
          <DialogTitle>
            Your PoP Mission Model is out of date
          </DialogTitle>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>

        </DialogActions>

      </Dialog>
    </div >
  );
}
