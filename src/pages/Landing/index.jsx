import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import canvas from "../../assets/canvas2.jpeg";
import PaintingLine from "../../assets/painting-line.png";

export default class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="landing-main">
        
          <img src={canvas} className="landing-main-image" />
          <div className="landing-main-content">
            <div className="landing-main-content-text">
              CANVAS <br />
              where you realize your idea
            </div>
            <img
              src={PaintingLine}
              className="landing-main-content-background"
            />
            {/* <Link to="/login" className="landing-main-content-action-container">
              <button className="landing-main-content-action">Start Now</button>
            </Link> */}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
