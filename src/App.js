import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewUser from "./pages/Dashboard/NewUser";
import Users from "./pages/Dashboard/Users";
import UserTransactions from "./pages/Dashboard/UserTransactions";
import {
  CssBaseline,
  GlobalStyles,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { useStateValue } from "./provider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import { SlideTransition } from "./components/Animations";
import { getCachedObj } from "./utils";

export default function App() {
  const {
    state: { darkMode }
  } = useStateValue();
  const theme = createTheme({
    darkMode,
    breakpoints: {
      values: {
        xs: 0,
        sm: 567,
        md: 768,
        s1024: 1024,
        lg: 1200,
        xl: 1500
      }
    },
    palette: {
      primary: darkMode
        ? {
            main: "#000000",
            light: "#2e2e2e",
            dark: "#171717",
            inverseColor: "#d3d3d3",
            contrastText: "#808080"
          }
        : {
            main: "#8360ff",
            light: "#7551f818",
            inverseColor: "#000"
          },

      divider: darkMode ? "#2e2e2e" : "rgba(0,0,0,0.12)",
      text: {
        contrastText: "#808080"
      },
      background: {
        default: darkMode ? "#000" : "#fff",
        paper: darkMode ? "#000" : "#fff",
        lightBg: darkMode ? "#000" : "rgb(251,251,255)"
      },
      action: {
        disabled: darkMode ? "#d3d3d3" : "rgba(0,0,0,0.26)",
        disabledBackground: darkMode ? "#2e2e2e" : "rgba(0,0,0,0.12)"
      }
    },

    shadows: [
      "none",
      "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
      "0px 2px 4px -1px rgba(201, 201, 201, 0.47),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
    ],
    components: {
      MuiSnackbar: {
        defaultProps: {
          autoHideDuration: 10000,
          TransitionComponent: SlideTransition,
          TransitionProps: {
            direction: "right"
          }
        }
      },
      MuiTableCell: {
        defaultProps: {
          sx: { fontWeight: "bold" }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: darkMode ? "#fff" : "#000",
            caretColor: darkMode ? "#fff" : "#000",
            "& input": {
              paddingLeft: "8px",
              "&::placeholder": {
                fontWeight: "bold"
              }
            }
          }
        },
        variants: [
          {
            props: { variant: "outlined" },
            style: {
              margin: `16px 0`,
              borderWidth: "1px",
              borderStyle: "solid",
              width: "100%",
              padding: "2px",
              boxShadow: "none",
              borderRadius: "5px"
            }
          }
        ]
      },
      MuiStack: {
        defaultProps: {
          width: "100%",
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }
      },
      MuiGrid: {
        variants: [
          {
            props: { variant: "paper" },

            style: ({
              theme: {
                shadows,
                spacing,
                palette: { background }
              }
            }) => ({
              position: "relative",
              boxShadow: shadows[1],
              padding: spacing(2),
              borderRadius: spacing(2),
              backgroundColor: background.paper
            })
          }
        ]
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "contained" },
            style: ({
              theme: {
                spacing,
                palette: { primary }
              }
            }) => ({
              width: "100%",
              margin: `${spacing(2)} 0`,
              background: darkMode ? primary.light : primary.main,
              "&:disabled": {
                cursor: "not-allowed",
                pointerEvents: "all"
              }
            })
          }
        ]
      },
      MuiFormLabel: {
        defaultProps: {
          sx: {
            fontWeight: "bold"
          }
        }
      },
      MuiTypography: {
        variants: [
          {
            props: { variant: "title" },
            style: ({
              theme: {
                palette: { primary }
              }
            }) => ({
              fontSize: "1.1rem",
              fontWeight: "600",
              color: `${primary.inverseColor} !important`
            })
          },
          {
            props: { variant: "link" },
            style: {
              borderBottom: "1px solid gray",
              width: "max-content",
              display: "inline-block"
            }
          },
          {
            props: { variant: "lead" },
            style: ({
              theme: {
                typography: { h5, h6 },
                breakpoints,
                palette: { primary }
              }
            }) => ({
              fontSize: h6.fontSize,
              color: `${primary.contrastText}`,
              [breakpoints.up("sm")]: {
                fontSize: h5.fontSize
              }
            })
          }
        ]
      }
    }
  });
  const RequireAuth = ({ children }) =>
    getCachedObj() ? children : <Navigate to="/login" />;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={({ palette: { primary }, shadows, spacing }) => ({
            "*": {
              fontFamily: "'Nunito', sans-serif !important"
            },
            a: {
              textDecoration: "none"
            },
            ".MuiDataGrid-menu .MuiPaper-root": {
              borderRadius: spacing(1),
              boxShadow: shadows[1]
            },
            ".MuiDataGrid-menu *": {
              color: primary.inverseColor
            },
            [`
            input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus 
              `]: {
              backgroundColor: "transparent",
              transition: "background-color 5000s ease-in-out 0s",
              textFillColor: darkMode ? "#fff" : "#000"
            }
          })}
        />
        <Routes path="/">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="dashboard">
            <Route
              index
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <Users />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewUser />
                  </RequireAuth>
                }
              />
              <Route
                path="transactions/:userId"
                element={
                  <RequireAuth>
                    <UserTransactions />
                  </RequireAuth>
                }
              />

              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <NewUser />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
