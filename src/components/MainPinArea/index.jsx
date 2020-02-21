import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { VersionContext } from "../../contexts/Version";
import { UserContext } from "../../contexts/AuthContext";
import ProjectInfo from "../ProjectInfo";

const MainPinArea = () => {
  const db = firebase.firestore();
  const userContext = useContext(UserContext);
  const versionContext = useContext(VersionContext);
  const creator = userContext.userInfo.uid;
  let projectID;
  if (location.search.length == 21) {
    projectID = location.search.slice(1);
  }

  // show projectProfile
  const [projectProfile, setProjectProfile] = useState({
    isShow: false
  });

  const handleProjectShow = () => {
    setProjectProfile({
      isShow: !projectProfile.isShow
    });
  };

  // show and hide all pins

  const [allPinsStatus, setAllPinsStatus] = useState({
    pinsOn: true,
    display: "block"
  });

  const showPins = () => {
    setAllPinsStatus({
      pinsOn: true,
      display: "block"
    });
  };

  const hidePins = () => {
    setAllPinsStatus({
      pinsOn: false,
      display: "none"
    });
  };

  // save pins data

  const [pins, setPins] = useState([]);

  useEffect(() => {
    const projectsRef = db.collection("projectPins").doc(projectID);
    projectsRef.get().then(doc => {
      if (doc.data().pins != undefined) {
        setPins(doc.data().pins);
      }
    });
  }, [true]);

  // pin function

  const [isPinOn, setIsPinOn] = useState({
    pinStatus: false,
    cursorDisplay: "auto"
  });

  const handlePin = () => {
    setIsPinOn({
      pinStatus: !isPinOn.pinStatus,
      cursorDisplay: isPinOn.pinStatus ? "auto" : "crosshair"
    });
  };

  const handlePinOnPicture = e => {
    if (isPinOn.pinStatus == true) {
      const rect = e.currentTarget.getBoundingClientRect();
      const rectHeight = rect.bottom - rect.top;
      const rectWidth = rect.right - rect.left;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const relativeX = (x / rectWidth) * 100;
      const relativeY = (y / rectHeight) * 100;
      console.log(pins);
      const dbLinkForPins = db.collection("projectPins").doc(projectID);
      dbLinkForPins
        .set(
          {
            pins: [
              ...pins,
              {
                version: versionContext.showVersion,
                relativeX,
                relativeY,
                creator,
                createdTime: Date.now()
              }
            ]
          },
          { merge: true }
        )
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });

      setPins([
        ...pins,
        {
          version: versionContext.showVersion,
          relativeX,
          relativeY,
          creator,
          createdTime: Date.now()
        }
      ]);
      console.log(relativeX, relativeY);
    } else {
      return;
    }
  };

  // process pins for rendering

  let allPinsPosition;
  if (versionContext) {
    const filteredPins = pins.filter(pin => {
      return pin.version == versionContext.showVersion;
    });
    console.log(`this is filtered ${filteredPins}`);
    if (filteredPins.length != 0) {
      const eachPinPosition = filteredPins.map(filteredPin => (
        <div
          className="each-pin"
          key={filteredPin.createdTime}
          style={{
            position: "absolute",
            top: `${filteredPin.relativeY}%`,
            left: `${filteredPin.relativeX}%`,
            width: "5px",
            height: "5px",
            backgroundColor: "#000"
          }}
        />
      ));
      allPinsPosition = <>{eachPinPosition}</>;
    }
  }

  // render picture and pins

  let designPicture;
  if (versionContext.length != 0) {
    designPicture = (
      <div className="main-design-container">
        <img
          src={versionContext.showVersion}
          className="main-design-picture"
          style={{ cursor: isPinOn.cursorDisplay }}
          onClick={handlePinOnPicture}
        />
        <div
          className="main-design-cover"
          onClick={handlePinOnPicture}
          style={{ display: allPinsStatus.display }}
        >
          {allPinsPosition}
        </div>
      </div>
    );
  }

  return (
    <div className="main-design-center">

      <div className="pin-function">
        {/* <div onClick={handleProjectShow}>Project Profile</div>
        <div>Team Member</div> */}
        <div className="pin-button-each" onClick={handlePin}>Pin</div>
        <div className="pin-button-each" onClick={showPins}>Show All Pins</div>
        <div className="pin-button-each" onClick={hidePins}>Hide All Pins</div>
      </div>
      {/* <div className={`project-information ${!projectProfile.isShow && 'hide'}`}>
        <ProjectInfo />
      </div> */}
      <div className="main-design-background">{designPicture}</div>
    </div>
  );
};

export default MainPinArea;
