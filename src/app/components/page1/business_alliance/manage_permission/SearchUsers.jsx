import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetUsersQuery } from "../../../../features/user/userApiSlice";
export default function SearchUsers({ handleChangeUserId }) {
  const { isSuccess, data } = useGetUsersQuery();

  function handleUserId(value) {
    

    handleChangeUserId(data.find((element) => element.name == value));
  }

  return (
    <>
      {isSuccess && (
        <Autocomplete
          id="combo-box-demo"
          options={data}
          getOptionLabel={(option) => option.name}
          onInputChange={(event, value) => handleUserId(value)}
          sx={{ width: "320px" }}
          renderInput={(params) => (
            <TextField {...params} label="Users" variant="standard" />
          )}
        />
      )}
    </>
  );
}
