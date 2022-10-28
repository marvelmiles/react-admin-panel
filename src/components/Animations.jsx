import { Slide, Box, CircularProgress } from "@mui/material";
import { useStateValue } from "../provider";

export const SlideTransition = props => <Slide {...props} />;

export const Loading = () => {
  const {
    state: { darkMode }
  } = useStateValue();
  return (
    <CircularProgress
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        color: darkMode ? "primary.light" : "primary.main"
      }}
    />
  );
};
