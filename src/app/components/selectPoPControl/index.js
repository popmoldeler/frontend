/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";

import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  AddBox,
  FormHelperText,
} from "./styles";
import { isEmpty } from "lodash";
import { Hidden } from "@material-ui/core";
import AdornedTextField from "../adornedTextField";

const SelectPoPControl = ({
  data,
  className,
  id,
  enabled,
  uischema,
  schema,
  path,
  label,
  handleChange,
  onSuccess,
  config,
  errors,
  visible,
  disabled,
  required,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selectedPoP, setSelectedPoP] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // endpoint para consultar e carregar os dados para montar o componente de tabela
  }, [rowsPerPage, page, orderBy, searchBy]);

  useEffect(() => {
    if (data) {
      //findById do PoP ja selecionado para persistência em alterações
    } else {
      setSelectedPoP({});
    }
  }, [data]);

  return (
    <Hidden xsUp={!visible}>
      <Container>
        <AdornedTextField
          disabled={!enabled}
          error={!isEmpty(errors)}
          adornment={<AddBox />}
          clickableAdornment
          onAdornmentClick={handleClickOpen}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={handleClickOpen}
          label={label ?? "Fornecedor"}
          InputLabelProps={{
            readOnly: true,
          }}
          required={required}
          value={selectedPoP.name /* name do PoP selecionado*/}
          helperText={
            !isEmpty(errors) ? (
              <FormHelperText error>{`${errors}`}</FormHelperText>
            ) : (
              ""
            )
          }
        />

        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogContent>{/* COMPONENTE DE TABELA PARA LISTAR*/}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Hidden>
  );
};

export default SelectPoPControl;
