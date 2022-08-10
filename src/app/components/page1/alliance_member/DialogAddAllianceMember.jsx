import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Box} from "@mui/material";
import AddAllianceMember from "./AddAllianceMember";

export default function DialogAddAllianceMember() {
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
          <AddCircleIcon titleAccess={"Add Member"} color={"primary"} />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center" }}>
          Register Alliance Member
        </DialogTitle>
        <DialogContent>
          <AddAllianceMember
            handleClose={handleClose}
          ></AddAllianceMember>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
