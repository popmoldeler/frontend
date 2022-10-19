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

import SelectAllianceMember from "./SelectAllianceMember";

const SelectPoPControl = ({
  setMembro,
  allianceMembers,

  data,
  hide
}) => {
  const [open, setOpen] = useState(false);
  const [selectedPoP, setSelectedPoP] = useState({});
  const [allianceMember, setAllianceMember] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   // endpoint para consultar e carregar os dados para montar o componente de tabela
  // }, [rowsPerPage, page, orderBy, searchBy]);

  useEffect(() => {
    if (data) {
      //findById do PoP ja selecionado para persistência em alterações
    } else {
      setSelectedPoP({});
    }
  }, [data]);

  
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
     
        disabled={!true}
        error={!true}
        adornment={
          <AddBoxIcon
            sx={{ width: " 25px", height: "25px", fill: "#808080,", }}
          />
        }
        clickableAdornment
        
        onAdornmentClick={handleClickOpen}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={handleClickOpen}
        label={"Alliance Member"}
        InputLabelProps={{
          readOnly: true,
        }}
        // required={required}
        value={allianceMember.name?? "" /* name do PoP selecionado*/}
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
          <SelectAllianceMember
            handleClose={handleClose}
            onSuccess={(allianceMember) => {
              setAllianceMember(allianceMember);
              setMembro(allianceMember.constituent_process)
            }}
            
            allianceMembers={allianceMembers}
          ></SelectAllianceMember>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'center'}}>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Back
          </Button>
         
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SelectPoPControl;
