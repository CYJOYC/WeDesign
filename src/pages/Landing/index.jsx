import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import canvas from "../../assets/canvas2.jpeg";
import people from "../../assets/people-vector.jpg";
import PaintingLine from "../../assets/painting-line.png";

export default class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="landing-main">
        
          <div className="landing-main-picture">
          <img src={people} className="landing-main-image-people"/>
          </div>
          <div className="landing-main-story">
            <div className="landing-main-text">The story behind Canvas</div>
            <div className="landing-main-text-supplement">Scroll down to see</div>
            </div>
        </div>
        
        <Footer />
      </React.Fragment>
    );
  }
}


{/* <img src={canvas} className="landing-main-image" /> */}
{/* <div className="landing-main-content"> */}
{/* </div> */}
            {/* <img
              src={PaintingLine}
              className="landing-main-content-background"
            /> */}
            {/* <Link to="/login" className="landing-main-content-action-container">
              <button className="landing-main-content-action">Start Now</button>
            </Link> */}