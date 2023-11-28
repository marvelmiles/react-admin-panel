import React from "react";
import Container from "../../components/Container";
import { Box, Stack } from "@mui/material";
import Widget from "../../components/Widget";
import Featured from "../../components/Featured";
import Chart from "../../components/Chart";
import DataTable from "../../components/DataTable";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <Container>
      <Stack
        direction={{
          xs: "column",
          sm: "row"
        }}
        flexWrap="wrap"
        alignItems="normal"
        sx={{
          width: "100%"
        }}
      >
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </Stack>
      <Grid container sx={{ my: 6 }}>
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
      </Grid>
      <Box
        sx={{
          mt: 4,
          boxShadow: 1,
          p: 3,
          pb: 2,
          borderRadius: 5
        }}
      >
        <DataTable title="Latest Transactions" />
      </Box>
    </Container>
  );
}
