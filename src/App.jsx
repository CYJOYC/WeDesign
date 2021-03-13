import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Workspace from "./pages/Workspace";
import Survey from "./pages/Survey";
import Canvas from "./pages/Canvas";
import "./index.css";
import UserContextProvider from "../src/contexts/AuthContext";
import ProjectContextProvider from "../src/contexts/ProjectID";
import VersionContextProvider from "../src/contexts/Version";
import ScrollToTop from "./components/ScrollToTop";


export default class App extends React.Component {
  
  render() {
    return (
      <UserContextProvider>
        <ProjectContextProvider>
          <VersionContextProvider>
            <BrowserRouter>
              <Switch>
                <ScrollToTop>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/workspace" component={Workspace} />
                <Route exact path="/survey" component={Survey} />
                <Route exact path="/canvas" component={Canvas} />
                </ScrollToTop>
              </Switch>
            </BrowserRouter>
          </VersionContextProvider>
        </ProjectContextProvider>
      </UserContextProvider>
    );
  }
}
