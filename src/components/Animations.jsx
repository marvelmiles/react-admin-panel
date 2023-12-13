import { Slide, Box, CircularProgress, Stack } from "@mui/material";
import { useStateValue } from "../provider";

export const SlideTransition = props => <Slide {...props} />;

export const Loading = ({ sm }) => {
  const {
    state: { darkMode }
  } = useStateValue();

  const props = sm
    ? {
        value: 60,
        thickness: 4,
        size: 20
      }
    : {};

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
        {...props}
        sx={{
          color: darkMode ? "primary.light" : "primary.main"
        }}
      />
    </Stack>
  );
};
