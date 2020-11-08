import React, { useRef, useEffect, useState } from "react";

function FileDrop(props) {
  const [drag, setDrag] = useState(false);
  const [filename, setFilename] = useState("");
  let dropRef = useRef(null);
  const imageUploader = useRef(null);

  let dragCounter = 0;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setDrag(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) setDrag(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files[0].type.includes("image")) {
        props.handleDrop(e.dataTransfer.files[0]);
        setFilename(e.dataTransfer.files[0].name);
        e.dataTransfer.clearData();
        dragCounter = 0;
        return;
      }
      return;
    }
  };

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    return function cleanup() {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  });
  const handleChange = (e) => {
    const [file] = e.target.files;
    if (file && file.size / 1024 / 1024 > 5) {
      alert("file too large");
    } else {
      props.handleDrop(file);
      setFilename(file.name);
    }
  };

  return (
    <div
      ref={dropRef}
      onClick={() => imageUploader.current.click()}
      className={
        drag ? "filedrop drag" : filename ? "filedrop ready" : "filedrop"
      }
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={imageUploader}
        style={{
          display: "none",
        }}
      />
      {filename && !drag ? <div>{filename}</div> : <div>Drop files here!</div>}
    </div>
  );
}
export default FileDrop;

//   const handleImageUpload = (e) => {
//     if (!file)
//       return Notification.error({
//         title: "Error",
//         message: "please select an img file to upload",
//       });
//     e.preventDefault();
//     // put(file,metdata)
//     const uploadTask = firebase.storage
//       .ref(`/images/profileimg/${file.name}`)
//       .put(file);
//     //initiates the firebase side uploading
//     uploadTask.on(
//       "state_changed",
//       (snapShot) => {
//         //takes a snap shot of the process as it is happening
//         console.log(snapShot);
//         const progress =
//           (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
//         console.log(Math.floor(progress));
//       },
//       (err) => {
//         //catches the errors
//         console.log(err);
//       },
//       () => {
//         // gets the functions from storage refences the image storage in firebase by the children
//         // gets the download url then sets the image from firebase as the value for the imgUrl key:
//         firebase.storage
//           .ref("images/profileimg")
//           .child(file.name)
//           .getDownloadURL()
//           .then((fireBaseUrl) => {
//             setImgUrl(fireBaseUrl);
//             firebase.auth.currentUser.updateProfile({
//               photoURL: fireBaseUrl,
//             });
//             firebase.db
//               .ref("users")
//               .child(context.state.user.uid)
//               .update({ photoUrl: fireBaseUrl })
//               .then(() => {
//                 Notification({
//                   title: "Success",
//                   message: "uploaded succesfully",
//                   type: "success",
//                 });
//               });
//             const { current } = uploadedImage;
//             current.src = fireBaseUrl;
//           });
//       }
//     );
//   };
