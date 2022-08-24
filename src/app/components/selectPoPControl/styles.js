import styled from "styled-components";
import MaterialSelect from "@material-ui/core/Select";
import MaterialButton from "@material-ui/core/Button";
import MaterialDialog from "@material-ui/core/Dialog";
import MaterialDialogActions from "@material-ui/core/DialogActions";
import MaterialDialogContent from "@material-ui/core/DialogContent";
import MaterialFormHelperText from "@material-ui/core/FormHelperText";
import { AddBox as MaterialAddBox } from "@styled-icons/material";

export const Select = styled(MaterialSelect)``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const FormHelperText = styled(MaterialFormHelperText)``;

export const Button = styled(MaterialButton)``;

export const Dialog = styled(MaterialDialog)``;

export const DialogActions = styled(MaterialDialogActions)``;

export const DialogContent = styled(MaterialDialogContent)`
  margin: 0px !important;
  padding: 0px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AddBox = styled(MaterialAddBox)`
  width: 25px;
  height: 25px;
  fill: #808080;
`;
