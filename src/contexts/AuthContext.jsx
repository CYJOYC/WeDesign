import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase/app";
export const UserContext = createContext();
import "firebase/storage";
const UserContextProvider = props => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    displayName: "",
    email: "",
    emailVerified: "",
    photoURL: "",
    isAnonymous: "",
    uid: "",
    providerData: ""
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const dbLinkForUsers = db.collection("users").doc(user.uid);
        dbLinkForUsers.get().then(function(doc){
          if(doc.exists){
            return
          }else{
            let displayName;
            let providerData;
            if (user.displayName == null) {
              displayName = "missing"
              providerData = "missing"
            }
            let photoURL;
            if (user.photoURL == null) {
              photoURL = "missing"
            }
            dbLinkForUsers.set(
              {
                displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                photoURL,
                isAnonymous: user.isAnonymous,
                uid: user.uid,
                providerData,
                projects: []
              }
            );
          }
        }).then(
          setUserInfo({
            isLoggedIn: true,
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous,
            uid: user.uid,
            providerData: user.providerData
          })
        )
        
      } else {
        // console.log("check out");
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
