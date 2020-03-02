import React, { useState, useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectID";
import { UserContext } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/storage";

const ProjectMember = () => {
  const context = useContext(UserContext);
  const userName = context.userInfo.displayName;
  const userPicture = context.userInfo.photoURL
  console.log(context)
  // let userName;

  // if (context.project !== null){
  //   const userUID = context.project.data.creator;
  //   const userRef = db.collection("users").doc(userUID);
  //   userRef
  //     .get()
  //     .then(function(doc) {
  //       if (doc.exists) {
  //         console.log( doc.data().displayName)
  //         userName = doc.data().displayName;
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     });
  // }
  
  

  const handleInvite = e => {
    e.preventDefault();
    console.log(e.currentTarget.invitedEmail.value);
  };
  

  return (
    <React.Fragment>
      <div className="team-member-container">
        <div className="team-member-invitation">
          <form onSubmit={handleInvite} className="form-member-invitation">
            <div className="invitation-text">
              Invite Team Member to This Project
            </div>
            <label htmlFor="invitedEmail">Email</label>
            <input
              type="text"
              name="invitedEmail"
              className="input-invited-email"
            />
            <button type="submit" className="invite-submit">
              Invite
            </button>
          </form>
        </div>

        <div className="team-member-list">
          <div className="project-creator">Project Creator:</div>
          <div className="project-creator-data">
          <img className="project-creator-picture" src={userPicture}/>
          <div className="project-creator-name">{userName}</div>
          </div>
          <div className="project-memeber"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectMember;
