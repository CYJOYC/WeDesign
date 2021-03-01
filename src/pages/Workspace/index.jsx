import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import DemoPicture from "../../assets/index-picture-1.jpeg";
import IconAdd from "../../assets/icon-add-white-bold.png";
import IconDelete from "../../assets/icon-delete.png";
import Logo from "../../assets/logo.png";
import "./workspace.css";

import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { ProjectContext } from "../../contexts/ProjectID";
import { UserContext } from "../../contexts/AuthContext";

const Workspace = () => {
  const [projects, setProjects] = useState([]);
  const [fetching, setFetching] = useState({ isFetching: true });
  const projectContext = useContext(ProjectContext);
  const userContext = useContext(UserContext);
  const userID = userContext.userInfo.uid;
  const db = firebase.firestore();
  let projectID;
  if (location.search.length == 21) {
    projectID = location.search.slice(1);
  }
  let projectsList;

  // const getProjectsData = new Promise((i)) => {

  // }

  // useEffect(() => {
  //   // let projectsData = [];
  //   async function getProjectData(){

  //     const userRef = db.collection("users").doc(userID);
  //     userRef
  //       .get()
  //       .then(function(doc) {
  //         let projectsData = [];
  //         projectsList = Array.from(doc.data().projects);
  //         for (let i = 0; i < projectsList.length; i++) {
  //           const projectRef = db.collection("projects").doc(projectsList[i]);
  //           projectRef.get().then(function(doc) {
  //             if (doc.exists) {
  //               if (doc.data().versionImages !== undefined) {
  //                 const versionImagesIndex = doc.data().versionImages.length;
  //                 projectsData.push({
  //                   id: doc.id,
  //                   name: doc.data().name,
  //                   project: doc.data().versionImages[versionImagesIndex - 1]
  //                 });
  //                 console.log(projectsData);
  //                 // return projectsData
  //                 // setProjects({ projectsData })
  //               } else {
  //                 projectsData.push({ id: doc.id, name: doc.data().name, project: "" });
  //                 console.log(projectsData);
  //                 // return projectsData
  //                 // setProjects({ projectsData })
  //               }
  //             }
  //             console.log("1")

  //             const setProjectsData = await setProjectsData(projectsData);
  //           });
  //         }
  //       })

  //   }

  //   if (userID !== ""){
  //     getProjectData();
  //   }

  //       .then(projectsData => setProjects({ projectsData }))
  //       .then(() => console.log('done'))
  //       .then(() => setFetching({ isFetching: false }));

  // }, [userContext]);

  useEffect(() => {
    async function fetchProjects() {
      if (userID !== "") {
        const userRef = db.collection("users").doc(userID);
        const userDoc = await userRef.get();
        const userProjects = await Promise.all(
          userDoc.data().projects.map(async projectID => {
            const projectRef = db.collection("projects").doc(projectID);
            const projectDoc = await projectRef.get();
            const id = projectDoc.id;
            const {  name, versionImages } = projectDoc.data();
            console.log(id, name, versionImages);
            return {
              id,
              name,
              image: versionImages
                ? versionImages[versionImages.length - 1]
                : ""
            };
          })
        );
        console.log(userProjects);
        setProjects({ projectsData: userProjects });
        setFetching({ isFetching: false });
      }
    }
    fetchProjects();
  }, [userContext]);

  const deleteProject = id => () => {
    db.collection("projects")
      .doc(id)
      .delete()
      .then(function() {
        console.log("successfully deleted");
      })
      .catch(function(error) {
        console.log(error);
      });
    projectContext.setProject(null);
    const projectsRef = db.collection("projects");

    projectsRef
      .orderBy("createdTime")
      .get()
      .then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          console.log(doc.data().name);
          data.push({ id: doc.id, name: doc.data().name, project: doc.data() });
        });
        console.log(data);
        setProjects(data);
      });
  };

  let projectsName;
  if (!fetching.isFetching) {
    // projectsName="hello"
    console.log("projects.projectsData");
    console.log(projects.projectsData);
    console.log(fetching.isFetching);
    const projectName = projects.projectsData.map(project => (
      <div className="project-each" key={project.id}>
        <img
          src={IconDelete}
          className="delete-project"
          onClick={deleteProject(project.id)}
        />
        <Link
          to={{
            pathname: "/canvas",
            search: project.id,
            state: { project: project.id }
          }}
          className="project-background"
        >
          <div className="project-image-container">
            {project.image?
            <img src={project.image.imageURL} className="project-picture" />
            :<img src={Logo} className="project-picture"/>
          }
            
          </div>
          <div className="project-name">{project.name}</div>
        </Link>
      </div>
    ));
    projectsName = <>{projectName}</>;
  }

  return (
    <React.Fragment>
      <Header />
      <NavBar />
      <div className="workspace">
        <div className="add-project-background">
          <Link to="/survey" className="add-project">
            <img src={IconAdd} className="icon-add" />
            <div className="text-add">Add Project</div>
          </Link>
        </div>
        {fetching.isFetching ? (
          <div>Loading...</div>
        ) : (
          <div className="projects">{projectsName}</div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Workspace;
