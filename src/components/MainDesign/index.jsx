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



    return(
        <div className="main-design-area">
            <VersionList/>
            <MainPinArea/>
            <NoteArea/>



        </div>


)

}

export default MainDesign;