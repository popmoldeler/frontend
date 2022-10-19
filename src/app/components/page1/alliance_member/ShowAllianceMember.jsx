import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import MenuOrganization from "./MenuOrganization";
import DialogAddAllianceMember from "./DialogAddAllianceMember";
import { useFormik } from "formik";
import {
  useGetAllianceMemberQuery,
  useUpdateAllianceMemberMutation,
  useDeleteAllianceMemberMutation,
} from "../../../features/alliance_member/allianceMemberApiSlice";
import { useGetCategoryQuery } from "../../../features/category/categoryApiSlice";
export default function ShowAllianceMember({
  openShowOrg,
  handleOpenShowOrg,
  allianceMembers,
}) {
  // const user = useSelector(selectCurrentUser);
  const { isLoading, isSuccess, isError, error, data } =
    useGetAllianceMemberQuery();
  const { data: categories } = useGetCategoryQuery();

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
      },
    ];
  } else if (isSuccess) {
    content = data;
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <Paper sx={{ margin: 1, width: "90%", height: "91%" }}>
        <TableContainer sx={{ height: "100%" }}>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <DialogAddAllianceMember />
            </Box>
          </Box>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">CNPJ</TableCell>
                <TableCell align="center">Zip Code</TableCell>
                <TableCell align="center">Street</TableCell>
                <TableCell align="center">Number</TableCell>
                <TableCell align="center">Neighborhood</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">State</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Site</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Menu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map((row) => (
                <Row
                  key={row.cnpj}
                  row={row}
                  categories={categories}
                  // ={}
                  // handleOrgDelete={handleOrgDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

function Row({ row, categories }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editingOrg, setEditing] = React.useState(false);
  const [deletingOrg, setDeleting] = React.useState(false);
  const openMenu = Boolean(anchorEl);

  function editando() {
    setEditing(!editingOrg);
  }
  function deletando() {
    setDeleting(!deletingOrg);
  }

  const [updateAllianceMember] = useUpdateAllianceMemberMutation();
  const [deleteAllianceMember] = useDeleteAllianceMemberMutation();

  const formik = useFormik({
    initialValues: {
      name: row.name,
      cnpj: row.cnpj,
      zip_code: row.zip_code.replace(/[^0-9]/g, ""),
      street: row.street,
      number: row.number,
      neighborhood: row.neighborhood,
      city: row.city,
      state: row.state,
      country: row.country,
      site: row.site,
      category_id: row.category.id,
    },
    onSubmit: (values) => {
      const member = {
        id: row.id,
        member: values,
      };
      updateAllianceMember(member);

      //  handleOpenRegOrg();
    },
  });

  function handleDelete(e) {
    e.preventDefault();

    deleteAllianceMember(row.id);

    formik.values.cnpj = "";
  }
  function onBlurCep(event, setFieldValue) {
    const { value } = event.target;

    const cep = value?.replace(/[^0-9]/g, "");
    console.log(cep);
    if (cep?.length !== 8) {
      return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue("zip_code", data.cep);
        setFieldValue("street", data.logradouro);

        setFieldValue("neighborhood", data.bairro);
        setFieldValue("city", data.localidade);
        setFieldValue("state", data.uf);
      });
  }
  function click(e) {
    //yes editado
    if (editingOrg) {
      formik.handleSubmit();

      editando();
    }
    if (deletingOrg) {
      handleDelete(e);
      deletando();
    }
  }

  return (
    // const isItemSelected = isSelected(row.cnpj);
    // const labelId = `enhanced-table-checkbox-${index}`;

    <>
      <TableRow key={row.cnpj}>
        <TableCell align="center">
          {editingOrg ? (
            <>
              <TextField
                sx={{ width: "15ch" }}
                id="name"
                name="name"
                label="Name"
                variant="standard"
                value={formik.values.name}
                onChange={formik.handleChange}
                onSubmit={formik.handleSubmit}
              />
            </>
          ) : (
            row.name
          )}
        </TableCell>
        <TableCell align="center">{row.cnpj}</TableCell>
        <TableCell align="center">
          {editingOrg ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="zip_code"
                name="zip_code"
                label="Zip Code"
                variant="standard"
                value={formik.values.zip_code}
                onChange={(event) => onBlurCep(event, formik.setFieldValue)}
              />
            </form>
          ) : (
            row.zip_code
          )}
        </TableCell>
        <TableCell align="center">
          {editingOrg ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="street"
                name="street"
                label="Street"
                variant="standard"
                value={formik.values.street}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.street
          )}
        </TableCell>
        <TableCell align="center">
          {editingOrg ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="number"
                name="number"
                label="Number"
                variant="standard"
                value={formik.values.number}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.number
          )}
        </TableCell>
        <TableCell align="center">
          {editingOrg ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="neighborhood"
                name="neighborhood"
                label="Neighborhood"
                variant="standard"
                value={formik.values.neighborhood}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.neighborhood
          )}
        </TableCell>
        <TableCell align="center">
          {editingOrg ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="city"
                name="city"
                label="City"
                variant="standard"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.city
          )}
        </TableCell>
        <TableCell align="center">
          {editingOrg ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="state"
                name="state"
                label="State"
                variant="standard"
                value={formik.values.state}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.state
          )}
        </TableCell>
        <TableCell align="center">
          {editingOrg ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="country"
                name="country"
                label="Country"
                variant="standard"
                value={formik.values.country}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.country
          )}
        </TableCell>
        <TableCell align="center">
          {editingOrg ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "15ch" }}
                id="site"
                name="site"
                label="Site"
                variant="standard"
                value={formik.values.site}
                onChange={formik.handleChange}
              />
            </form>
          ) : (
            row.site
          )}
        </TableCell>
        <TableCell align="center">
          {editingOrg ? (
            <>
              <form onSubmit={formik.handleSubmit}>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    sx={{ width: "13ch" }}
                    labelId="demo-simple-select-standard-label"
                    id="category_id"
                    name="category_id"
                    value={formik.values.category_id}
                    onChange={formik.handleChange}
                    label="Category"
                    variant="standard"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            </>
          ) : (
            row.category.name
          )}
        </TableCell>
        <TableCell align="center">
          {editingOrg || deletingOrg ? (
            <>
              <form onSubmit={formik.handleSubmit}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(e) => click(e)}
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
                    if (deletingOrg === true) {
                      deletando();
                    } else {
                      editando();
                    }
                    // formik.resetForm();
                  }}
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </form>
            </>
          ) : (
            <MenuOrganization
              editando={editando}
              deletando={deletando}
            ></MenuOrganization>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
