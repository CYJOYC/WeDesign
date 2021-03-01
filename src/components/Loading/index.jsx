import React from "react";
import logoCanvas from "../../assets/canvas.png";
import "./loading.css";

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
          <img src={logoCanvas} className="loading-logo" />
          <div className="loading-text">Loading...</div>
      </div>
    );
  }
}

export default Loading;