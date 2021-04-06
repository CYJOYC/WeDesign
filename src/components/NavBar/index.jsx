import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { ProjectContext } from "../../contexts/ProjectID";




const NavBar = () => {
  const context = useContext(ProjectContext);
  const setProject = context.setProject;

  let projectID = null;
  if (location.search.length == 21) {
    projectID = location.search.slice(1);
  }
  useEffect(() => {
    if (projectID !== null) {
      const db = firebase.firestore();
      const docRef = db.collection("projects").doc(projectID);
      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            context.setProject({ data: doc.data() });
          } else {
            // console.log("no data");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
       
    } else {
        // console.log("check check")
    }
  }, [projectID]);

  let projectPath;
  if (context.project !== null){
    projectPath = <li>/&nbsp;{context.project.data.name}</li>;
  }

  const clearProjectName = () => {
    setProject(null)
  }

  return (
    <React.Fragment>
      <div className="nav-bar">
        <ul className="nav-bar-item">
          <Link to="/Workspace" className="workspace-direct" >
            <li onClick={clearProjectName}>Workspace</li>
          </Link>
          {projectPath}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
