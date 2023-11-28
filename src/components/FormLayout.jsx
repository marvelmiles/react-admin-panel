import { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { Paper, useTheme, Box } from "@mui/material";
import { Loading } from "./Animations";

export default function FormLayout({
  title,
  inputs,
  handleSubmit,
  setFile,
  isSubmitting,
  btnEl = "Create",
  photoUrl,
  loading,
  stateChanged
}) {
  const [file, _setFile] = useState("");
  const { darkMode } = useTheme();

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          mb: 3,
          p: 1
        }}
      >
        <Typography component="h5" variant="lead">
          {title}
        </Typography>
      </Paper>
      <Grid
        container
        variant="paper"
        sx={{
          minHeight: "500px",
          ".MuiFormLabel-root": {
            color: "primary.inverseColor"
          }
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <Grid
              item
              xs={12}
              sm={3}
              my={{
                xs: 3,
                md: 0
              }}
            >
              <FormLabel htmlFor="user-avatar" sx={{ cursor: "pointer" }}>
                <Avatar
                  sx={{ mx: "auto", width: "120px", height: "120px" }}
                  src={file ? URL.createObjectURL(file) : photoUrl || ""}
                  alt=""
                />
              </FormLabel>
            </Grid>
            <Grid item xs={12} sm={8} sx={{ ml: "auto" }}>
              <Grid
                container
                component="form"
                spacing={3}
                onSubmit={handleSubmit}
              >
                <Grid item xs={12} sm={6}>
                  <FormLabel htmlFor="user-avatar" sx={{ cursor: "pointer" }}>
                    Image: <DriveFolderUploadOutlinedIcon />
                  </FormLabel>
                  <FormHelperText
                    sx={{
                      color: "text.contrastText",
                      whiteSpace: "nowrap",
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {file.name}
                  </FormHelperText>
                  <input
                    readOnly={isSubmitting}
                    accept="image/*"
                    id="user-avatar"
                    type="file"
                    style={{ display: "none" }}
                    onChange={e => {
                      const file = e.target.files[0];
                      _setFile(file);
                      setFile(file);
                    }}
                  />
                </Grid>

                {inputs.map(input => (
                  <Grid item key={input.id} xs={12} sm={6}>
                    <FormGroup>
                      <FormLabel>
                        {input.label}
                        <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        readOnly={isSubmitting}
                        error={!!input.error}
                        type={input.type}
                        value={input.value || ""}
                        placeholder={input.placeholder}
                        name={input.name}
                        onChange={input.onChange}
                        sx={{
                          color: "primary.inverseColor",
                          "&::before": {
                            borderBottomColor: darkMode
                              ? "primary.light"
                              : "primary.inverseColor"
                          },
                          "&&:hover::before": {
                            borderColor: darkMode
                              ? "primary.contrastText"
                              : "text.main"
                          },
                          "&::after": {
                            borderBottomColor: darkMode
                              ? "primary.inverseColor"
                              : "primary.main"
                          }
                        }}
                      />
                    </FormGroup>
                  </Grid>
                ))}

                <Button
                  disabled={!stateChanged}
                  variant="contained"
                  sx={{
                    maxWidth: "75%",
                    mx: "auto",
                    mt: 5
                  }}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {btnEl}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export const Retry = ({ onActionClick }) => (
  <Box
    sx={{
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)"
    }}
  >
    <Typography variant="h5" color="primary.inverseColor">
      Encountered an error.
      <Button
        variant="contained"
        sx={{
          width: "auto",
          display: "block",
          mx: "auto"
        }}
        onClick={onActionClick}
      >
        Try again
      </Button>
    </Typography>
  </Box>
);
