import React, { useState, useRef, useContext } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import UnsplashPopup from "../../components/UnsplashPopup";
import firebase from "firebase/app";
import "firebase/storage";
import { Prompt } from "react-router";
import IconDelete from "../../assets/icon-delete.png";
import IconQuestion from "../../assets/icons8-help-grey.png";
import Popup from "reactjs-popup";
import { UserContext } from "../../contexts/AuthContext";

const Survey = () => {
  const db = firebase.firestore();
  const fileInputEl = useRef(null);
  const context = useContext(UserContext);
  let warning;
  
  const handleSubmit = e => {
      e.preventDefault();
      
      const format = Array.from(e.currentTarget.type)
      .filter(type => type.checked)
      .map(type => type.value);
      
      const referenceImages = imageURLs.map(imageURL => ({
        downloadURL:imageURL.downloadURL, 
        fileName:imageURL.fileName, 
        note: e.currentTarget[`note-${imageURL.fileName}`].value
      })
      )
      
    const creator = context.userInfo.uid;
    console.log(e.currentTarget.name.value, e.currentTarget.name.value.length)


    if ( e.currentTarget.name.value.length != 0 && e.currentTarget.name.value.length <= 20) {
      db.collection("projects").add({
        creator,
        createdTime: Date.now(),
        name: e.currentTarget.name.value,
        purpose: e.currentTarget.purpose.value,
        format,
        referenceImages
      })
      .then(ref => {
        window.location.href = "/canvas?" + ref.id;
      });
    } if (e.currentTarget.name.value.length == 0) {
      alert("Please provide the file name");
    } if (e.currentTarget.name.value.length > 20) {
        alert("Please limit the project name whithin 20 characters")
    }
  };


  const handleSaveLeave = e => {
    e.preventDefault();
      
    const format = Array.from(e.currentTarget.type)
    .filter(type => type.checked)
    .map(type => type.value);
    
    const referenceImages = imageURLs.map(imageURL => ({
      downloadURL:imageURL.downloadURL, 
      fileName:imageURL.fileName, 
      note: e.currentTarget[`note-${imageURL.fileName}`].value
    })
    )
    
  const creator = context.userInfo.uid;
  console.log(e.currentTarget.name.value, e.currentTarget.name.value.length)


  if ( e.currentTarget.name.value.length != 0 && e.currentTarget.name.value.length <= 20) {
    db.collection("projects").add({
      creator,
      createdTime: Date.now(),
      name: e.currentTarget.name.value,
      purpose: e.currentTarget.purpose.value,
      format,
      referenceImages
    })
    .then(ref => {
      window.location.href = "/workspace";
    });
  } if (e.currentTarget.name.value.length == 0) {
    alert("Project name is required to create a project");
  } if (e.currentTarget.name.value.length > 20) {
      alert("Please limit the project name whithin 20 characters")
  }

  }

  const [imageURLs, setImageURLs] = useState([]);

  const uploadFile = e => {
    const file = e.currentTarget.files[0];
    const metadata = {
      contentType: "image/jpeg"
    };
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const uploadTask = storageRef
      .child("images/" + file.name)
      .put(file, metadata);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
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
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          setImageURLs([...imageURLs, { downloadURL, fileName: file.name }]);
          fileInputEl.current.value = null
        });
      }
    );
  };

  const deleteReference = (imageKey) => () => {

  }

  let uploadImages;
  if (imageURLs.length !== 0) {
    const uploadImage = imageURLs.map(imageURL => (
      <div className="each-upload-picture-container" key={imageURL.fileName}>
        <div className="each-upload-title">
          <div className="survey-title each-upload-file-name">
            {imageURL.fileName}
          </div>
          <div className="delete-upload-container">
            <img className="delete-upload-picture" src={IconDelete} onClick={deleteReference(imageURL.fileName)} ref={deleteReference}/>
          </div>
        </div>
        <div className="each-upload-details">
          <div className="upload-picture-container">
            <img
              src={imageURL.downloadURL}
              className="upload-picture"
              key={imageURL.fileName}
            />
          </div>
          <div className="survey-upload-picture-explanation">
            <label>Notes</label>
            <textarea
              type="text"
              name={`note-${imageURL.fileName}`}
              className="survey-explanation-textarea"
            />
          </div>
        </div>
      </div>
    ));

    uploadImages = (
      <>{uploadImage}</>
    );
  }

  const [unsplashPopup, setUnsplashPopup] = useState({
    isPopup: false,
    display: "none"
  });

  return (
    <React.Fragment>
      <Header />
      <NavBar />
      {/* <UnsplashPopup style={{display:unsplashPopup.display}}/> */}
      <div className="survey-page">
        <div className="survey-container">
          <form className="survey-questions" onSubmit={handleSubmit}>
            <div className="survey-instruction">
              To begin with, tell us more about your idea...
            </div>
            <label htmlFor="name" className="survey-title project-name-title">
              Project Name*
              <Popup
                trigger={<img className="tooltip-icon" src={IconQuestion} />}
                position="right bottom"
                on="hover"
              >
                <div className="tooltip-context">
                  Give your project a special and easy-to-communicate name for
                  team members{" "}
                </div>
              </Popup>
            </label>
            <input type="text" name="name" className="survey-input" />
            {warning}
            <label
              htmlFor="purpose"
              className="survey-title project-purpose-title"
            >
              Project Purpose
              <Popup
                trigger={<img className="tooltip-icon" src={IconQuestion} />}
                position="right bottom"
                on="hover"
              >
                <div className="tooltip-context">
                  The reasons for having this project. Generally speaking, here
                  should specify,
                  <br />
                  1. The main goal to achieve with this design
                  <br />
                  2. The target audience
                  <br />
                  3. The target channels
                  <br />
                  4. Any special requirements and limitations
                </div>
              </Popup>
            </label>
            <textarea
              type="text"
              name="purpose"
              className="survey-input-textarea"
            />
            <label className="survey-title project-purpose-format">
              Required File Type
              <Popup
                trigger={<img className="tooltip-icon" src={IconQuestion} />}
                position="right bottom"
                on="hover"
              >
                <div className="tooltip-context">
                  Choose all the file types required
                </div>
              </Popup>
            </label>
            <div className="survey-radio-options">
              <label htmlFor="jpg" className="type-label">
                <input type="checkbox" name="type" value="jpg" id="jpg" />
                JPG
                <Popup
                  trigger={<img className="tooltip-icon" src={IconQuestion} />}
                  position="right bottom"
                  on="hover"
                >
                  <div className="tooltip-context">
                    JPG supports a full spectrum of colors, and alomost all
                    devices and programs can open and save it. It is ideal for
                    photos on the web, but not recommended to used for image
                    editing, line graphics, and print.
                  </div>
                </Popup>
              </label>
              <label htmlFor="png" className="type-label">
                <input type="checkbox" name="type" value="png" id="png" />
                PNG
                <Popup
                  trigger={<img className="tooltip-icon" src={IconQuestion} />}
                  position="right bottom"
                  on="hover"
                >
                  <div className="tooltip-context">
                    PNG supports millions of colors and varying degrees of
                    transparency. It is ideal for graphic image files, like
                    logos, charts, and infographics. Note that PNG is typically
                    larger than JPG and GIF.
                  </div>
                </Popup>
              </label>
              <label htmlFor="gif" className="type-label">
                <input type="checkbox" name="type" value="gif" id="gif" />
                GIF
                <Popup
                  trigger={<img className="tooltip-icon" src={IconQuestion} />}
                  position="right bottom"
                  on="hover"
                >
                  <div className="tooltip-context">
                    GIF is the smallest type with limited colors. It is ideal
                    for small and simple graphics, like Ad banners, simple
                    charts, buttons, and animation.
                  </div>
                </Popup>
              </label>
              <label htmlFor="tiff" className="type-label">
                <input type="checkbox" name="type" value="tiff" id="tiff" />
                TIFF
                <Popup
                  trigger={<img className="tooltip-icon" src={IconQuestion} />}
                  position="right bottom"
                  on="hover"
                >
                  <div className="tooltip-context">
                    TIFF preserves the image quality and enable editing. It is
                    ideal for storing photos that will be edited and for print.
                    Due to its file size, it's not recommended for images on the
                    web.
                  </div>
                </Popup>
              </label>
            </div>

            <label className="survey-title project-purpose-reference">
              Reference Picture
              <Popup
                trigger={<img className="tooltip-icon" src={IconQuestion} />}
                position="right bottom"
                on="hover"
              >
                <div className="tooltip-context">
                  Using reference pictures to elaborate the idea is a
                  straightfoward and powerful way. You may include pictures for
                  the style, format, and specific item of the design
                </div>
              </Popup>
            </label>
            <div className="upload-from-local">
              <label className="upload-title" htmlFor="uploadFromLocal">
                Upload from own device
              </label>
              <input
                ref={fileInputEl}
                type="file"
                className="survey-upload-file"
                accept=".jpg,.jpeg,.png"
                onChange={uploadFile}
              />
            </div>
            <Popup
              trigger={
                <div className="upload-from-unsplash upload-title">
                  Upload from Unsplash
                </div>
              }
              position="right center"
              modal
            >
              <div>Popup content here !!</div>
            </Popup>
            {/* <div className="upload-from-unsplash upload-title" >
              Upload from Unsplash
            </div> */}
            <br />

            {uploadImages}

            {/* <label
              htmlFor="member"
              className="survey-title project-member-invite"
            >
              Project Team Member
              <Popup
                trigger={<img className="tooltip-icon" src={IconQuestion} />}
                position="right bottom"
                on="hover"
              >
                <div className="tooltip-context">
                  Invite related members by their accont email to authorize them
                  to see and edit project
                </div>
              </Popup>
            </label>
            <input type="text" name="member" className="survey-input" /> */}

            <div className="survey-buttons">
              <input
                type="reset"
                value="Reset"
                className="survey-button survey-button-reset"
              />
              <button className="survey-button survey-button-save" onClick={handleSaveLeave}>
                Save and leave
              </button>
              <input
                type="submit"
                value="Submit to Create"
                className="survey-button survey-button-submit"
              />
            </div>
          </form>
        </div>

        {/* <progress value="0" max="100" className="uploader">0%</progress> */}
      </div>

      <Footer />
    </React.Fragment>
  );
};
export default Survey;
