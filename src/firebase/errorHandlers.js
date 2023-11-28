import { Link } from "react-router-dom";

export const setAuthErrorMsg = (setSnackBar, code) => {
  switch (code) {
    case "auth/user-not-found":
      return setSnackBar({
        open: true,
        severity: "error",
        message: (
          <span>
            Account isn't registered with us.{" "}
            <Link
              to="/signup"
              style={{
                color: "inherit",
                textDecoration: "underline"
              }}
            >
              Signup
            </Link>{" "}
            and become a part of the community
          </span>
        )
      });
    case "auth/missing-email":
    case "auth/missing-password":
    case "auth/wrong-password":
      return setSnackBar({
        open: true,
        severity: "error",
        message: "Email or password is incorrect"
      });
    default:
      return setSnackBar({
        open: true,
        severity: "error",
        message: "Network error!"
      });
  }
};

export const setUploadErrMsg = (setSnackBar, code) => {
  switch (code) {
    case "storage/unauthorized":
      return setSnackBar({
        open: true,
        severity: "error",
        message: "Unauthorized access!"
      });
    case "storage/canceled":
      return setSnackBar({
        open: true,
        severity: "warning",
        message: "Upload stoped abruptly!"
      });
    default:
      return setSnackBar({
        open: true,
        severity: "error",
        message: "Encountered an error while uploading"
      });
  }
};
