import React, { useState, useContext, useEffect } from "react";
import ProjectInfo from "../../components/ProjectInfo";


const ProjectNavBar = () => {


  // show projectProfile
  const [projectProfile, setProjectProfile] = useState({
    isShow: false
  });

  const handleProjectShow = () => {
    setProjectProfile({
      isShow: !projectProfile.isShow
    });
  };

  return (
    <>
      <div className="function-button">
        <div onClick={handleProjectShow}>Project Profile</div>
        <div>Team Member</div>
      </div>
      <div className={`project-information ${!projectProfile.isShow && 'hide'}`}>
        <ProjectInfo />
      </div>
    </>
  );
}

export default ProjectNavBar;