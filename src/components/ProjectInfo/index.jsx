import React, { useState, useContext } from "react";
import "firebase/storage";
import { ProjectContext } from "../../contexts/ProjectID";

const ProjectInfo = () => {
  const context = useContext(ProjectContext);
  const [detailShow, setDetailShow] = useState({
    isToggleOn:true,
    display:"block"
  });

  const handleClick = ()=>{
    setDetailShow({isToggleOn:!detailShow.isToggleOn,
    display: detailShow.isToggleOn? "none":"block"})
  }

  let projectFormat;
  if (context.project !== null) {
    //   if (location.search !== null) {
    console.log(context);
    projectFormat = 
    <>
    <div className="project-info-name">Project name:&nbsp;{context.project.data.name}</div>
    <div className="project-info-purpose">Project format:&nbsp;{context.project.data.purpose}</div>
    <div className="project-info-format">Project format:&nbsp;{context.project.data.format}</div>
    <a className="project-info-image">Project reference picture:</a><br/>
    <img className="project-info-image" src={context.project.data.referenceImages.downloadURL}/>
    </>

    
  }

  return (
    <React.Fragment>
      <div className="project-information">
      <div className="project-information-button" onClick={handleClick}>
        Project Information
      </div>
      <div className="project-information-details" style={{display:detailShow.display}}>
      {projectFormat}
      </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectInfo;
