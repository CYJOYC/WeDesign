import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { VersionContext } from "../../contexts/Version";
import { UserContext } from "../../contexts/AuthContext";
import ProjectInfo from "../ProjectInfo";
import PropTypes from 'prop-types';


const NoteArea = ({ pins, setPins, showAllPins, setShowAllPins }) => {
    const versionContext = useContext(VersionContext);
    const db = firebase.firestore();
    let projectID;
    if (location.search.length == 21) {
      projectID = location.search.slice(1);
    };

    const handleNote = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.key.value)
        
        const pinsRef = db.collection("projectPins");
        const query = pinsRef.where("createdTime", "==", e.currentTarget.key.value)
        query
        .get()
        .then(function(querySnapshot) {
            
                console.log(doc.data());
  
           
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    let allNotes;
    if (versionContext) {
      const filteredPins = pins.filter(pin => {
        return pin.version == versionContext.showVersion;
      });
    //   console.log(`this is filtered ${filteredPins}`);
      if (filteredPins.length != 0) {
        const eachNote = filteredPins.map(filteredPin => (
               
            <form onSubmit={handleNote} key={filteredPin.createdTime}>
                <div className="each-note"></div>
                <label>Write your note here</label>
                <input type="hidden" name="key" value={filteredPin.createdTime}/>
                <input type="text" name="opinion"/>
                <button type="submit" >Comment</button>
               
            </form>

        ));
        allNotes = <>{eachNote}</>;
      }
    }


    return(
        <>

        <div  className={`note-for-pin ${!showAllPins.isAllPinsShown && 'hide'}`}>
        {allNotes}
            </div>
        
        
        
        </>
    )

}


// NoteArea.prototype = {
//     isNewPin: PropTypes.bool.isRequired,
//     onClick: PropTypes.func.isRequired,
// }

export default NoteArea;