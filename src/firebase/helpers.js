import { db, storage } from ".";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { v4 as uniq } from "uuid";
import { getDownloadURL } from "firebase/storage";

export const getDocById = async (docId, collection = "users") => {
  const docRef = doc(db, collection, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateDocById = async (docId, update, collection = "users") => {
  return await updateDoc(doc(db, collection, docId), update);
};

export const deleteDocById = async (docId, collection = "users") => {
  await deleteDoc(doc(db, collection, docId));
};

export const deleteFile = async fileUrl => {
  fileUrl && (await deleteObject(ref(storage, fileUrl)));
};

export const uploadFile = (
  file,
  {
    onStateChange,
    onError,
    docId,
    onUpload,
    keyName = "photoUrl",
    prevFilename
  }
) => {
  const storageRef = ref(storage, uniq() + "." + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: file.type
  });

  uploadTask.on("state_changed", onStateChange, onError, async () => {
    let fileUrl;

    try {
      fileUrl = await getDownloadURL(uploadTask.snapshot.ref);

      docId &&
        (await updateDocById(docId, {
          [keyName]: fileUrl
        }));

      deleteFile(prevFilename)
        .then(() => {})
        .catch(() => {});
    } catch (err) {
      console.log(err.message, err.code);
    } finally {
      onUpload && onUpload(fileUrl);
    }
  });
};
