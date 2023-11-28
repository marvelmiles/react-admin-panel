import { useState, useEffect } from "react";
import Container from "../../components/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import DataTable from "../../components/DataTable";
import Chart from "../../components/Chart";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../../components/Animations";
import { Snackbar, Alert } from "@mui/material";
import { Retry } from "../../components/FormLayout";
import { getDocById } from "../../firebase/helpers";
export default function UserTransactions() {
  const [snackBar, setSnackBar] = useState({
    open: false
  });
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      setUser(null);

      const user = await getDocById(userId);

      if (!user)
        setSnackBar({
          message: "No such user exist!",
          severity: "error"
        });

      setUser(user || {});
    } catch (err) {
      setSnackBar({
        message: "Something went wrong while fetching user!",
        severity: "error"
      });

      setUser({});
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackBar({ ...snackBar, open: false });
  };

  return (
    <Container>
      {user ? (
        user.email ? (
          <>
            <Grid container>
              <Grid item xs={12} s1024={5} variant="paper">
                <Button
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "primary.light",
                    fontWeight: "bold",
                    borderRadius: 0,
                    borderTopRightRadius: "inherit",
                    color: "text.contrastText"
                  }}
                  onClick={() => {
                    localStorage.setItem(
                      "v-user",
                      JSON.stringify({ ...user, id: userId })
                    );
                    navigate(`/dashboard/users/${userId}`);
                  }}
                >
                  Edit
                </Button>
                <Typography variant="title" color="gray" sx={{ mt: 3 }}>
                  Information
                </Typography>
                <Stack
                  direction="column"
                  sx={{
                    gap: "20px",
                    my: 2,
                    span: {
                      fontWeight: "bold"
                    },

                    width: "inherit",
                    height: "100%",
                    maxHeight: "50%"
                  }}
                >
                  <Avatar
                    sx={{ width: "120px", height: "120px" }}
                    src={user.photoUrl}
                    alt={user.username + " avatar"}
                  />
                  <Box
                    sx={{
                      color: "primary.inverseColor",
                      mt: 2,
                      wordBreak: "break-word"
                    }}
                  >
                    <div>
                      <Typography
                        variant="lead"
                        component="h5"
                        color="primary.inverseColor"
                      >
                        {user.username}
                      </Typography>
                      <div>
                        <Typography component="span">Email: </Typography>
                        <Typography component="span">{user.email}</Typography>
                      </div>
                      <div>
                        <Typography component="span">Phone: </Typography>
                        <Typography component="span">{user.phone}</Typography>
                      </div>
                      <div>
                        <Typography component="span">Address: </Typography>
                        <Typography component="span">{user.address}</Typography>
                      </div>
                    </div>
                  </Box>
                </Stack>
              </Grid>
              <Chart
                aspect={5 / 3}
                title="User Spending ( Last 6 Months)"
                fullWidth
              />
            </Grid>
            <Paper sx={{ my: 4, p: 2, borderRadius: 5 }} elevation={0}>
              <Typography variant="title" color="gray">
                Last Transactions
              </Typography>
              <DataTable />
            </Paper>
          </>
        ) : (
          <Retry onActionClick={fetchUserInfo} />
        )
      ) : (
        <Loading />
      )}
      <Snackbar open={snackBar.open} onClose={handleSnackClose}>
        <Alert severity={snackBar.severity} onClose={handleSnackClose}>
          {snackBar.message}!
        </Alert>
      </Snackbar>
    </Container>
  );
}
