import React, { useState, useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectID";
import { UserContext } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/storage";

const ProjectMember = () => {
  const context = useContext(UserContext);
  const projectContext = useContext(ProjectContext);
  const userName = context.userInfo.displayName;
  const userPicture = context.userInfo.photoURL;
  const db = firebase.firestore();
  let projectID;
  if (location.search.length == 21) {
    projectID = location.search.slice(1);
  }
  const [input, setInput] = useState({
    email: ""
  });
  const [inputCheck, setInputCheck] = useState({
    warning: ""
  });
  let projectMembersList;
  if (projectContext.project !== null){
    if (projectContext.project.data.members.length != 0){
      console.log(projectContext.project.data.members);
      const eachProjectMember = projectContext.project.data.members.map(member => (
        <div className="project-member-data" key={member.uid}>
          <img className="project-member-picture" src={member.photoURL} />
          <div className="project-member-name">{member.displayName}</div>
        </div>
      ));
      projectMembersList = <>{eachProjectMember}</>
    }
  }

  const handleInputChange = e => {
    e.persist();
    setInput({ email: e.currentTarget.value });
    setInputCheck({ warning: "" });
  };

  const handleInvitationSumbit = e => {
    e.preventDefault();
    console.log(e.currentTarget.invitedEmail.value);
    const userRef = db.collection("users");
    const projectRef = db.collection("projects").doc(projectID);
    const query = userRef.where(
      "email",
      "==",
      e.currentTarget.invitedEmail.value
    );

    const addTeamMember = friend => {
      const id = friend.id;
      const friendData = friend.data();
      const userRef = db.collection("users").doc(id);
      userRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log(doc.data().projects);
            const projects = Array.from(doc.data().projects);
            if (projects.includes(projectID) === false) {
              projects.push(projectID);
            }else{
              setInputCheck({
                warning:
                  "The member is already invited."
              });
            }
            userRef.set({ projects }, { merge: true });
            projectRef.get().then(function(doc){
              const members = Array.from(doc.data().members);
              if (members.includes(friendData) === false) {
                console.log(friendData)
                members.push(friendData);
              }
              projectRef.set({...doc.data(), members}, {merge:true});
            })
          }
          setInput({ email: "" });
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    };

    const findDocID = () => {
      query.get().then(function(querySnapshot) {
        if (querySnapshot.docs.length == 0) {
          setInputCheck({
            warning:
              "There's no record of this member. Please check again, or invite him/her to sign up."
          });
          console.log("No such document!");
        } else {
          querySnapshot.forEach(function(doc) {
            addTeamMember(doc);
          });
        }
      });
    };

    findDocID();
  };

  return (
    <React.Fragment>
      <div className="team-member-container">
        <div className="team-member-invitation">
          <form
            onSubmit={handleInvitationSumbit}
            className="form-member-invitation"
          >
            <div className="invitation-text">
              Invite Project Member to This Project
            </div>
            <label htmlFor="invitedEmail">Email</label>
            <input
              type="text"
              name="invitedEmail"
              className="input-invited-email"
              value={input.email}
              onChange={handleInputChange}
            />
            <button type="submit" className="invite-submit">
              Invite
            </button>
          </form>
          <div className="invitation-input-warning">{inputCheck.warning}</div>
        </div>

        <div className="project-member-list">
          <div className="project-creator-container">
            <div className="project-creator-label">Project Creator:</div>
            <div className="project-creator-data">
              <img className="project-creator-picture" src={userPicture} />
              <div className="project-creator-name">{userName}</div>
            </div>
          </div>
          <div className="project-member-container">
            <div className="project-member-label">Project Member:</div>
            {projectMembersList}
            {/* <div className="project-member-data">
              <img className="project-member-picture" src={userPicture} />
              <div className="project-member-name">{userName}</div>
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectMember;
