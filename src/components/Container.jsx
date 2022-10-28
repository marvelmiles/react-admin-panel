import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import Header from "./Header";
import { Loading } from "./Animations";
export default function Container({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);
  if (loading) return <Loading />;
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.paper",
        minHeight: "100vh"
      }}
    >
      <Sidebar />
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "100%",
            md: "calc(100% - 220px)"
          },
          ml: "auto"
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            p: 2,
            mt: 7,
            minHeight: "100vh",
            "& > .c-layout": {
              height: "100%"
            }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
