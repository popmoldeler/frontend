import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function MenuMission({ editando, deletando,adicionandoConstituentProcessModel,adicionandoPopAsConstituentProcessModel, extractInteroperabilityRequirements, extractReliabilityRequirements, extractReliabilityRequirementsEnglish}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}

        // onBlur={handleClickBlur}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={adicionandoConstituentProcessModel} >Add Constituent Process</MenuItem>
        <MenuItem onClick={adicionandoPopAsConstituentProcessModel}>Add PoP as Constituent Process</MenuItem>
        <MenuItem onClick={extractInteroperabilityRequirements}>Extract Interoperability Requirements</MenuItem>
        <MenuItem onClick={extractReliabilityRequirements}>Extract Fault Tolerance Requirements</MenuItem>
        <MenuItem onClick={editando}>Update</MenuItem>
        <MenuItem onClick={deletando}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
