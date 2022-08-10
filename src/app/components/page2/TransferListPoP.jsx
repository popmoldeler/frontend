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
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({ right, setRight }) {
  const [checked, setChecked] = React.useState([]);
  const [tittle, setTittle] = React.useState("");

  const [description, setDescription] = React.useState("");

  const [left, setLeft] = React.useState([0, 1, 2]);

  const rightChecked = intersection(checked, right);

  const [isPublic, setIsPublic] = React.useState(false);

  const handlePublic = (event) => {
    setIsPublic(!isPublic);
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    const mission = {
      tittle: tittle,
      description: description,
      status: true,
      pop_id: "",
    };
    setRight(right.concat(mission));
    setTittle("");
    setDescription("");
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = () => (
    <Paper
      sx={{
        width: 300,
        height: 250,
        overflow: "auto",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        style={{ textAlign: "center", marginTop: 5, marginBottom: 0 }}
      >
        PoP Missions
      </Typography>

      <TextField
        id="standard-basic"
        label="Mission Tittle"
        variant="standard"
        value={tittle}
        onChange={(e) => setTittle(e.target.value)}
      />
      <TextField
        id="standard-multiline-static"
        label="Mission Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="standard"
      />

      <Button
        sx={{ my: 0.5 }}
        variant="outlined"
        size="small"
        onClick={handleCheckedRight}
      >
        Add
      </Button>
    </Paper>
  );
  const customList2 = (items) => (
    <Paper
      sx={{
        width: 300,
        height: 250,

        overflow: "auto",
      }}
    >
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label` + Math.random();

          return (
            <ListItem
              key={labelId}
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
              <ListItemText id={labelId} primary={`${value.tittle}`} />
              <ListItemText id={labelId} primary={`${value.description}`} />
            </ListItem>
          );
        })}
        <ListItem />
        <Grid
          item
          display={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Grid container alignItems="center" justifyContent={"space-evenly"}>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              Delete
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              Delete All
            </Button>
          </Grid>
        </Grid>
      </List>
    </Paper>  
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      // alignItems="center"
      wrap='nowrap'
      // sx={{ display: "flex" }}
    >
      <Grid item>{customList(left)}</Grid>

      <Grid item>{customList2(right)}</Grid>
    </Grid>
  );
}
