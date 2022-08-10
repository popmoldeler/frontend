import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/auth/authApiSlice";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [valuesPassword, setValuesPassword] = React.useState(false);
  const [valuesPasswordConfirmation, setValuesPasswordConfirmation] =
    React.useState(false);
  let params = useParams();
  const [resetPassword] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      resetToken: params.token,
      email: "",
      password: "",
      password_autentication: "",
    },
    onSubmit: async (values) => {
      resetPassword(values);
      formik.resetForm();
      navigate("/login", { replace: true });
    },
  });
  const handleClickShowPassword = () => {
    setValuesPassword(!valuesPassword);
  };
  const handleClickShowPasswordConfirmation = () => {
    setValuesPasswordConfirmation(!valuesPasswordConfirmation);
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
      }}
    >
      <Typography component="h1" variant="h5">
        Change Password
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
            type={valuesPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {valuesPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ marginTop: 2, width: "40ch" }}
            id="password_autentication"
            name="password_autentication"
            label="Password Confirmation"
            value={formik.values.password_autentication}
            variant="standard"
            onChange={formik.handleChange}
            type={valuesPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirmation}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {valuesPasswordConfirmation ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Reset Password
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
