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
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";
// import { useBusinessProcessModelQuery } from "../../services/AlliancesApi";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TranferListRegisterConstituintProcess({
  organizations,
  setOrganizations,
}) {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);

  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, organizations);
  const rightChecked = intersection(checked, right);

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

  const handleAllRight = () => {
    setRight(right.concat(organizations));
    setOrganizations([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setOrganizations(not(organizations, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setOrganizations(organizations.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setOrganizations(organizations.concat(right));
    setRight([]);
  };

  const customList = (organizations) => (
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
        Business Process Model
      </Typography>

      {organizations.map((value) => {
        const labelId = `transfer-list-item-${value}-label`;

        return (
          <List
            dense
            component="div"
            role="list"
            key={value.id}
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                key={value.id}
              >
                {value.organization.name}
              </ListSubheader>
            }
          >
            {value.organization.bpm.map((bpm) => {
              return bpm.file.map((file) => {
                const labelId = `transfer-list-item-${bpm}-label`;
                return (
                  <List dense component="div" role="list" key={file.id}>
                    <ListItem
                      key={bpm.id}
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
                      <ListItemText id={labelId} primary={file.file} />
                    </ListItem>
                  </List>
                );
              });
            })}
            <ListItem />
          </List>
        );
      })}
    </Paper>
  );

  const customList2 = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return bpm.file.map((file) => {
            return (
              <ListItem
                key={file.id}
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
                <ListItemText id={labelId} primary={file.file} />
              </ListItem>
            );
          });
        })}
        <ListItem />
      </List>
    </Paper>
  );
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 1 }}
    >
      <Grid item>{customList(organizations)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={organizations.length === 0}
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
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
