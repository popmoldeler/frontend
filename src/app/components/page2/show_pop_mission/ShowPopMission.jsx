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

import {
  useGetBusinessAlliancesQuery,
  useUpdatePopMutation,
  useUpdatePopMissionMutation,
  useDeletePopMissionMutation,
  useDeletePopMutation,
} from "../../../features/business_alliance/bussinesAllianceApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../features/auth/authSlice";
import { useFormik } from "formik";

import DialogAddMission from "./DialogAddMission";
import DialogAddPopMission from "./DialogAddPopMission";
import MenuPop from "./MenuPop";
import MenuMission from "./MenuMission";

export default function ShowPopMission() {
  const user_id = useSelector(selectCurrentUserId);
  const { isLoading, isSuccess, isError, error, data } =
    useGetBusinessAlliancesQuery(user_id);
  let content;

  if (isLoading) {
    content = [
      {
        business_goal: "Loading",
        id: 0,
        name: "Loading",
        responsable_member_id: 0,
        creation_date: "2022-03-16",
        pops: [
          {
            id: 1,
            name: "loading",
            description: "loading",
            business_alliance_id: 1,
            pop_missions: [
              {
                id: 1,
                status: 1,
                description: "loading",
                tittle: "loading",
                pop_id: 1,
              },
            ],
          },
        ],
        permission: [
          {
            type: "View",
          },
        ],
        responsable_member: {
          category_id: 0,
          category: { id: 0 },
          city: "Loading",
          cnpj: "Loading",
          country: "Loading",
          id: 0,
          name: "Loading",
          neighborhood: "Loading",
          number: "Loading",
          site: "Loading",
          state: "Loading",
          street: "Loading",
          zip_code: "Loading",
        },
        internal_collaborations: [
          {
            alliance_member_id: 1,
            business_alliance_id: 1,
            exit_date: null,
            id: 1,
            relationship: "Loading",
            alliance_member: {
              category_id: 0,
              category: { id: 0 },
              city: "Loading",
              cnpj: "Loading",
              country: "Loading",
              id: 0,
              name: "Loading",
              neighborhood: "Loading",
              number: "Loading",
              site: "Loading",
              state: "Loading",
              street: "Loading",
              zip_code: "Loading",
            },
          },
        ],
        external_collaborations: [],
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
          Business Alliances
        </Typography>
      </Box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>

            <TableCell>Menu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => (
            <Row row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ row }) {
  const [openShowPopMission, setOpenShowPopMission] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenShowPopMission(!openShowPopMission)}
          >
            {openShowPopMission ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">
          <DialogAddPopMission id={row.id} />
        </TableCell>
      </TableRow>
      <TableRow>
        {/* PoP */}
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={openShowPopMission} timeout="auto" unmountOnExit>
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
                PoP
              </Typography>
            </Box>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Menu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.pops.map((mission) => (
                  <PopMission mission={mission} key={mission.id} />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
function PopMission(props) {
  const { mission } = props;
  const [openPopMission, setOpenPopMission] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const [openDialogAdd, setOpenDialogAdd] = React.useState(false);

  const [edit, setEdit] = React.useState(false);
  const [delet, setDelet] = React.useState(false);

  const adicionando = () => {
    setOpenDialogAdd(!openDialogAdd);
  };
  const deletando = () => {
    setDelet(!delet);
  };
  const editando = () => {
    setEdit(!edit);
  };
  const [updatePop] = useUpdatePopMutation();
  const [deletePop] = useDeletePopMutation();
  const formik = useFormik({
    initialValues: {
      name: mission.name,
      description: mission.description,
      id: mission.id,
    },
    onSubmit: async (values) => {
      console.log(values);
      updatePop(values);
      // formik.resetForm();
    },
  });
  function handleUpdateOrDelete(e) {
    if (edit) {
      formik.handleSubmit();
      editando();
    }
    if (delet) {
      handleDelete(e);
      deletando();
    }
  }
  function handleDelete() {
    //  console.log(formik.values.id)
    deletePop(formik.values);
  }
  return (
    <React.Fragment>
      <DialogAddMission
        openDialogAdd={openDialogAdd}
        setOpenDialogAdd={setOpenDialogAdd}
        id={mission.id}
      />

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenPopMission(!openPopMission)}
          >
            {openPopMission ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
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
            mission.name
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
            mission.description
          )}
        </TableCell>
        <TableCell align="left">
          {edit|| delet ? (
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
                  }}  //fecha menu
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </form>
            </>
          ) : (
            <MenuPop
              editando={editando}
              deletando={deletando}
              adicionando={adicionando}
              canDelete={mission.pop_missions.length > 0 ? true : false}
            ></MenuPop>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        {/* PoP Mission */}
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={openPopMission} timeout="auto" unmountOnExit>
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
                PoP Mission
              </Typography>
            </Box>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>

                  <TableCell>Status</TableCell>
                  <TableCell>Menu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mission?.pop_missions.map((mission) => (
                  <Mission mission={mission} key={mission.id} />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Mission(props) {
  const { mission } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [updatePopMission] = useUpdatePopMissionMutation();
  const [deletePopMission] = useDeletePopMissionMutation();
  const [openDialogAdd, setOpenDialogAdd] = React.useState(false);

  const [edit, setEdit] = React.useState(false);
  const [delet, setDelet] = React.useState(false);

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
      tittle: mission.tittle,
      description: mission.description,
      id: mission.id,
    },
    onSubmit: async (values) => {
      // console.log(values);
      updatePopMission(values);
      // formik.resetForm();
    },
  });
  function handleUpdateOrDelete(e) {
    if (edit) {
      formik.handleSubmit();
      editando();
    }
    if (delet) {
      handleDelete(e);
      deletando();
    }
  }
  function handleDelete() {
    //  console.log(formik.values.id)
    deletePopMission(formik.values);
  }
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">
          {edit ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="tittle"
                name="tittle"
                label="Tittle"
                variant="standard"
                value={formik.values.tittle}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            mission.tittle
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
            mission.description
          )}
        </TableCell>
        <TableCell align="left">
          {mission.status == 1 ? "able" : "disable"}
        </TableCell>
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
            <MenuMission
              editando={editando}
              deletando={deletando}
            ></MenuMission>
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
