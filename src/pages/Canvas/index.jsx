import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import VersionControl from "../../components/VersionControl";
import ProjectInfo from "../../components/ProjectInfo";
import MainDesign from "../../components/MainDesign";

const Canvas = () => {
  return (
    <React.Fragment>
      <Header />
      <NavBar />
      <div className="canvas-main">
        <VersionControl />
        <div className="canvas">
          <ProjectInfo />
          <MainDesign />
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};
export default Canvas;
