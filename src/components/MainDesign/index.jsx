import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { VersionContext } from "../../contexts/Version";
import { UserContext } from "../../contexts/AuthContext";
import ProjectInfo from "../ProjectInfo";
import VersionList from "../VersionList";
import MainPinArea from "../MainPinArea";
import NoteArea from "../../components/NoteArea";



const MainDesign = () => {
    const db = firebase.firestore();
    let projectID;
    if (location.search.length == 21) {
      projectID = location.search.slice(1);
    };
    const [newPin, setNewPin] = useState({
        isNewPin:false,
        relativeY:"",
        createdTime:""
    });

    const [pins, setPins] = useState([]);

    const [showAllPins, setShowAllPins] = useState({
        isAllPinsShown:false,
    })

    const [selectedPin, setSelectedPin] = useState('')

    useEffect(() => {
      const projectsRef = db.collection("projectPins").doc(projectID);
      projectsRef.get().then(doc => {
        if (doc.data().pins != undefined) {
          setPins(doc.data().pins);
        }
      });
    }, [true]);

    
    return(
        <div className="main-design-area">
            <VersionList/>
            <MainPinArea
                pins={pins}
                setSelectedPin={setSelectedPin}
                selectedPin={selectedPin}
                setPins={setPins}
                showAllPins={showAllPins}
                setShowAllPins={setShowAllPins}
            />
            <NoteArea
                pins={pins}
                setSelectedPin={setSelectedPin}
                selectedPin={selectedPin}
                setPins={setPins}
                showAllPins={showAllPins}
                setShowAllPins={setShowAllPins}
            />



        </div>


)

}

export default MainDesign;