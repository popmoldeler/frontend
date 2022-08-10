import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Box} from "@mui/material";

import AddBusinessAlliance from './AddBusinessAlliance'

export default function DialogAddBusinessAlliance() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box>
        <IconButton
          aria-label="Add Member"
          style={{ left: 25 }}
          onClick={handleClickOpen}
        >
          <AddCircleIcon
            titleAccess={"Add Business Alliance"}
            color={"primary"}
          />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
          Register Business Alliance
        </DialogTitle>
        <DialogContent>
          <AddBusinessAlliance
            handleClose={handleClose}
          ></AddBusinessAlliance>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
