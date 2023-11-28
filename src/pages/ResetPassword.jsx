import React, { useState, useEffect } from "react";
import {
  Input,
  Box,
  Typography,
  useTheme,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import { useForm } from "../hooks/useForm";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../firebase";
import { setAuthErrorMsg } from "../firebase/errorHandlers";
import { SlideTransition, Loading } from "../components/Animations";

export default function ResetPassword() {
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();
  const [snackBar, setSnackBar] = useState({
    open: false
  });
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    reset
  } = useForm(
    {
      formState: ["email"]
    },
    async () => {
      try {
        await sendPasswordResetEmail(auth, formData.email);
        reset();
        setSnackBar({
          open: true,
          severity: "success",
          message: "A reset link as been sent to your mail."
        });
      } catch ({ code }) {
        reset(true);
        setAuthErrorMsg(setSnackBar, code);
      }
    }
  );

  useEffect(() => setLoading(false), []);

  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackBar({ ...snackBar, open: false });
  };
  if (loading) return <Loading />;
  return (
    <>
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          position: "absolute",
          borderRadius: 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "90%",
          maxWidth: "500px",
          boxShadow: 1,
          p: 2,
          textAlign: "center"
        }}
      >
        <Typography
          variant="lead"
          color={darkMode ? "primary.contrastText" : "primary.light"}
        >
          Verification Email
        </Typography>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          disableUnderline
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          sx={{
            borderColor: !!errors.email ? "error.main" : "primary.light"
          }}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Send Mail
        </Button>
      </Box>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={10000}
        onClose={handleSnackClose}
        TransitionProps={{
          direction: "right",
          onExited: handleSnackClose
        }}
        TransitionComponent={SlideTransition}
      >
        <Alert severity={snackBar.severity} onClose={handleSnackClose}>
          {snackBar.message}!
        </Alert>
      </Snackbar>
    </>
  );
}
