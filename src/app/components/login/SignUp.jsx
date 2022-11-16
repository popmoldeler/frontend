import * as React from "react";
import { useContext } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import { useSignUpMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [sigUp] = useSignUpMutation();
  const navigate = useNavigate();
  const [values, setValues] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async (values) => {
      sigUp(values);
      navigate("/signin", { replace: true });
      formik.resetForm();
    },
  });
  const handleClickShowPassword = () => {
    setValues(!values);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            mt: 1,
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ marginTop: 2, width: "40ch" }}
            id="name"
            name="name"
            label="Name"
            variant="standard"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ marginTop: 2, width: "40ch" }}
            id="email"
            name="email"
            label="Email Address"
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ marginTop: 2, width: "40ch" }}
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            variant="standard"
            onChange={formik.handleChange}
            type={values ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
