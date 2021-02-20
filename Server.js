// async function cut(imageURL) {
//   const formData = new FormData();
//   formData.append("data", {
//     uri: imageURI,
//     name: "photo",
//     type: "image/jpg",
//   });
// }
import * as firebase from "firebase";
import { db, storage } from "./firebase";

// async function paste(imageURL) {
//   const formData = new FormData();
//   formData.append("data", {
//     uri: imageURI,
//     name: "photo",
//     type: "image/jpg",
//   });
// }

// const cut = async (imageName) => {
//   const response = await fetch(uri);
//   const blob = await response.blob();

//   var ref = db
//     .storage()
//     .ref()
//     // .child("images/" + imageName);
//     .child("images/");
// //   console.log(imageName, "img");
//   return ref.put(blob);
// };

const cut = async (uri) => {
  const path = `photos/${Date.now()}.jpg`;
  return new Promise(async (res, rej) => {
    const response = await fetch(uri);
    const file = await response.blob();
    let upload = firebase.storage().ref(path).put(file);
    console.log(upload,"upload")
    upload.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        rej(err);
      },
      async () => {
        const url = await upload.snapshot.ref.getDownloadURL();
        res(url);
      }
    );
  });
};

const addPhoto = async (localUri) => {
  const remotrUri = await cut(localUri);
  return new Promise((res, rej) => {
    firebase.database().ref("/photos").push({
      image: remoteUri,
    });
    firebase.firestore
      .collection("photos")
      .add({
        image: remoteUri,
      })
      .then((ref) => {
        res(ref);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default { cut };
