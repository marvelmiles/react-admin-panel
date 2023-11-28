import { useForm } from "../hooks/useForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Box,
  Input,
  Button,
  Snackbar,
  Alert,
  Typography,
  FormHelperText,
  useTheme,
  InputAdornment,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { SlideTransition, Loading } from "../components/Animations";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setAuthErrorMsg } from "../firebase/errorHandlers";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [snackBar, setSnackBar] = useState({
    open: false
  });
  const [hidePwd, setHidePwd] = useState(true);
  const { darkMode } = useTheme();
  const {
    formData,
    errors,
    handleSubmit,
    handleChange,
    reset,
    isSubmitting,
    stateChanged
  } = useForm(
    {
      formState: ["email", "password"]
    },
    async () => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        navigate("/login");
      } catch ({ code }) {
        reset(true);
        setAuthErrorMsg(setSnackBar, code);
      }
    }
  );
  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackBar({ ...snackBar, open: false });
  };

  useEffect(() => setLoading(false), []);

  if (loading) return <Loading />;

  return (
    <>
      <AuthLayout
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        stateChanged={stateChanged}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        forms={[
          {
            type: "email",
            placeholder: "Email",
            name: "email"
          },
          { type: "password", placeholder: "Password", name: "password" }
        ]}
        postBtnEl={
          <Typography
            variant="caption"
            sx={{
              textAlign: "right",
              color: "primary.inverseColor"
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "underline",
                color: "inherit"
              }}
            >
              Login!
            </Link>
          </Typography>
        }
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
