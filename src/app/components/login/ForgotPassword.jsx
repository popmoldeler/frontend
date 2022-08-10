import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useFormik } from "formik";
import { useForgotPasswordMutation } from "../../features/auth/authApiSlice";

export default function ForgotPassword({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [forgotPassword] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      forgotPassword(values);
      handleClose();
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To reset your password, please enter your email address here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              type="email"
              fullWidth
              value={formik.values.email}
              variant="standard"
              onChange={formik.handleChange}
              id="email"
              name="email"
              label="Email Address"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Send</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
