import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/storage";
import { VersionContext } from "../../contexts/Version";
import { ProjectContext } from "../../contexts/ProjectID";
import { UserContext } from "../../contexts/AuthContext";
import { exists } from "fs";

const VersionControl = () => {
  const db = firebase.firestore();
  const [versionImages, setVersionImages] = useState([]);
  const context = useContext(ProjectContext);
  const userContext = useContext(UserContext);
  const versionContext = useContext(VersionContext);

  let projectID;
  if (location.search.length == 21) {
    projectID = location.search.slice(1);
  }

  useEffect(() => {
    const projectsRef = db.collection("projects").doc(projectID);
    projectsRef.get().then(doc => {
      if (doc.data().versionImages != undefined) {
        setVersionImages(doc.data().versionImages);
      }
    });
  }, [true]);

  const uploadFile = e => {
    const uploader = userContext.userInfo.uid;
    const file = e.currentTarget.files[0];
    const metadata = {
      contentType: "image/jpeg"
    };
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const uploadTask = storageRef
      .child("version/" + file.name)
      .put(file, metadata);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function(error) {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          // console.log(versionImages);
          const dbLink = db.collection("projects").doc(projectID);
          dbLink
            .set(
              {
                versionImages: [
                  ...versionImages,
                  {
                    uploader,
                    uploadedTime: Date.now(),
                    fileName: file.name,
                    imageURL: downloadURL
                  }
                ]
              },
              { merge: true }
            ).catch(function(error) {
              console.error("Error writing document: ", error);
            });

          setVersionImages([
            ...versionImages,
            {
              uploader,
              uploadedTime: Date.now(),
              fileName: file.name,
              imageURL: downloadURL
            }
          ]);
        });
      }
    );
  };

  const checkVersion = URL => {
    console.log(URL);
    versionContext.setShowVersion(URL);
  };

  let versionPart;
  if (versionImages.length != 0) {
    const versionPartEach = versionImages.map(versionImage => (
      <div className="version-each" key={versionImage.imageURL}>
        <div className="">{versionImage.fileName}</div>
        {/* <div className="version-date">{versionImage.uploadedTime}</div> */}
        <img
          src={versionImage.imageURL}
          className="version-image"
          onClick={checkVersion.bind(checkVersion, versionImage.imageURL)}
        />
      </div>
    ));
    versionPart = <>{versionPartEach}</>;
  }

  return (
    <React.Fragment>
      <div className="version-control-background">
        <input
          type="file"
          className="fileButton"
          accept=".jpg,.jpeg,.png"
          onChange={uploadFile}
        />
        {versionPart}
      </div>
    </React.Fragment>
  );
};

export default VersionControl;
