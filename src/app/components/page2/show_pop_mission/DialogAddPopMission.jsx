import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import AddPopMission from "./AddPopMission";

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
        aria-label="Add PoP Mission"
        style={{ left: 25 }}
        onClick={handleClickOpen}
      >
        <AddCircleIcon
          titleAccess={"Add PoP Mission"}
          color={"primary"}
        />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle sx={{ alignSelf: "center" }}>
          Add PoP
        </DialogTitle>
        <DialogContent >
          <AddPopMission
            id={id}
            handleClose={handleClose}
          ></AddPopMission>
        </DialogContent>
      </Dialog>
    </div>
  );
}
