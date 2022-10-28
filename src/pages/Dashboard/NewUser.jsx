import Container from "../../components/Container";
import FormLayout from "../../components/FormLayout";
import { useForm } from "../../hooks/useForm";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useRef, useState, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uniq } from "uuid";
import { useNavigate } from "react-router";
import { setUploadErrMsg } from "../../firebase/errorHandlers";
import { Snackbar, Alert } from "@mui/material";
export default function NewUser() {
  const navigate = useNavigate();
  const [snackBar, setSnackBar] = useState({
    open: false
  });
  const stateRef = useRef({}).current;
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    reset
  } = useForm(
    {
      formState: [
        "username",
        "fullname",
        "email",
        "phone",
        "address",
        "country"
      ]
    },
    async () => {
      try {
        formData.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, "users"), formData);
        if (!stateRef.file) return navigate("/dashboard/users");
        const storageRef = ref(storage, uniq() + "." + stateRef.file.name);
        const uploadTask = uploadBytesResumable(storageRef, stateRef.file, {
          contentType: stateRef.file.type
        });
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          ({ code }) => {
            setUploadErrMsg(setSnackBar, code);
            navigate("/dashboard/users");
          },
          async () => {
            try {
              await updateDoc(doc(db, "users", docRef.id), {
                avatar: await getDownloadURL(uploadTask.snapshot.ref)
              });
            } catch (err) {
              console.log(err.message, err.code);
            } finally {
              navigate("/dashboard/users");
            }
          }
        );
      } catch (err) {
        reset(true);
        setSnackBar({
          open: true,
          severity: "error",
          message: "Encountered an error while creating user"
        });
      }
    }
  );
  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackBar({ ...snackBar, open: false });
  };
  return (
    <Container>
      <FormLayout
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        setFile={file => (stateRef.file = file)}
        redirectTo="/dashboard/users"
        inputs={[
          {
            id: 1,
            label: "Username",
            type: "text",
            placeholder: "john_doe",
            name: "username",
            value: formData.username,
            error: errors.username,
            onChange: handleChange
          },
          {
            id: 2,
            label: "Fullname",
            type: "text",
            placeholder: "John Doe",
            name: "fullname",
            value: formData.fullname,
            error: errors.fullname,
            onChange: handleChange
          },
          {
            id: 3,
            label: "Email",
            type: "mail",
            placeholder: "john_doe@gmail.com",
            name: "email",
            value: formData.email,
            error: errors.email,
            onChange: handleChange
          },
          {
            id: 4,
            label: "Phone",
            type: "text",
            placeholder: "+2347094567899",
            name: "phone",
            value: formData.phone,
            error: errors.phone,
            onChange: handleChange
          },
          {
            id: 6,
            label: "Address",
            type: "text",
            placeholder: "Elton St. 216 NewYork",
            name: "address",
            value: formData.address,
            error: errors.address,
            onChange: handleChange
          },
          {
            id: 7,
            label: "Country",
            type: "text",
            placeholder: "USA",
            name: "country",
            value: formData.country,
            error: errors.country,
            onChange: handleChange
          }
        ]}
        title="Add New User"
      />
      <Snackbar open={snackBar.open} onClose={handleSnackClose}>
        <Alert severity={snackBar.severity} onClose={handleSnackClose}>
          {snackBar.message}!
        </Alert>
      </Snackbar>
    </Container>
  );
}
