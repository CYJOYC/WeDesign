import React, { useState, useContext } from "react";
import "firebase/storage";
import { ProjectContext } from "../../contexts/ProjectID";
import IconEdit from "../../assets/icon-edit.png";

const ProjectInfo = () => {
  const context = useContext(ProjectContext);

  let projectProfile;
  if (context.project !== null) {
    //   if (location.search !== null) {
    console.log(context);

    const projectFormat = context.project.data.format.toString();
    const referencesImages = context.project.data.referenceImages;
    const referenceEach = referencesImages.map(referencesImage => (
      <div className="profile-reference-each" key={referencesImage.downloadURL}>
        <div className="profile-reference-each-image-container">
          <img
            className="profile-reference-each-image"
            src={referencesImage.downloadURL}
          />
        </div>
        <div className="profile-reference-each-description">
          <div className="profile-reference-each-name">
            <b>{referencesImage.fileName}</b>
          </div>
          <div className="profile-reference-each-note">
            {referencesImage.note}
          </div>
        </div>
      </div>
    ));
    const referencesAll = <>{referenceEach}</>;

    // const URL = context.project.data.referenceImages[0].downloadURL;
    projectProfile = (
      <>
        <div className="project-info-part1">
          <div className="project-info-name">
            <b>Project name:</b>&nbsp;{context.project.data.name}
          </div>
          <div className="project-info-purpose">
            <b>Project format:</b>&nbsp;{context.project.data.purpose}
          </div>
          <div className="project-info-format">
            <b>Project format:</b>&nbsp;{projectFormat}
          </div>
        </div>
        <div className="project-info-part2">
          <b>Project reference picture:</b>
          <div className="profile-reference-images">
            {referencesAll}
            {/* <img className="project-info-image" src={URL} /> */}
          </div>
        </div>
        {/* <img className="project-info-edit" src={IconEdit} /> */}
      </>
    );
  }

  return (
    <React.Fragment>
      
        <div className="project-information-details">{projectProfile}</div>
    
    </React.Fragment>
  );
};

export default ProjectInfo;
