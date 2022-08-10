import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import AddExternalCollaboration from "./AddExternalCollaboration";

export default function DialogAddInternalCollaboration({
  openDialog,
  setOpenDialogExternal,
  BusinessAlliance,
}) {
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenDialogExternal(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
          Add External Collaboration
        </DialogTitle>
        <DialogContent>
          <AddExternalCollaboration
            handleClose={handleClose}
            BusinessAlliance={BusinessAlliance}
          ></AddExternalCollaboration>
        </DialogContent>
      </Dialog>
    </>
  );
}
