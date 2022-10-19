import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddMission from "./AddMission";
export default function DialogAddMission({
  openDialogAdd,
  setOpenDialogAdd,
  BusinessAlliance,
  
  id
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenDialogAdd(false);
  };

  return (
    <>
      <Dialog open={openDialogAdd} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
          Add Mission
        </DialogTitle>
        <DialogContent>
          <AddMission
            handleClose={handleClose}
            BusinessAlliance={BusinessAlliance}
            id={id}
          ></AddMission>
        </DialogContent>
      </Dialog>
    </>
  );
}
