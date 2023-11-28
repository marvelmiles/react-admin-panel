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
import AuthLayout from "../components/AuthLayout";

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
      <AuthLayout
        title="Verification Email"
        formData={formData}
        errors={errors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
        btnTitle="Send Mail"
        forms={[
          {
            type: "email",
            name: "email",
            placeholder: "Email"
          }
        ]}
      />
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
