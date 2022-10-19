import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddConstituentProcessModel from "./AddConstituentProcessModel";
import SelectPoPControl from "../../selectPoPControl/";
export default function DialogAddConstituentProcessModel({
  openDialogAddConstientProcessModel,
  setOpenDialogAddConstientProcessModel,
  allianceMembers,
  mission,
  pop_id,
  constituentProcessesJaCadastrados,
  adicionandoConstituentProcessModel,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenDialogAddConstientProcessModel(false);
  };

  return (
    <>
      <Dialog open={openDialogAddConstientProcessModel} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
          Add Constituent Process Model
        </DialogTitle>
        <DialogContent>
          <AddConstituentProcessModel
            handleClose={handleClose}
            allianceMembers={allianceMembers}
            mission={mission}
            adicionandoConstituentProcessModel={
              adicionandoConstituentProcessModel
            }
            pop_id={pop_id}
            constituentProcessesJaCadastrados={
              constituentProcessesJaCadastrados
            }
          ></AddConstituentProcessModel>
        </DialogContent>
      </Dialog>
    </>
  );
}
