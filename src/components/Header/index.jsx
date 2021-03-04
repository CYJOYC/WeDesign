import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/auth";
import "./header.css";

const Header =()=> {
  const context = useContext(UserContext);
  const isLoggedIn = context.userInfo.isLoggedIn;

  const logOut = ()=> {
    firebase.auth().signOut().then(function() {
      context.setUserInfo({
        isLoggedIn: false,
        displayName:"",
        email:"",
        emailVerified:"",
        photoURL:"",
        isAnonymous:"",
        uid:"",
        providerData:""
    });
    }).catch(function(error) {
      console.log(error)
    });
  }

  const Submenu = ()=> {
    return(
      <ul className="submenu">
        <li className="submenu-item">Profile</li>
        <li className="submenu-item" ><Link to="/" className="nav-item" onClick={logOut}>Sign Out</Link></li> 
      </ul>
    )
  }

  
    return (
      <>
        <div className="main-nav">
          <Link to="/">
            <img src={logo} className="logo"/>
          </Link>
          <div className="nav-items">
            {isLoggedIn?
            <>
              <Link to="/workspace" className="nav-item">Workspace</Link>
              <div className="status-container">
                <div className="profile">
                  <img src={context.userInfo.photoURL} className="user-photo"/>{context.userInfo.displayName}
                  <Submenu/>
                </div>
            
              </div>
            </>
            : <Link to="/login" className="nav-item">Log In</Link>
            }
          </div>
        </div>
      </>
    );
  
}

export default Header;

