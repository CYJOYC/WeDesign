import React, { useState, useContext, useEffect } from "react";
import ProjectInfo from "../../components/ProjectInfo";
import ProjectMember from "../../components/TeamMember";
import IconOpen from "../../assets/icon-open.png";
import "./projectNavBar.css";

const ProjectNavBar = () => {


  // show projectProfile
  const [projectProfile, setProjectProfile] = useState({
    isShow: false
  });

  const handleProjectShow = () => {
    setProjectProfile({
      isShow: !projectProfile.isShow
    });
    setProjectMember({
      isShow: false
    });
  };


  // show team member
  const [projectMember, setProjectMember] = useState({
    isShow: false
  });

  const handleProjectMember = () => {
    setProjectMember({
      isShow: !projectMember.isShow
    });
    setProjectProfile({
      isShow: false
    });
  };


const handleCloseAll = () => {
  setProjectMember({
    isShow: false
  });
  setProjectProfile({
    isShow: false
  });
}



  return (
    <>
      <div className="function-button">
        <div onClick={handleProjectShow} className="button-project" style={{color:projectProfile.isShow?"#D63684":"#fff", fontWeight: projectProfile.isShow?"bold":"normal"}}>Project Profile</div>
        <div onClick={handleProjectMember} className="button-member" style={{color:projectMember.isShow?"#D63684":"#fff", fontWeight: projectMember.isShow?"bold":"normal"}}>Team Member</div>
        <div className="button-fold">
          {projectProfile.isShow || projectMember.isShow ?
          
          <img className="icon-fold" src={IconOpen} style={{ transform: "rotate(180deg)"}} onClick={handleCloseAll} />
          :
          <img className="icon-fold" src={IconOpen} style={{ transform:"rotate(0deg)"}} onClick={handleProjectShow}/>
}
          </div>
      </div>
      <div className={`project-information ${!projectProfile.isShow && 'hide'}`}>
        <ProjectInfo />
      </div>
      <div className={`project-information ${!projectMember.isShow && 'hide'}`}>
        <ProjectMember />
      </div>
    </>
  );
}

export default ProjectNavBar;