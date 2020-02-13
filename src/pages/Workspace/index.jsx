import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import DemoPicture from "../../assets/index-picture-1.jpeg";
import IconAdd from "../../assets/add-button.png";
import IconDelete from "../../assets/icon-delete.png";
import { Link } from "react-router-dom";
// import { UserContext } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import { ProjectContext } from "../../contexts/ProjectID";


const Workspace = () => {
  const [projects, setProjects] = useState([]);
  const projectContext = useContext(ProjectContext);
  const db = firebase.firestore();

  useEffect(() => {
    projectContext.setProject(null);
    db.collection("projects")
      .get()
      .then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          console.log(doc.data().name);
          data.push({ id: doc.id, project: doc.data() });
        });
        console.log(data);
        setProjects(data);
      });
  }, [true]);

  const deleteProject = (id) => () => {
    
    db.collection("projects").doc(id).delete().then(function(){
      console.log("successfully deleted");
    }).catch(function(error){
      console.log(error);
    });
    db.collection("projects")
      .get()
      .then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          console.log(doc.data().name);
          data.push({ id: doc.id, project: doc.data() });
        });
        console.log(data);
        setProjects(data);
      });
  }

  const projectsName = projects.map(project => (
    <div className="project-each" key={project.id}>
      <img src={IconDelete} className="delete-project" onClick={deleteProject(project.id)} />
      <Link to={{
        pathname:"/canvas", 
        search:project.id,
        state:{project:project.id}
        }}>
      <div className="project-background">
        <img src={DemoPicture} className="project-picture" />
        <div className="project-name" >{project.project.name}</div>
      </div>
      </Link>
    </div>
  ));

  

  return (
    <React.Fragment>
      <Header />
      <NavBar />
      <div className="workspace">
        <div className="add-project-background">
        <Link to="/survey" className="add-project">
          <div >Add New Project</div>
          {/* <img src={IconAdd} className="add-project" /> */}
        </Link>
        </div>
        <div className="projects">
          <div className="project-each">
            <img src={IconDelete} className="delete-project" />
            <div className="project-background">
              <img src={DemoPicture} className="project-picture" />
              <div className="project-name">Demo Project</div>
            </div>
          </div>
          {projectsName}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Workspace;
