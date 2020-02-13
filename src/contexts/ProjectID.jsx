import React, { createContext, Component, useState, useEffect } from "react";
export const ProjectContext = createContext();

const ProjectContextProvider = props => {
  const [project, setProject] = useState(null);
  
  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
