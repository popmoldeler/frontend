/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";

// import {
//   Container,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   AddBox,
//   FormHelperText,
// } from "./styles";

import FormHelperText from "@mui/material/FormHelperText";
import Container from "@mui/material/Container";
import AdornedTextField from "../adornedTextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";

import SelectPopAsConstituentControl from "./SelectPopAsConstituentControl";

const SelectPopControl = ({
  constituent_process_id,
  required,
  constituentProcess,
  constituentProcessesJaCadastrados,
  pop,
  handlePopId,
  popExternalCollaboration,
  missionProcesses,
}) => {
  const [open, setOpen] = useState(false);
  const [constituent, setConstituent] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // <Hidden xsUp={!visible}>
    <Container
      sx={{
        display: { xs: "none", md: "block" },
        // display: flex;
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%,",
      }}
    >
      <AdornedTextField
        error={!true}
        adornment={
          <AddBoxIcon
            sx={{ width: " 25px", height: "25px", fill: "#808080," }}
          />
        }
        clickableAdornment
        onAdornmentClick={handleClickOpen}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={handleClickOpen}
        label={"Pop"}
        InputLabelProps={{
          readOnly: true,
        }}
        required={required}
        value={constituent.name ?? "" /* name do PoP selecionado*/}
        helperText={
          !true ? <FormHelperText error>{`${errors}`}</FormHelperText> : ""
        }
      />

      <Dialog
        disablebackdropclick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogContent
          sx={{
            margin: "0px !important",
            padding: "0px !important",
            display: "flex",
            justifyContent: "center",
            // flexDirection: "column",
            // alignItens: "center",
          }}
        >
          <SelectPopAsConstituentControl
            handleClose={handleClose}
            onSuccess={(constituent) => {
              handlePopId(constituent.id);
              setConstituent(constituent);
            }}
            popExternalCollaboration={popExternalCollaboration}
            missionProcesses={missionProcesses}
            // constituentProcess={constituentProcess}
            // constituent_process_id={constituent_process_id}
            // constituentProcessesJaCadastrados={
            //   constituentProcessesJaCadastrados
            // }
            pop={pop}
          ></SelectPopAsConstituentControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SelectPopControl;
