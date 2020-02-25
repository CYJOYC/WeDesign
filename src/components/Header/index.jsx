import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/auth";

const Header =()=> {
  const context = useContext(UserContext);
  const isLoggedIn = context.userInfo.isLoggedIn;
  // console.log(user);


  const [signoutShow, setSignoutShow] = useState({
    isShow: false
  });

  const handleSignoutShow = () => {
    setSignoutShow({
      isShow: !signoutShow.isShow
    });
  };

  const handleSignoutHide = () => {
    setSignoutShow({
      isShow: !signoutShow.isShow
    });
  }




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

  const Submenu = ()=> {
    return(
      <ul className="submenu">
        <li className="submenu-item"><a>Profile</a></li>
         <li className="submenu-item" ><Link to="/" className="log-out" onClick={logOut}><div>Sign Out</div></Link> </li> 
      </ul>
    )
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
              <div className="profile" >
                <img src={context.userInfo.photoURL} className="user-photo"/>{context.userInfo.displayName}
                <Submenu/>
                </div>
              : <Link to="/login" className="log-in"><div className="false">Log In</div></Link>}
              </div>
    
          </div>
         
        </div>
        
      </React.Fragment>
    );
  
}

export default Header;

