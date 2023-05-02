import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddPopAsConstituentProcessModel from "./AddPopAsConstituentProcessModel";
import SelectPoPControl from "../../selectPoPControl/";

export default function DialogAddPoPAsConstituentProcessModel({
  openDialogAddPopAsConstientProcessModel,
  setOpenDialogAddPopAsConstientProcessModel,
  allianceMembers,
  mission,
  pop_id,
  constituentProcessesJaCadastrados,
  adicionandoConstituentProcessModel,
  pop,
  popExternalCollaboration,
  popOverall,

  missionProcesses,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenDialogAddPopAsConstientProcessModel(false);
  };

  return (
    <>
      <Dialog open={openDialogAddPopAsConstientProcessModel} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
          Add PoP as Constituent Process Model
        </DialogTitle>
        <DialogContent>
          <AddPopAsConstituentProcessModel
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
            pop={pop}
            popExternalCollaboration={popExternalCollaboration}
            missionProcesses={missionProcesses}
            popOverall={popOverall}

          ></AddPopAsConstituentProcessModel>
        </DialogContent>
      </Dialog>
    </>
  );
}
