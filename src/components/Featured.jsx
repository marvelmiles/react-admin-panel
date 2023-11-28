import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import Grid from "@mui/material/Grid";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  orderBy
} from "@firebase/firestore";
import { db } from "../firebase";
import { Loading } from "./Animations";
export default function Featured() {
  const [pricing, setPricing] = useState(null);
  const { darkMode } = useTheme();
  useEffect(() => {
    (async () => {
      const today = new Date();
      const lastWk = new Date(new Date().setDate(today.getDate() - 7));
      const lastMthSnapShot = await getDocs(
        query(
          collection(db, "products"),
          where("createdAt", "<=", today),
          orderBy("createdAt"),
          orderBy("price")
        )
      );
      const lastWkSnapShot = await getDocs(
        query(
          collection(db, "products"),
          where("createdAt", "<=", lastWk),
          orderBy("createdAt")
        )
      );
      setPricing({
        lastMth: lastMthSnapShot.docs[0].data().price,
        lastWk: lastWkSnapShot.docs[0].data().price
      });
    })();
  }, []);
  return (
    <Grid
      item
      xs={12}
      s1024={5}
      variant="paper"
      sx={{ my: 2, minHeight: "350px" }}
    >
      {pricing ? (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="title">Total Revenue</Typography>
            <MoreVertIcon
              fontSize="small"
              sx={{
                color: "primary.inverseColor"
              }}
            />
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Box sx={{ width: "100px", height: "100px", mt: 2 }}>
              <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
            </Box>
            <Typography variant="title">Total sales made today</Typography>
            <Typography variant="h3">
              ${pricing.lastMth + pricing.lastWk}
            </Typography>
            <Typography variant="subtitle2" textAlign="center">
              Previous transactions processing. Last payments may not be
              included.
            </Typography>
            <Stack
              flexWrap="wrap"
              sx={{
                "& > *": {
                  my: 1
                }
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography color="grey.500">Target</Typography>
                <Stack
                  sx={{
                    mt: 1,
                    color: "error.main"
                  }}
                >
                  <KeyboardArrowDownIcon />
                  <Typography
                    sx={{
                      color: darkMode ? "primary.contrastText" : "inherit"
                    }}
                  >
                    $1000
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography color="grey.500">Last Week</Typography>
                <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
                  <KeyboardArrowUpOutlinedIcon sx={{ color: "success.main" }} />
                  <Typography
                    sx={{
                      color: darkMode ? "primary.contrastText" : "success.main"
                    }}
                  >
                    ${pricing.lastWk}
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography color="grey.500">Last Month</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    mt: 1
                  }}
                >
                  <KeyboardArrowDownIcon
                    sx={{
                      color: "success.main"
                    }}
                  />
                  <Typography
                    sx={{
                      color: darkMode ? "primary.contrastText" : "success.main"
                    }}
                  >
                    ${pricing.lastMth}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </>
      ) : (
        <Loading />
      )}
    </Grid>
  );
}
