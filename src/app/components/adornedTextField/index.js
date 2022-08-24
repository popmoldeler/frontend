import React from 'react';
import { SearchContainer, Close, TextField, InputAdornment, IconButton } from './styles';

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
                <Close />
              </IconButton>
            </InputAdornment>
          ),
        }
      : {
          endAdornment: (
            <InputAdornment position="end">
              <SearchContainer>
                {clickableAdornment ? (
                  <IconButton
                    onClick={() => onAdornmentClick(...arguments)}
                    disabled={props.disabled}
                  >
                    {adornment}
                  </IconButton>
                ) : (
                  adornment
                )}
              </SearchContainer>
            </InputAdornment>
          ),
        };
  return (
    <TextField
      className={className}
      value={value}
      InputProps={inputConfig}
      {...props}
    />
  );
}

export default AdornedTextField;
