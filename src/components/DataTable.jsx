import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "../data";
// since this project is a demo app data table is a dummy read operation
// check dashboard/users to see how backend firebase read operation work
export default function DataTable({ title }) {
  const { darkMode } = useTheme();
  return (
    <>
      <Typography component="h1" variant="title">
        {title}s
      </Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxWidth: "100%",
          overflow: "auto",
          borderRadius: 5,
          p: 1,
          pb: 0,
          my: 3
        }}
      >
        <Table aria-label="Transactions table">
          <TableHead
            sx={{
              "&& *": {
                color: "primary.inverseColor"
              }
            }}
          >
            <TableRow>
              <TableCell>Tracking ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "&& *": {
                color: darkMode
                  ? "primary.contrastText"
                  : "primary.inverseColor"
              }
            }}
          >
            {rows.map(row => (
              <TableRow key={row.id} sx={{ mt: 10 }}>
                <TableCell>#{row.id}</TableCell>
                <TableCell sx={{ fontWeight: "normal" }}>
                  <Stack justifyContent="normal">
                    <Avatar
                      sx={{ mr: 1 }}
                      alt={`${row.customer} image`}
                      src={row.photoUrl}
                    />
                    {row.product}
                  </Stack>
                </TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    textAlign="center"
                    p={1}
                    borderRadius={2}
                    sx={
                      row.status === "Approved"
                        ? {
                            color: "green",
                            backgroundColor: "rgba(0, 128, 0, 0.151)"
                          }
                        : {
                            color: "goldenrod",
                            backgroundColor: "rgba(189, 189, 3, 0.103)"
                          }
                    }
                  >
                    {row.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export const DataTableAction = ({
  title,
  topActionTitle,
  actionColumn,
  redirectTo,
  columns,
  rows
}) => {
  const {
    darkMode,
    palette: {
      primary: { light }
    }
  } = useTheme();
  return (
    <div
      style={{
        height: "600px"
      }}
    >
      <Stack mb={2} flexWrap="wrap">
        <Typography component="h5" variant="lead">
          {title}
        </Typography>
        <Button
          component={Link}
          to={redirectTo}
          variant="outlined"
          sx={{
            borderColor: darkMode ? "primary.inverseColor" : "primary.main",
            color: darkMode ? "primary.inverseColor" : "primary.main"
          }}
        >
          {topActionTitle}
        </Button>
      </Stack>
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn || [])}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        sx={{
          ".MuiDataGrid-row.Mui-selected,.MuiDataGrid-row:hover": {
            backgroundColor: `${light} !important`,
            cursor: "pointer"
          },
          ".MuiCheckbox-root": {
            color: darkMode ? "#fff !important" : "primary.main"
          },
          ".MuiDataGrid-columnHeaders > *": {
            color: "primary.inverseColor"
          },
          ".MuiDataGrid-virtualScroller >   *": {
            color: darkMode ? "primary.contrastText" : "primary.inverseColor"
          },
          ".MuiDataGrid-overlay": {
            color: "primary.inverseColor"
          },
          ".MuiDataGrid-footerContainer *": {
            color: "primary.inverseColor"
          }
        }}
      />
    </div>
  );
};
