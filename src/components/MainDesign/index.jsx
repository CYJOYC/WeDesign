import React, { useState, useContext , useEffect} from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/storage";
import { VersionContext } from "../../contexts/Version";
import { UserContext } from "../../contexts/AuthContext";
import IconPin from "../../assets/icon-pin.png";


const MainDesign = () => {
    const db = firebase.firestore();
    const userContext = useContext(UserContext);
    const creator = userContext.userInfo.uid;

  const [isPinOn, setIsPinOn] = useState({
    pinStatus: false,
    cursorDisplay: "auto",
  });

  const [pins, setPins] = useState([]);



  const context = useContext(VersionContext);
  let designPicture;

  const handlePin = () => {
    setIsPinOn({
      pinStatus: !isPinOn.pinStatus,
      cursorDisplay: isPinOn.pinStatus ? "crosshair" : "auto"
    });
  };

  const handlePinOnPicture = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;
    setPins(...pins, {x,y, creator, createdTime: Date.now()})
    console.log(x, y);
  };

  useEffect(() => {

    db.collection("projectPins").add({
        pins
        
      })
      
  }, [pins]);


  

  if (context.length != 0) {
    designPicture = (
      <img
        src={context.showVersion}
        className="main-design-picture"
        style={{ cursor: isPinOn.cursorDisplay }}
        onClick={handlePinOnPicture}
      />
    );
  }
  return (
    <>
      <img className="icon-pin" src={IconPin} onClick={handlePin} />
      <div className="main-design-background">{designPicture}</div>
    </>
  );
};

export default MainDesign;
