import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import AddBusinesProcessModel from "./AddBusinesProcessModel";

export default function DialogAddBusinessProcessModel({id}) {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="Add Business Process Model"
        style={{ left: 25 }}
        onClick={handleClickOpen}
      >
        <AddCircleIcon
          titleAccess={"Add Business Process Model"}
          color={"primary"}
        />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center" }}>
          Add Business Process Model
        </DialogTitle>
        <DialogContent>
          <AddBusinesProcessModel
            id={id}
            handleClose={handleClose}
          ></AddBusinesProcessModel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
