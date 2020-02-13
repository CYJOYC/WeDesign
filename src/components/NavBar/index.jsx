import React, { useState, useEffect, useContext } from "react";
import { Survey } from "../../pages/Survey";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { ProjectContext } from "../../contexts/ProjectID";

const NavBar = () => {
  const context = useContext(ProjectContext);

  //   const [projects, setProjects] = useState(null);
  //const [projectID, setProjectID] = useState([{ id: "" }]);
  let projectID = null;
  if (location.search.length == 21) {
    projectID = location.search.slice(1);
  }
  useEffect(() => {
    if (projectID !== null) {
      const db = firebase.firestore();
      const docRef = db.collection("projects").doc(projectID);
      console.log("should not run")
      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log("data:", doc.data());
            context.setProject({ data: doc.data() });
          } else {
            console.log("no data");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
       
    } else {
        console.log("check check")
    }
  }, [projectID]);

  let projectPath;
  if (context.project !== null){
//   if (location.search !== null) {
    console.log(context);
    projectPath = <li>/&nbsp;{context.project.data.name}</li>;
  }
  return (
    <React.Fragment>
      <div className="nav-bar">
        <ul className="nav-bar-item">
          <Link to="/Workspace" className="workspace-direct">
            <li>Workspace</li>
          </Link>
          {projectPath}
        </ul>
      </div>
      {/* <Survey addTitle={addTitle}/> */}
    </React.Fragment>
  );
};

export default NavBar;
