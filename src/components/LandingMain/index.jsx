import React, {useState, useEffect} from "react";
import image1 from "../../assets/landing-image-1.png";
import image2 from "../../assets/landing-image-2.png";
import canvas from "../../assets/canvas.png";
import IconScrollDown from "../../assets/icon-scroll-down.png";
import "./landingMain.css";
import { Link } from "react-router-dom";

export default class LandingMain extends React.Component{
    state = {
      image: '0'
    }
  
    listenScrollEvent = e => {
      if (window.scrollY < 65) {
          this.setState({image: '0'})
      }
      if (window.scrollY > 65) {
        this.setState({image: '1'})
      } 
      if (window.scrollY > 120) {
          this.setState({image: '2'})
      } 
      
    }
  
    componentDidMount() {
      window.addEventListener('scroll', this.listenScrollEvent)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.listenScrollEvent);
      }
  
    render() {
      return(
        <div className="landing-main">
            <div className="landing-0" style={{display:this.state.image === "0"? "flex" : "none"}}>
                <img src={canvas} className="landing-image-0"/>
                <div className="landing-text-0">Welcome to WeDesign</div>
                <img src={IconScrollDown} className="landing-scroll-down"/>
            </div>
            <div className="landing-1" style={{display:this.state.image === "1"? "flex" : "none"}}>
                <img src={image1} className="landing-image-1"/>
                <div className="landing-text-1">
                    We know how challenging it is to communicate ideas <br/>
                    and how frustrating it is having poor collaboration
                </div>
            </div>
            <div className="landing-2" style={{display:this.state.image === "2"? "flex" : "none"}}>
                <img src={image2} className="landing-image-2"/>
                <div className="landing-text-2">
                    WeDesign is here to bridge people's ideas<br/>
                    and help you create brilliant works!
                </div>
                <Link to="/Login" className="landing-start">
                    <button className="landing-start-btn">Start Now</button>
                </Link>
            </div>



            {/* <div className="landing-text-0" style={{display:this.state.image === "0"? "block" : "none"}}>Welcome to WeDesign</div>
    
        <div className="landing-main-picture">
            <img src={canvas} className="landing-image-0" style={{display:this.state.image === "0"? "block" : "none"}}/>
            <img src={image1} className="landing-image-1" style={{display:this.state.image === "1"? "block" : "none"}}/>
            <img src={image2} className="landing-image-2" style={{display:this.state.image === "2"? "block" : "none"}}/>
        </div>
        <img src={IconScrollDown} className="landing-scroll-down" style={{display:this.state.image === "0"? "block" : "none"}}/>
        <div className="landing-text-1" style={{display:this.state.image === "1"? "block" : "none"}}>
            It's challenging communicating ideas only by words,
            and frustrating having poor collaboration experience.

        </div>
        <div className="landing-text-2" style={{display:this.state.image === "2"? "block" : "none"}}>
            So WeDesign is here to help bridge people's ideas together,
            and bring brilliant works to the world!
        </div>
        <btn>Start Now</btn> */}

      </div>
       )
     }
  }
  