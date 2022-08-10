import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchAllianceMember({
  filteredOrganizations,
  handleSearchFilter,
}) {
  const options = filteredOrganizations.map((option) => {
    return {
      Category: /[0-9]/.test(option.category.name)
        ? "0-9"
        : option.category.name,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.Category.localeCompare(a.Category))}
      groupBy={(option) => option.Category}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, value) => handleSearchFilter(value)}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      sx={{ width: "320px" }}
      renderInput={(params) => (
        <TextField {...params} label="Search" variant="standard" />
      )}
    />
  );
}
