import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import MainDesign from "../../components/MainDesign";
import ProjectNavBar from "../../components/ProjectNavBar";

const Canvas = () => {
  return (
    <React.Fragment>
      <Header />
      <NavBar />
      <div className="canvas-page">
        <ProjectNavBar />
        <MainDesign />
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Canvas;
