import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import firebase from "firebase/app";
import "firebase/storage";
import { Prompt } from "react-router";
import IconDelete from "../../assets/icon-delete.png";

const Survey = () => {
    const db = firebase.firestore();


    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.name.value);
        db.collection('projects').add({
            name: e.currentTarget.name.value,
            purpose: e.currentTarget.purpose.value,
            format: e.currentTarget.format.value,
            referenceURL: imageURLs,
           
        }).then((ref)=>{
            window.location.href = "/canvas?"+ref.id;
        });
        
    }

    const [imageURLs, setImageURLs] = useState([]);

    const uploadFile = (e) => {
        const file = e.currentTarget.files[0];
        const metadata = {
            contentType: 'image/jpeg'
        };
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const uploadTask = storageRef.child('images/'+file.name).put(file,metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
              }, function(error) {
            
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
            
                case 'storage/canceled':
                  // User canceled the upload
                  break;
            
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            }, function() {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                setImageURLs([...imageURLs, downloadURL]);
              });
            });
    }

    let uploadImages;
    if (imageURLs.length !== 0){
        
        const uploadImage = imageURLs.map(imageURL => (
            <>
            <div className="survey-upload-picture-container"> 
            <label className="survey-title survey-upload-picture-explanation" >Explanation</label>
            <textarea type="text" name="explanation" className="survey-explanation-textarea" />
            </div>
            <img src={imageURL} className="survey-upload-picture" key={imageURL}/>
            <img className="delete-survey-upload-picture" src={IconDelete} />
            
            </>
          ));

        uploadImages=
        <div className="each-survey-upload-picture">
            {uploadImage}
            </div>
       

    }

    


  
      return (
        <React.Fragment>

          <Header/>
          <NavBar/>
          <div className="survey-page">
              <div className="survey-container">
              <form className="survey-questions" onSubmit={handleSubmit}>
                  <div className="survey-instruction">To begin with, tell us more about your idea...</div>
              <label className="survey-title project-name-title">Project Name</label><input type="text" name="name" className="survey-input"/>
                  <label className="survey-title project-purpose-title">Project Purpose</label><textarea type="text" name="purpose" className="survey-input-textarea" />
                  <label className="survey-title project-purpose-format">Project Format</label>
                  <div className="survey-radio-options">
                      <label>
                          <input type="radio" name="format" value="jpg"/>jpg
                      </label>
                      <label>
                          <input type="radio" name="format" value="png"/>png
                      </label>
                      <label>
                          <input type="radio" name="format" value="gif"/>gif
                      </label>
                  </div>

                <label className="survey-title project-purpose-reference">Reference Picture</label>
                <input type="file" className="survey-upload-file" accept=".jpg,.jpeg,.png" onChange={uploadFile}/><br/>
               
                {uploadImages}
           
                    <div className="survey-buttons">
                    <input type="reset" value="Reset" className="survey-button survey-button-reset"/>
                    <button value="Save" className="survey-button survey-button-save">Save and leave</button>
                  <input type="submit" value="Submit to Create" className="survey-button survey-button-submit"/>
                  </div>
                  
              </form>
              </div>
              
              {/* <progress value="0" max="100" className="uploader">0%</progress> */}
              
          </div>
         
          <Footer/>
  
  
          
        </React.Fragment>
      )
    
    
}
export default Survey;
  