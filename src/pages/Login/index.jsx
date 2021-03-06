import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebase.config.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import googleIcon from "../../assets/google-icon.png";
import { UserContext } from "../../contexts/AuthContext";


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const Login = () => {
  let history = useHistory();
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
      .then((userCredential) => {
        console.log(userCredential);
        
      })
      .catch(function(error) {
        console.log(error);
      });
    setRegisterEmail("");
    setRegisterPassword("");
    history.push('/workspace');
  };

  const handleClickLogin = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        history.push('/workspace');
      })
      .catch(function(error) {
        console.log(error);
      });
    setEmail("");
    setPassword("");
  };

  const handleGoogleSignin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        history.push('/workspace');
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
