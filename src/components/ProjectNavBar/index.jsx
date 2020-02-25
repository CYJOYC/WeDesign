import React, { useState, useContext, useEffect } from "react";
import ProjectInfo from "../../components/ProjectInfo";
import ProjectMember from "../../components/TeamMember";

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


  // show team member
  const [projectMember, setProjectMember] = useState({
    isShow: false
  });

  const handleProjectMember = () => {
    setProjectMember({
      isShow: !projectMember.isShow
    });
  };

  return (
    <>
      <div className="function-button">
        <div onClick={handleProjectShow}>Project Profile</div>
        <div onClick={handleProjectMember}>Team Member</div>
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