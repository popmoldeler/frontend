import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import TextField from "@mui/material/TextField";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


function ResponsiveDateTimePickers({ handleSetDate }) {
  const [value, setValue] = React.useState();

  const handleChange = (newValue) => {
    setValue(newValue);
    handleSetDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Entry Date"
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField variant="standard" sx={{ width: "18ch" }} {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

function Members({ value, handleToggle, checked, handleSetEntryDate }) {
  const relations = [
    { id: 1, name: "Merge" },
    { id: 2, name: "Acquisition" },
    { id: 3, name: "Partnership" },
  ];
  const [alliance_member_id] = React.useState(value.id);
  const [relation, setRelation] = React.useState("");
  const [entryDate, setEntryDate] = React.useState(new Date());

  // function handle(date) {
  //   setEntryDate(date);
  // }
  React.useEffect(() => {
    handleSetEntryDate(alliance_member_id, entryDate, relation);
  }, [entryDate, relation, alliance_member_id]);

  function handleSetDate(date) {
    // console.log(date.toLocaleDateString('en'));
    if (date !== null) {
      setEntryDate(date);
    }
  }
  return (
    <ListItem
      key={value.cnpj}
      role="listitem"
      sx={{
        display: "block",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: " space-between",
        }}
      >
        <Checkbox
          checked={checked.indexOf(value) !== -1}
          onClick={handleToggle(value)}
          tabIndex={-1}
          disableRipple
        />

        <ListItemText
          sx={{ alignSelf: " center" }}
          primary={value.name}
        ></ListItemText>

        <ResponsiveDateTimePickers
          handleSetDate={handleSetDate}
        ></ResponsiveDateTimePickers>
      
        <TextField
          id="standard-basic"
          sx={{ m: 1, minWidth: 130, bottom: 8 }}
          variant="standard"
          select
          label="Relationship"
          defaultValue=""
          onChange={(e) =>
            // setHandleRelation(e.target.value, value.razaoSocial)
            setRelation(e.target.value)
          }
        >
          {relations.map((option) => (
            <MenuItem value={option.name} key={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </ListItem>
  );
}

export default function BusinessAllianceTransferList({
  left,
  handleAllRight,
  handleCheckedRight,
  handleCheckedLeft,
  handleAllLeft,
  handleToggle,
  right,
  checked,
  leftChecked,
  rightChecked,

  entryDate,
  handleSetEntryDate,
}) {
  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        style={{ textAlign: "center", marginTop: 5, marginBottom: 0 }}
      >
        Members
      </Typography>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value.cnpj}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  const customList2 = (items) => (
    <Paper sx={{ width: 500, height: 230, overflow: "auto" }}>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        style={{ textAlign: "center", marginTop: 5, marginBottom: 0 }}
      >
        Internal Collaboration
      </Typography>
      <List dense component="div" role="list">
        {items.map((value) => (
          <Members
            key={value.cnpj}
            value={value}
            handleToggle={handleToggle}
            checked={checked}
            entryDate={entryDate}
            handleSetEntryDate={handleSetEntryDate}
          />
        ))}
      </List>
    </Paper>
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignitem="center"
        sx={{ marginTop: "1px" }}
      >
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList2(right)}</Grid>
        {/* <Grid > <CustomList2 item={right}></CustomList2></Grid> */}
      </Grid>
    </>
  );
}
