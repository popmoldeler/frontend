import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ManagePermission from "./ManagePermission";

export default function DialogManagePermission({
  openDialog,
  setOpenDialogPermission,
  BusinessAlliance,
}) {
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenDialogPermission(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
          Manage Permission
        </DialogTitle>
        <DialogContent>
          <ManagePermission
            handleClose={handleClose}
            BusinessAlliance={BusinessAlliance}
          ></ManagePermission>
        </DialogContent>
      </Dialog>
    </>
  );
}
