import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/storage";
import { VersionContext } from "../../contexts/Version";
import { ProjectContext } from "../../contexts/ProjectID";

const VersionControl = () => {
  const [versionURLs, setVersionURLs] = useState([]);
  const context = useContext(ProjectContext);
  

  let projectID;
  if (location.search.length == 21) {
    projectID = location.search.slice(1);
  }
  const db = firebase.firestore();
  const [projects, setProjects] = useState([{ title: "hello", id: 1 }]);
  // const addTitle = (title)=> {
  //     setProjects([...projects, {title, id:2}]);
  // }

  const uploadFile = e => {
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
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      function() {
        let versionNumber = 1;
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          setVersionURLs({ version: versionNumber, imageURL: downloadURL });
          console.log(projectID);
          const dbLink = db.collection("projects").doc(projectID);
          dbLink
            .set(
              {
                versionImg: {
                  version: versionNumber,
                  imageURL: downloadURL
                }
              },
              { merge: true }
            )
            .then(function() {
              versionNumber += 1;
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        });
      }
    );
  };

  const checkVersion = URL => {
    console.log(URL);
    context.setShowVersion(URL);
  };

  let versionPart;
  if (versionURLs.length !== 0) {
    const URL = versionURLs.imageURL;
    versionPart = (
      <div className="version-each">
        <div className="version-number">Version&nbsp;{versionURLs.version}</div>
        <img
          src={URL}
          className="version-image"
          onClick={checkVersion.bind(checkVersion, URL)}
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="version-control-background">
        {versionPart}
        <input
          type="file"
          className="fileButton"
          accept=".jpg,.jpeg,.png"
          onChange={uploadFile}
        />
      </div>
    </React.Fragment>
  );
};

export default VersionControl;
