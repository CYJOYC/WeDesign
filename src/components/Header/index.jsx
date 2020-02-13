import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/auth";

const Header =()=> {
  const context = useContext(UserContext);
  const isLoggedIn = context.userInfo.isLoggedIn;
  // console.log(user);
  const logOut = ()=> {
    firebase.auth().signOut().then(function() {
      console.log("log out")
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

  
    return (
      <React.Fragment>
        <div className="main-nav">
        <Link to="/">
          <img src={logo} className="logo" />
          </Link>
          <div className="nav-item">
            <div className="about">About</div>
            <div className="status-container">
              {isLoggedIn? 
              <Link to="/" className="log-out"> 
              <div className="profile" onClick={logOut}>
                <img src={context.userInfo.photoURL} className="user-photo"/>{context.userInfo.displayName}</div>
              </Link> 
              : <Link to="/login" className="log-in"><div className="false">Log In</div></Link>}</div>
    
          </div>
        </div>
      </React.Fragment>
    );
  
}

export default Header;

