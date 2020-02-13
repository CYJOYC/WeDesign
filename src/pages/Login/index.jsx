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

  return (
    <React.Fragment>
      <Header />
      <div className="signin">
        <div className="signin-background">
          <div className="signin-container">
            <form onSubmit={handleClickRegister} className="register-form">
              <div className="register-title-assistant">
                Do not have an account?
              </div>
              <div className="register-title">Sign Up Here</div>
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

              <input
                type="submit"
                value="Sign Up"
                className="register-submit"
              />
            </form>

            <div className="signin-divider" />

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
              <hr class="divider divider-or"></hr>
              <div className="google-signin" onClick={handleGoogleSignin}>
                <img src={googleIcon} className="google-icon" />
                Sign In with Google
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(Login);

const Example = () => {
  // const [ user, setUser ] = useContext(UserContext);
  // console.log(user);
  // const isLoggedIn = user.isLoggedIn;

  useEffect(() => {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod:
            firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
          // Allow the user the ability to complete sign-in cross device,
          // including the mobile apps specified in the ActionCodeSettings
          // object below.
          forceSameDevice: false,
          // Used to define the optional firebase.auth.ActionCodeSettings if
          // additional state needs to be passed along request and whether to open
          // the link in a mobile app if it is installed.
          emailLinkSignIn: function() {
            return {
              // Additional state showPromo=1234 can be retrieved from URL on
              // sign-in completion in signInSuccess callback by checking
              // window.location.href.
              url: "https://www.example.com/completeSignIn?showPromo=1234",
              // Custom FDL domain.
              dynamicLinkDomain: "example.page.link",
              // Always true for email link sign-in.
              handleCodeInApp: true,
              // Whether to handle link in iOS app if installed.
              iOS: {
                bundleId: "com.example.ios"
              },
              // Whether to handle link in Android app if opened in an Android
              // device.
              android: {
                packageName: "com.example.android",
                installApp: true,
                minimumVersion: "12"
              }
            };
          }
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    });
  });

  // Is there an email link sign-in?
  if (ui.isPendingRedirect()) {
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        // User successfully signed in.

        console.log(authResult, redirectUrl);
        // setUser({isLoggedIn: !this.state.isLoggedIn, user:authResult, x:0});
        // setUser(user => (user: authResult));
        this.props.history.push("/workspace");
        // return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "/workspace",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>"
  };

  ui.start("#firebaseui-auth-container", uiConfig);

  return (
    <React.Fragment>
      <Header />
      <div className="login">
        <img src={memberBackground} className="member-background" />
        <div className="member-side-background">
          <div className="firebase-container">
            <div className="login-description">
              Only one click away to start painting...
            </div>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
