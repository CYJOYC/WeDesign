import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { VersionContext } from "../../contexts/Version";
import { UserContext } from "../../contexts/AuthContext";
import ProjectInfo from "../ProjectInfo";
import PropTypes from "prop-types";
import Pin from "../../assets/icon-pin-noborder.png";
import SelectedPin from "../../assets/icon-pin-highlight.png";
import { callbackify } from "util";
import clsx from "clsx";
import "./mainPinArea.css";

const MainPinArea = ({
  pins,
  setPins,
  showAllPins,
  setShowAllPins,
  setSelectedPin,
  selectedPin
}) => {
  const db = firebase.firestore();
  const userContext = useContext(UserContext);
  const versionContext = useContext(VersionContext);
  const creator = userContext.userInfo.uid;
  let projectID;
  if (location.search.length == 21) {
    projectID = location.search.slice(1);
  }

  // show & hide pins

  const changePinsDisplay = () => {
    setShowAllPins({
      isAllPinsShown: !showAllPins.isAllPinsShown
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

  const handlePinClick = pinId => () => {
    setSelectedPin(pinId);
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
                checked: false,
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
          checked: false,
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
      console.log(selectedPin);
      const eachPinPosition = filteredPins.map(filteredPin => (
        <div
          // className="each-pin"
          className={clsx("each-pin", {
            selected: selectedPin === filteredPin.createdTime
          })}
          key={filteredPin.createdTime}
          style={{
            position: "absolute",
            top: `${filteredPin.relativeY}%`,
            left: `${filteredPin.relativeX}%`
            // width: "10px",
            // height: "10px",
            // backgroundColor: "#000",
            // backgroundImage:{Pin}
          }}
          onClick={handlePinClick(filteredPin.createdTime)}
        >
          <div className="pin"/>
          {/* <img src={Pin} className="pin" /> */}
        </div>
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
          className={`main-design-cover ${!showAllPins.isAllPinsShown &&
            "hide"}`}
          style={{ cursor: isPinOn.cursorDisplay }}
          onClick={handlePinOnPicture}
        >
          {allPinsPosition}
        </div>
      </div>
    );
  }

  return (
    <div className="main-design-center">

      {versionContext.showVersion != 0 ? 
      <div className="pin-function">
        <div
          className={`pin-button ${isPinOn.pinStatus && "active"}`}
          onClick={handlePin}
        >
          <div
            className="pin-button-text"
          >
            Pin a Comment
          </div>
        </div>
        <div className="pin-toggle-container">
          <input
            type="checkbox"
            className="toggle-slider"
            id="displayPins"
            name="displayPins"
            checked={showAllPins.isAllPinsShown}
            onChange={changePinsDisplay}
          />
          <label
            className="checkbox-displaypins"
            htmlFor="displayPins"
            style={{ color: showAllPins.isAllPinsShown ? "#D63864" : "black" }}
          >
            Display All Pins
          </label>
        </div>
      </div>

      : <div className="select-design-text">Please select a design or upload one from the left side panel</div>}

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
