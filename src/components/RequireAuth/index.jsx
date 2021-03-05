import React, { useContext } from 'react';
import { UserContext } from "../../contexts/AuthContext";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Workspace from "../../pages/Workspace";
import Landing from "../../pages/Landing";

const RequireAuth = ({ children, ...rest }) => {
    const context = useContext(UserContext);
    const isLoggedIn = context.userInfo.isLoggedIn;

    
    return (
        <>
        {isLoggedIn? <Route exact path="/workspace"><Workspace/></Route>
        :<Redirect to={{ pathname: "/" }} />}
        </>
       

    //     <Route {...rest} render={({ location }) =>
    //     isLoggedIn ? (children) :
    //     (<Redirect to={{ pathname: '/', state: { from: location } }} />)
    //   }
    // />
    )
}

export default RequireAuth;