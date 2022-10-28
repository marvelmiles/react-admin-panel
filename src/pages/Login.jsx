import { useForm } from "../hooks/useForm";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  Box,
  Input,
  Button,
  Snackbar,
  Alert,
  Typography,
  Stack,
  FormHelperText,
  useTheme,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { SlideTransition, Loading } from "../components/Animations";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setAuthErrorMsg } from "../firebase/errorHandlers";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    isSubmitting
  } = useForm(
    {
      formState: ["email", "password"]
    },
    async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        localStorage.setItem("user", JSON.stringify(auth.currentUser));
        navigate("/dashboard");
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
  useEffect(() => {
    (async () => {
      setLoading(false);
      try {
        localStorage.setItem("user", "");
        await signOut(auth);
      } catch ({ code }) {
        setAuthErrorMsg(setSnackBar, code);
      }
    })();
  }, []);
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
          p: 2,
          boxShadow: 1,
          textAlign: "center"
        }}
      >
        <Typography
          variant="lead"
          color={darkMode ? "primary.contrastText" : "primary.main"}
        >
          ReactAdmin
        </Typography>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          disableUnderline
          value={formData.email}
          error={!!errors.email}
          onChange={handleChange}
          variant="outlined"
          sx={{
            borderColor: !!errors.email ? "error.main" : "grey.400"
          }}
        />
        <Input
          type={hidePwd ? "password" : "text"}
          name="password"
          placeholder="password"
          disableUnderline
          value={formData.password}
          error={!!errors.password}
          onChange={handleChange}
          variant="outlined"
          endAdornment={
            <InputAdornment
              sx={{
                cursor: "pointer",
                color: "text.contrastText"
              }}
              position="end"
              onClick={() => setHidePwd(!hidePwd)}
            >
              {hidePwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </InputAdornment>
          }
          sx={{
            borderColor: !!errors.password
              ? errors.password === "Medium password"
                ? "warning.main"
                : "error.main"
              : "grey.400"
          }}
        />

        {errors.password && errors.password !== "required" && (
          <FormHelperText sx={{ mt: -1, mb: 1, color: "error.main" }}>
            {errors.password}
          </FormHelperText>
        )}
        <Stack>
          <Typography
            variant="caption"
            sx={{
              textAlign: "left",
              color: "primary.inverseColor"
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                textDecoration: "underline",
                color: "inherit"
              }}
            >
              Sign up!
            </Link>
          </Typography>
          <Typography
            variant="caption"
            sx={{
              textAlign: "right",
              color: "primary.inverseColor",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
            to="/reset-password"
            component={Link}
          >
            Forgot password!
          </Typography>
        </Stack>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          login
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
