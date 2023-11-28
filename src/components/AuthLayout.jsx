import React, { useState } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AuthLayout = ({
  handleSubmit,
  handleChange,
  preInputEl,
  formData,
  title = "React Admin",
  errors,
  forms,
  isSubmitting,
  postFormEl,
  postInputEl,
  postBtnEl,
  btnTitle = "login"
}) => {
  const [hidePwd, setHidePwd] = useState(true);
  const { darkMode } = useTheme();

  preInputEl = preInputEl || (
    <Typography
      variant="lead"
      color={darkMode ? "primary.contrastText" : "primary.main"}
    >
      {title}
    </Typography>
  );

  const isMdPwd = errors.password === "Medium password";

  return (
    <Stack
      flexDirection="column"
      minHeight="100vh"
      justifyContent="center"
      sx={{
        width: "100%",
        "& > *": {
          borderRadius: 2,
          width: "90%",
          maxWidth: "500px",
          p: 2,
          boxShadow: 1,
          textAlign: "center",
          mx: "auto"
        }
      }}
    >
      <Box onSubmit={handleSubmit} component="form">
        {preInputEl}
        {forms.map((f, i) => {
          const isPwd = f.type === "password";

          return (
            <Input
              key={i}
              readOnly={isSubmitting}
              disableUnderline={f.disableUnderline}
              type={
                isPwd ? (hidePwd || isSubmitting ? "password" : "text") : f.type
              }
              name={f.name}
              placeholder={f.placeholder}
              disableUnderline
              value={formData[f.name]}
              error={!!errors[f.name]}
              onChange={handleChange}
              variant="outlined"
              sx={{
                borderColor:
                  !isMdPwd && errors[f.name] ? "error.main" : "grey.400"
              }}
              endAdornment={
                isPwd ? (
                  <InputAdornment
                    sx={{
                      cursor: "pointer",
                      color: "text.contrastText"
                    }}
                    position="end"
                    onClick={() => setHidePwd(!hidePwd)}
                    sx={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
                  >
                    {hidePwd || isSubmitting ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </InputAdornment>
                ) : null
              }
            />
          );
        })}

        {errors.password && errors.password !== "required" && (
          <FormHelperText
            sx={{
              mt: -2,
              color: isMdPwd ? "success.main" : "error.main"
            }}
          >
            {errors.password}
          </FormHelperText>
        )}
        {postInputEl}
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {btnTitle}
        </Button>
        {postBtnEl}
      </Box>
      {postFormEl ? <Box mt={2}>{postFormEl}</Box> : null}
    </Stack>
  );
};

AuthLayout.propTypes = {};

export default AuthLayout;
