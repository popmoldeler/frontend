import styled from "styled-components";
import MaterialTextField from "@material-ui/core/TextField";
import { Close as MaterialClose } from "@styled-icons/material";
import MaterialInputAdornment from "@material-ui/core/InputAdornment";
import MaterialIconButton from "@material-ui/core/IconButton";

export const TextField = styled(MaterialTextField)`
  width: 100%;
`;
export const SearchContainer = styled.div`
  padding: 12px;
`;
export const Close = styled(MaterialClose)`
  width: 25px;
  height: 25px;
  fill: #808080;
`;

export const InputAdornment = styled(MaterialInputAdornment)``;

export const IconButton = styled(MaterialIconButton)`
  padding: 0px !important;
`;
