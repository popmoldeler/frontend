import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { useFormik } from "formik";
import {
  useGetAllianceMemberQuery,
  useDeleteBusinessProcessModelMutation,
  useUpdateBusinessProcessModelMutation
} from "../../../features/alliance_member/allianceMemberApiSlice";
// import { useGetConstituentProcessQuery } from "../../../features/constituent_process/constituenProcessApiSlice";
import DialogAddBusinessProcessModel from "./DialogAddBusinessProcessModel";
import MenuBusinesProcessModel from "./MenuBusinesProcessModel";

export default function ShowBusinessProcessModel() {
  const { isLoading, isSuccess, isError, error, data } =
    useGetAllianceMemberQuery();
  let content;

  if (isLoading) {
    content = [
      {
        category_id: 0,
        category: { id: 0 },

        city: "Loading",
        cnpj: "Loading",
        country: "Loading",
        id: 1,
        name: "Loading",
        neighborhood: "Loading",
        number: "Loading",
        site: "Loading",
        state: "Loading",
        street: "Loading",
        zip_code: "Loading",
        constituent_process: [],
      },
    ];
  } else if (isSuccess) {
    content = data;
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <TableContainer
      sx={{ margin: 1, width: "100%", height: "91%" }}
      component={Paper}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "98%",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            paddingLeft: "16px",
            marginTop: "16px",
          }}
        >
          Alliance Members
        </Typography>
      </Box>

      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Menu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => (
            <Row row={row} key={row.cnpj} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  // console.log(row)
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="left">{row.name}</TableCell>

        <TableCell align="left">{row.category.name}</TableCell>
        <TableCell align="left">
          <DialogAddBusinessProcessModel id={row.id} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    paddingLeft: "16px",
                    marginTop: "16px",
                  }}
                >
                  Busines Process Models
                </Typography>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Owner</TableCell>
                  <TableCell align="left">Menu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.constituent_process.map((constituent_process) => (
                  <ConstituenProcess
                    key={constituent_process.name}
                    row={constituent_process}
                  />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function ConstituenProcess(props) {
  const { row } = props;

  const [edit, setEdit] = React.useState(false);
  const [delet, setDelet] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  // console.log(row);
  const [deleteBusinessProcessModel] = useDeleteBusinessProcessModelMutation();
  const [updateBusinessProcessModel] = useUpdateBusinessProcessModelMutation();
  function handleClickDeleteProcessModel(params) {
    console.log(row);

    deleteBusinessProcessModel(row.id);
  }

  const deletando = () => {
    setDelet(!delet);
    setEdit(false);
  };
  const editando = () => {
    setEdit(!edit);
    setDelet(false);
  };
  const formik = useFormik({
    initialValues: {
      name: row.name,
      description: row.description,
      id: row.id,
    },
    onSubmit: async (values) => {
      console.log(values);
      updateBusinessProcessModel(values);
      formik.resetForm();
    },
  });
  function handleUpdateOrDelete(e) {
    if (edit) {
      formik.handleSubmit();
      editando();
    }
    if (delet) {
      handleClickDeleteProcessModel(e);
      deletando();
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">
          {edit ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="name"
                name="name"
                label="Name"
                variant="standard"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.name
          )}
        </TableCell>
        <TableCell align="left">
          {edit ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="description"
                name="description"
                label="Description"
                variant="standard"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.description
          )}
        </TableCell>
        <TableCell align="left">{row.users.name}</TableCell>
        <TableCell align="left">
          {edit || delet ? (
            <>
              <form onSubmit={formik.handleSubmit}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleUpdateOrDelete}
                >
                  <CheckIcon></CheckIcon>
                </IconButton>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={() => {
                    if (delet === true) {
                      deletando();
                    } else {
                      editando();
                    }
                  }} //fecha menu
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </form>
            </>
          ) : (
            <MenuBusinesProcessModel
              editando={editando}
              deletando={deletando}

              // canDelete={mission.pop_missions.length > 0 ? true : false}
            ></MenuBusinesProcessModel>
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
