import React, { createContext, Component, useState, useEffect } from 'react';
import firebase from "firebase/app";
export const UserContext = createContext();



const UserContextProvider = (props) => {
    const user = firebase.auth().currentUser;
    const [userInfo, setUserInfo] = useState({
        isLoggedIn: false,
        displayName:"",
        email:"",
        emailVerified:"",
        photoURL:"",
        isAnonymous:"",
        uid:"",
        providerData:""
    })
    useEffect(()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("check in")
        if (user) {
          setUserInfo({
          isLoggedIn:true,
          displayName:user.displayName,
          email:user.email,
          emailVerified:user.emailVerified,
          photoURL:user.photoURL,
          isAnonymous:user.isAnonymous,
          uid:user.uid,
          providerData:user.providerData
          })
        } else {
          console.log("check out")
        }
      });
    }, [user])
    


    // useEffect(()=>{
    //     if(user.isLoggedIn){
    //         return;
    //     }
    //     console.log("firebase", firebase.auth().isSignInWithEmailLink(window.location.href));
    //     // Confirm the link is a sign-in with email link.
    //     if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    //         // Additional state parameters can also be passed via URL.
    //         // This can be used to continue the user's intended action before triggering
    //         // the sign-in operation.
    //         // Get the email if available. This should be available if the user completes
    //         // the flow on the same device where they started it.
    //         const email = window.localStorage.getItem('emailForSignIn');
    //         if (!email) {
    //         // User opened the link on a different device. To prevent session fixation
    //         // attacks, ask the user to provide the associated email again. For example:
    //             email = window.prompt('Please provide your email for confirmation');
    //         }
    //         // The client SDK will parse the code from the link for you.
    //         firebase.auth().signInWithEmailLink(email, window.location.href)
    //         .then(function(result) {
    //             // Clear email from storage.
    //             window.localStorage.removeItem('emailForSignIn');
    //             setUser({isLoggedIn: true, user:result })
    //             console.log(result);
    //             // You can access the new user via result.user
    //             // Additional user info profile not available via:
    //             // result.additionalUserInfo.profile == null
    //             // You can check if the user is new or existing:
    //             // result.additionalUserInfo.isNewUser
    //         })
    //         .catch(function(error) {
    //             console.log(error);
    //             // Some error occurred, you can inspect the code: error.code
    //             // Common errors could be invalid email and invalid or expired OTPs.
    //         });
    //     }
    // }, [user])


    // const changeStatus = () => {
    //      setState({isLoggedIn: !this.state.isLoggedIn});
    //  }
   
        return ( 
            <UserContext.Provider value={{userInfo, setUserInfo}}>
                {props.children}
            
            </UserContext.Provider>
         );
    
}
 
export default UserContextProvider;