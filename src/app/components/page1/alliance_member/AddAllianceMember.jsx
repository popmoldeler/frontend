import React from "react";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { useFormik } from "formik";

import { useSelector } from "react-redux";
import { useGetCategoryQuery } from "../../../features/category/categoryApiSlice";
import { selectCurrentUserId } from "../../../features/auth/authSlice";
import { useAddAllianceMemberMutation } from "../../../features/alliance_member/allianceMemberApiSlice";

export default function AddAllianceMember({ handleClose }) {
  const { data } = useGetCategoryQuery();
  const user_id = useSelector(selectCurrentUserId);
  const [addAllianceMember] = useAddAllianceMemberMutation();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      cnpj: "",
      zip_code: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      site: "",
      category_id: "",
      user_id: user_id,
    },
    onSubmit: async (values) => {
      addAllianceMember(values);
      
      handleClose();
    },
  });

  function onBlurCep(event, setFieldValue) {
    const { value } = event.target;

    const cep = value?.replace(/[^0-9]/g, "");

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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          sx={{ width: "40ch" }}
          id="name"
          name="name"
          label="Name"
          variant="standard"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ width: "40ch" }}
          id="cnpj"
          name="cnpj"
          label="CNPJ"
          value={formik.values.cnpj}
          variant="standard"
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ width: "40ch" }}
          id="zip_code"
          name="zip_code"
          label="Zip Code"
          variant="standard"
          onChange={(event) => onBlurCep(event, formik.setFieldValue)}
        />
        <TextField
          sx={{ width: "40ch" }}
          id="street"
          name="street"
          label="Street"
          variant="standard"
          value={formik.values.street}
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ width: "40ch" }}
          id="number"
          name="number"
          label="Number"
          variant="standard"
          value={formik.values.number}
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ width: "40ch" }}
          id="neighborhood"
          name="neighborhood"
          label="Neighborhood"
          variant="standard"
          value={formik.values.neighborhood}
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ width: "40ch" }}
          id="city"
          name="city"
          label="City"
          variant="standard"
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ width: "40ch" }}
          id="state"
          name="state"
          label="State"
          variant="standard"
          value={formik.values.state}
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ width: "40ch" }}
          id="country"
          name="country"
          label="Country"
          variant="standard"
          value={formik.values.country}
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ width: "40ch" }}
          id="site"
          name="site"
          label="Site"
          variant="standard"
          value={formik.values.site}
          onChange={formik.handleChange}
        />
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            sx={{ width: "36ch" }}
            labelId="demo-simple-select-standard-label"
            id="category_id"
            name="category_id"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ paddingTop: "20px" }}>
          <Button
            sx={{ m: 1, width: "15ch" }}
            color="error"
            variant="outlined"
            fullWidth
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ m: 1, width: "15ch" }}
            color="success"
            variant="outlined"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
}
