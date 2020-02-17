import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebase.config.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import memberBackground from "../../assets/member1.jpeg";
import googleIcon from "../../assets/google-icon.png";
import CanvasLogo from "../../assets/logo.png";
import { UserContext } from "../../contexts/AuthContext";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const Login = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [onSignin, setOnSignin] = useState({
    onSignin: true
  });
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleClickRegister = event => {
    event.preventDefault();
    alert(`${registerEmail} & ${registerPassword}`);

    firebase
      .auth()
      .createUserWithEmailAndPassword(registerEmail, registerPassword)
      .catch(function(error) {
        alert(error);
      });
    // .then(() => {
    //   const actionCodeSettings = {
    //     url: "http://localhost:3000/workspace",
    //     handleCodeInApp: true
    //   };

    //   firebase
    //     .auth()
    //     .sendSignInLinkToEmail(registerEmail, actionCodeSettings)
    //     .then(function() {
    //       console.log(context.user);
    //       context.setUser({
    //         isLoggedIn: !context.user.isLoggedIn,
    //         user: { name: "ply" }
    //       });
    //       // The link was successfully sent. Inform the user.
    //       // Save the email locally so you don't need to ask the user for it again
    //       // if they open the link on the same device.
    //       window.localStorage.setItem("emailForSignIn", email);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //       // Some error occurred, you can inspect the code: error.code
    //     });
    // });

    setRegisterEmail("");
    setRegisterPassword("");
  };

  const handleClickLogin = event => {
    event.preventDefault();
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
      });
    setEmail("");
    setPassword("");
    window.location.href = "/workspace";
  };

  const handleGoogleSignin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        window.location.href = "/workspace";
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handleToSignUp = () => {
    setOnSignin({ onSignin: false });
  };

  const handleToSignIn = () => {
    setOnSignin({ onSignin: true });
  };

  return onSignin.onSignin ? (
    <React.Fragment>
      <Header />
      <div className="signin">
        <div className="signin-container">
          <form onSubmit={handleClickLogin} className="signin-form">
            <div className="signin-title">Sign In</div>
            <label className="signin-email form-title">Email </label>
            <input
              className="signin-form-input"
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
            <label className="signin-password form-title">Password </label>
            <input
              className="signin-form-input"
              type="text"
              name="password"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
            />

            <input type="submit" value="Sign In" className="signin-submit" />
            <hr className="divider divider-or"></hr>
            <div className="google-signin" onClick={handleGoogleSignin}>
              <img src={googleIcon} className="google-icon" />
              Sign In with Google
            </div>
            <div className="check-account-status-title">
              Do not have an account?{" "}
              <a
                className="button-to-change-account-status"
                onClick={handleToSignUp}
              >
                Sign Up Here
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Header />
      <div className="signin">
        <div className="signin-container">
          <form onSubmit={handleClickRegister} className="register-form">
            <div className="register-title">Sign Up</div>
            <label className="register-email form-title">Email </label>
            <input
              className="signin-form-input"
              type="text"
              name="email"
              value={registerEmail}
              onChange={e => setRegisterEmail(e.currentTarget.value)}
            />

            <label className="register-password form-title">Password </label>
            <input
              className="signin-form-input"
              type="text"
              name="password"
              value={registerPassword}
              onChange={e => setRegisterPassword(e.currentTarget.value)}
            />

            <input type="submit" value="Sign Up" className="register-submit" />
            <div className="check-account-status-title">
            Already have an account?{" "}
            <a
              className="button-to-change-account-status"
              onClick={handleToSignIn}
            >
              Sign In Here
            </a>
          </div>
          </form>
          
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(Login);
