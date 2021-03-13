import React, { useContext } from 'react';
import { UserContext } from "../../contexts/AuthContext";
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...otherProps }) => {
    const context = useContext(UserContext);
    const isLoggedIn = context.userInfo.isLoggedIn;


    return (
        <Route
            {...otherProps}
            render={props => (

                    
                        isLoggedIn
                            ?
                            <Component {...props} />
                            :
                            <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/'} />
                    

            )}
        />
    )

}

export default PrivateRoute;
