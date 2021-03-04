import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/AuthContext";
import image1 from "../../assets/landing-image-1.png";
import image2 from "../../assets/landing-image-2.png";
import canvas from "../../assets/canvas.png";
import IconScrollDown from "../../assets/icon-scroll-down.png";
import "./landingMain.css";

const LandingMain = () => {
    const [image, setImage] = useState({image:'0'})
    const context = useContext(UserContext);
    const isLoggedIn = context.userInfo.isLoggedIn;

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    },[])

    const listenScrollEvent = e => {
        if (window.scrollY < 65) {
            setImage({image: '0'})
        }
        if (window.scrollY > 65) {
            setImage({image: '1'})
        } 
        if (window.scrollY > 150) {
            setImage({image: '2'})
        } 
      }

    return(
      <div className="landing-main">
          <div className="landing-0" style={{display:image.image === "0"? "flex" : "none"}}>
              <img src={canvas} className="landing-image-0"/>
              <div className="landing-text-0">Welcome to WeDesign</div>
              <img src={IconScrollDown} className="landing-scroll-down"/>
          </div>
          <div className="landing-1" style={{display:image.image === "1"? "flex" : "none"}}>
              <img src={image1} className="landing-image-1"/>
              <div className="landing-text-1">
                  We know how challenging it is to communicate ideas <br/>
                  and how frustrating it is having poor collaboration
              </div>
          </div>
          <div className="landing-2" style={{display:image.image === "2"? "flex" : "none"}}>
              <img src={image2} className="landing-image-2"/>
              <div className="landing-text-2">
                  WeDesign is here to bridge people's ideas<br/>
                  and help you create brilliant works!
              </div>
              {isLoggedIn? 
                <Link to="/workspace" className="landing-start">
                    <button className="landing-start-btn">Start Now</button>
                </Link>
                :
                <Link to="/Login" className="landing-start">
                    <button className="landing-start-btn">Start Now</button>
                </Link>   
          }
          </div>
    </div>
     )
}

export default LandingMain;
