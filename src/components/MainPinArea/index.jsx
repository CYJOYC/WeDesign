import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { VersionContext } from "../../contexts/Version";
import { UserContext } from "../../contexts/AuthContext";
import ProjectInfo from "../ProjectInfo";
import PropTypes from 'prop-types';

const MainPinArea = ({ pins, setPins, showAllPins, setShowAllPins }) => {
  const db = firebase.firestore();
  const userContext = useContext(UserContext);
  const versionContext = useContext(VersionContext);
  const creator = userContext.userInfo.uid;
  let projectID;
  if (location.search.length == 21) {
    projectID = location.search.slice(1);
  };

 // show & hide pins

  const showPins = () => {
    setShowAllPins({
      isAllPinsShown:true,
    });
  };

  const hidePins = () => {
    setShowAllPins({
      isAllPinsShown:false,
    });
  };



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
      // console.log(pins);
      // setNewPin({isNewPin:true,relativeY,createdTime:Date.now()});

      // props.onClick();



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
          className={`main-design-cover ${!showAllPins.isAllPinsShown && 'hide'}`}
          onClick={handlePinOnPicture}
         
          // style={{ display: allPinsStatus.display }}
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



// MainPinArea.prototype = {
//   isPins:PropTypes.bool.isRequired,
//   pins:PropTypes.array.isRequired,
//   isNewPin: PropTypes.bool.isRequired,
//   setNewPin: PropTypes.func,
//   setPins: PropTypes.func.isRequired,
//   onClick: PropTypes.func.isRequired,
// }

export default MainPinArea;

