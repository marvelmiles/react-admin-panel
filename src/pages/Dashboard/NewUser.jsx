import { useRef, useState, useCallback, useEffect } from "react";
import Container from "../../components/Container";
import FormLayout from "../../components/FormLayout";
import { useForm } from "../../hooks/useForm";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router";
import { setUploadErrMsg } from "../../firebase/errorHandlers";
import { Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { updateDocById, uploadFile, getDocById } from "../../firebase/helpers";
import { storeCache, getCachedObj } from "../../utils";

export default function NewUser() {
  const cacheUser = getCachedObj("v-user");

  const { userId } = useParams();

  const withCache = userId && cacheUser.id === userId;

  const [loading, setLoading] = useState(userId && !withCache);

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
    stateChanged,
    reset
  } = useForm(
    {
      placeholders: withCache ? cacheUser : {},
      formState: userId
        ? undefined
        : ["username", "fullname", "email", "phone", "address", "country"]
    },
    async () => {
      const resetForm = (inputs = formData) => {
        storeCache(inputs, "v-user");

        reset(inputs, {
          isSubmitting: false
        });
      };

      const onPhotoUpload = photoUrl => {
        resetForm({ ...formData, photoUrl });
      };

      if (userId) {
        try {
          await updateDocById(userId, formData);

          if (stateRef.file)
            uploadFile(stateRef.file, {
              docId: userId,
              prevFilename: cacheUser.photoUrl,
              onError: ({ code }) => {
                setUploadErrMsg(setSnackBar, code);
              },
              onUpload: onPhotoUpload
            });
          else resetForm();
        } catch (err) {
          setSnackBar({
            message: "Something went wrong while updating user!",
            severity: "error"
          });
        }

        return;
      }

      try {
        formData.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, "users"), formData);

        if (!stateRef.file) return navigate("/dashboard/users");

        uploadFile(stateRef.file, {
          docId: docRef.id,
          onStateChange: snapshot => {
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
          onError: ({ code }) => {
            setUploadErrMsg(setSnackBar, code);
            navigate("/dashboard/users");
          },
          onUpload: onPhotoUpload
        });
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

  useEffect(() => {
    (async () => {
      if (userId && !withCache) {
        try {
          setLoading(true);
          reset((await getDocById(userId)) || {});
        } catch (err) {
          setSnackBar({
            message: "Something went wron while fetching user data"
          });
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [userId, withCache, reset]);

  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackBar({ ...snackBar, open: false });
  };

  return (
    <Container>
      <FormLayout
        stateChanged={stateChanged}
        loading={loading}
        photoUrl={formData.photoUrl}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        setFile={file => (stateRef.file = file)}
        redirectTo="/dashboard/users"
        btnEl={userId ? "Update" : "Create"}
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
            placeholder: "Nigeria",
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
