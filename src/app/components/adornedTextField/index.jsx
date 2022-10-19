import React from "react";
// import { SearchContainer, Close, TextField, InputAdornment, IconButton } from './styles';

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import TextField from "@mui/material/TextField";

import { Close } from "@mui/icons-material";

function AdornedTextField({

  className,
  adornment,
  clickableAdornment,
  onAdornmentClick,
  withClear,
  onClear,
  value,
  ...props
}) {
  const inputConfig =
    value && withClear
      ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => onClear(...arguments)}>
                <Close
                  sx={{ width: "25px", height: "25px", fill: "#808080" }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }
      : {
          endAdornment: (
            <InputAdornment position="end">
              {/* <SearchContainer sx={{ padding: "12px" }}> */}
                {clickableAdornment ? (
                  <IconButton
                  sx={{ padding: "12px" }}
                    onClick={() => onAdornmentClick(...arguments)}
                    disabled={props.disabled}
                  >
                    {adornment}
                  </IconButton>
                ) : (
                  adornment
                )}
              {/* </SearchContainer> */}
            </InputAdornment>
          ),
        };
  return (
    <TextField
      
      sx={{ width: "100%" }}
      className={className}
      value={value}
      InputProps={inputConfig}
      {...props}
    />
  );
}

export default AdornedTextField;
