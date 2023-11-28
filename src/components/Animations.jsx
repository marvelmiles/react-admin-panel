import { Slide, Box, CircularProgress, Stack } from "@mui/material";
import { useStateValue } from "../provider";

export const SlideTransition = props => <Slide {...props} />;

export const Loading = () => {
  const {
    state: { darkMode }
  } = useStateValue();
  return (
    <Stack
      justifyContent="center"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "inherit",
        minWidth: "inherit"
      }}
    >
      <CircularProgress
        sx={{
          color: darkMode ? "primary.light" : "primary.main"
        }}
      />
    </Stack>
  );
};
