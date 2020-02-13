import React, { createContext, Component, useState, useEffect } from "react";
export const VersionContext = createContext();

const VersionContextProvider = props => {
    const [showVersion, setShowVersion] = useState([]);
  
  return (
    <VersionContext.Provider value={{ showVersion, setShowVersion }}>
      {props.children}
    </VersionContext.Provider>
  );
};

export default VersionContextProvider;