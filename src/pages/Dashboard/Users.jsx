import { useEffect } from "react";
import Container from "../../components/Container";
import { DataTableAction } from "../../components/DataTable";
import { useState } from "react";
import { userColumns } from "../../data";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Snackbar, Alert, useTheme } from "@mui/material";
import { SlideTransition, Loading } from "../../components/Animations";
import { setAuthErrorMsg } from "../../firebase/errorHandlers";
import { deleteFile, deleteDocById } from "../../firebase/helpers";
export default function Users() {
  const [snackBar, setSnackBar] = useState({
    open: false
  });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { darkMode } = useTheme();
  useEffect(() => {
    const getFakeStatus = () => {
      switch (localStorage.getItem("status")) {
        case "active":
          localStorage.setItem("status", "pending");
          return "pending";
        case "pending":
          localStorage.setItem("status", "passive");
          return "passive";
        default:
          localStorage.setItem("status", "active");
          return "active";
      }
    };
    const unSub = onSnapshot(collection(db, "users"), snapShot => {
      const list = [];
      snapShot.forEach(doc => {
        list.push({
          id: doc.id,
          status: getFakeStatus(),
          ...doc.data()
        });
      });
      setData(list);
      setLoading(false);
    });

    return () => unSub();
  }, []);

  const handleDelete = async ({ id, photoUrl }) => {
    try {
      await deleteDocById(id);
      setData(data.filter(item => item.id !== id));
      await deleteFile(photoUrl);
    } catch ({ code }) {
      setAuthErrorMsg(setSnackBar, code);
    }
  };
  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackBar({ ...snackBar, open: false });
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <DataTableAction
          rows={data}
          columns={userColumns}
          actionColumn={[
            {
              field: "action",
              headerName: "Action",
              width: 200,
              renderCell: params => {
                return (
                  <Stack>
                    <Button
                      sx={{
                        px: 1,
                        py: 0,
                        borderColor: darkMode
                          ? "primary.contrastText"
                          : "primary.main",
                        color: darkMode
                          ? "primary.contrastText"
                          : "primary.main"
                      }}
                      component={Link}
                      to={`/dashboard/users/transactions/${params.row.id}`}
                      variant="outlined"
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        px: 1,
                        py: 0,
                        borderColor: darkMode ? "error.main" : "error.main",
                        color: darkMode ? "error.main" : "error.main"
                      }}
                      onClick={() => handleDelete(params.row)}
                    >
                      Delete
                    </Button>
                  </Stack>
                );
              }
            }
          ]}
          title="Customers"
          topActionTitle="Add New"
          redirectTo="/dashboard/users/new"
        />
      )}
      <Snackbar
        onClose={handleSnackClose}
        open={snackBar.open}
        autoHideDuration={10000}
        TransitionProps={{
          direction: "right",
          onExited: handleSnackClose
        }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          sx={{ width: "100%" }}
          severity={snackBar.severity}
          onClose={handleSnackClose}
        >
          {snackBar.message}!
        </Alert>
      </Snackbar>
    </Container>
  );
}
