import * as React from "react";
import { useFormik } from "formik";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import ForgotPassword from "./ForgotPassword";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";

export default function SignIn() {
  const [values, setValues] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const userData = await login(values).unwrap();
        dispatch(setCredentials(userData));
        formik.resetForm();
        navigate("/page1", { replace: true });
      } catch (err) {
        if (!err?.originalStatus) {
          // isLoading: true until timeout occurs
          console.log("No Server Response");
        } else if (err.originalStatus === 400) {
          console.log("Missing Username or Password");
        } else if (err.originalStatus === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Login Failed");
        }
      }
    },
  });
  const handleClickShowPassword = () => {
    setValues(!values);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // height: "100vh",
        // paddingTop: 2,
        position: "fixed",

        height: "90vh",
        width: "100vw",

        // backgroundColor: "bisque",
      }}
    >
      {/* <Typography component="h1" variant="h5">
        Sign In
      </Typography> */}
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            mt: 1,

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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "320px",
            }}
          >
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClickOpen}
            >
              Forgot Password?
            </Button>
            <ForgotPassword open={open} setOpen={setOpen} />
          </Box>
        </Box>
      </form>
    </Box>
  );
}
