import React from "react";
import logoCanvas from "../../assets/canvas.png";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-nav">
          <img src={logoCanvas} className="footer-logo" />
          <div className="footer-nav-item footer-about">About Canvas</div>
          <div className="footer-nav-item footer-legal">Legal</div>
          <div className="footer-nav-item footer-sitemap">Sitemap</div>
          <div className="footer-nav-item footer-contact">Contact</div>
        </div>
      </div>
    );
  }
}

export default Footer;
