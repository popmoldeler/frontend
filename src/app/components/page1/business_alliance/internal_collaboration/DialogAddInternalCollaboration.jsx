import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddInternalCollaboration from "./AddInternalCollaboration";
export default function DialogAddInternalCollaboration({
  openDialog,
  setOpenDialogInternal,
  BusinessAlliance,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenDialogInternal(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
          Add Internal Collaboration
        </DialogTitle>
        <DialogContent>
          <AddInternalCollaboration
            handleClose={handleClose}
            BusinessAlliance={BusinessAlliance}
          ></AddInternalCollaboration>
        </DialogContent>
      </Dialog>
    </>
  );
}
