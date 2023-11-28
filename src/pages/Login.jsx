import { useCallback, useRef } from "react";
import { useForm } from "../hooks/useForm";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { SlideTransition, Loading } from "../components/Animations";
import { setAuthErrorMsg } from "../firebase/errorHandlers";
import AuthLayout from "../components/AuthLayout";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import man1 from "../images/man1.jpg";
import woman1 from "../images/woman1.jpg";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { storeCache, deleteCache } from "../utils";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [snackBar, setSnackBar] = useState({
    open: false
  });

  const stateRef = useRef({
    isSubmitting: false
  });

  const onSubmit = useCallback(async formData => {
    try {
      if (stateRef.current.isSubmitting) return;

      stateRef.current.isSubmitting = true;

      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      storeCache(auth.currentUser);

      navigate("/dashboard");
    } catch ({ code }) {
      reset(true);

      setAuthErrorMsg(setSnackBar, code);
    } finally {
      stateRef.current.isSubmitting = false;
    }
  }, []);

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
    onSubmit
  );
  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackBar({ ...snackBar, open: false });
  };
  useEffect(() => {
    (async () => {
      setLoading(false);
      try {
        deleteCache();
        await signOut(auth);
      } catch ({ code }) {
        setAuthErrorMsg(setSnackBar, code);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  const handleDemoAcc = u => {
    reset(true, { isSubmitting: true });
    onSubmit(u);
  };

  return (
    <>
      <AuthLayout
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        forms={[
          { type: "email", name: "email" },
          { type: "password", name: "password" }
        ]}
        postFormEl={
          <Box
            component="fieldset"
            sx={{
              border: "1px solid currentColor",
              borderColor: "grey.400",
              color: "primary.main",
              borderRadius: "5px"
            }}
          >
            <legend>Demo Account</legend>
            {[
              {
                image: man1,
                fullname: "Joe bright"
              },
              {
                image: woman1,
                fullname: "Adebayo Opeyemi"
              }
            ].map((u, i) => {
              const trim = u.fullname.replace(/\s/, "");
              return (
                <Chip
                  key={i}
                  sx={{
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    m: 1
                  }}
                  onClick={() =>
                    isSubmitting
                      ? null
                      : handleDemoAcc({
                          email: trim + "@demo.com",
                          password: trim
                        })
                  }
                  avatar={<Avatar alt={u.fullname} src={u.image} />}
                  label={u.fullname}
                />
              );
            })}
          </Box>
        }
        postInputEl={
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
