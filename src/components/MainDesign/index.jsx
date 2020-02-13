import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/storage";
import { VersionContext } from "../../contexts/Version";


const MainDesign = () => {
    const context = useContext(VersionContext);
    let designPicture;

    if(context.length != 0){
        designPicture = (
            <img src={context.showVersion} className="main-design-picture"/>
        )
    }
    return(
        <div className="main-design-background">{designPicture}</div>
    )
}

export default MainDesign;