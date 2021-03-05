import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login, { AuthContext } from "./pages/Login";
import Workspace from "./pages/Workspace";
import Survey from "./pages/Survey";
import Canvas from "./pages/Canvas";
import "./index.css";
import UserContextProvider, { UserContext } from "../src/contexts/AuthContext";
import ProjectContextProvider from "../src/contexts/ProjectID";
import VersionContextProvider from "../src/contexts/Version";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <UserContextProvider>
      <ProjectContextProvider>
        <VersionContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Landing/>
              </Route>
              <Route exact path="/login">
                <Login/>
                </Route>

              <RequireAuth>
                {/* <Workspace/> */}
              {/* <Route exact path="/workspace" component={Workspace} /> */}
              </RequireAuth>
              
              <Route exact path="/survey">
                <Survey/>
              </Route>

              <Route exact path="/canvas">
                <Canvas/>
                </Route>
            </Switch>
          </BrowserRouter>
        </VersionContextProvider>
      </ProjectContextProvider>
    </UserContextProvider>
  );
}
export default App;

// export default class App extends React.Component {
  
//   render() {
//     return (
//       <UserContextProvider>
//         <ProjectContextProvider>
//           <VersionContextProvider>
//             <BrowserRouter>
//               <Switch>
//                 <Route exact path="/" component={Landing} />
//                 <Route exact path="/login" component={Login} />

//                 <Route exact path="/workspace" component={Workspace} />
//                 <Route exact path="/survey" component={Survey} />
//                 <Route exact path="/canvas" component={Canvas} />
//               </Switch>
//             </BrowserRouter>
//           </VersionContextProvider>
//         </ProjectContextProvider>
//       </UserContextProvider>
//     );
//   }
// }
