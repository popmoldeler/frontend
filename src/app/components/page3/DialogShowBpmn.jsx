import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/material";
import AddBpmn from "./AddBpmn";
import { Button } from "@mui/material";
import DialogOverallVIewOutOfDate from "./DialogOverallVIewOutOfDate";

export default function DialogShowBpmn({
  handleSetXmlString,
  setPopMissionId,
  setPopId,
  setSaveOrUpdataOverallView,
  setOverallViewId,
  openDialogOutOfDate,
  setOpenDialogOutOfDate,
  saveFile,
  updateFile,
  setNameConstraintsButton,
}) {
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
        <Button variant="outlined" onClick={handleClickOpen}>
          PoP Overall Model
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center" }}>
          PoP Overall Model
        </DialogTitle>
        <DialogContent>
          <AddBpmn
            updateFile={updateFile}
            handleClose={handleClose}
            handleSetXmlString={handleSetXmlString}
            setPopMissionId={setPopMissionId}
            setPopId={setPopId}
            setSaveOrUpdataOverallView={setSaveOrUpdataOverallView}
            setOverallViewId={setOverallViewId}
            openDialogOutOfDate={openDialogOutOfDate}
            setOpenDialogOutOfDate={setOpenDialogOutOfDate}
            saveFile={saveFile}
            setNameConstraintsButton={setNameConstraintsButton}
          ></AddBpmn>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
