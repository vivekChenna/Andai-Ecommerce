"use client";

import { createContext, useContext, useState } from "react";

const PluginContext = createContext();

const PluginProvider = ({ children }) => {
  const [pluginsText, setPluginsText] = useState("");

  return (
    <PluginContext.Provider value={{ pluginsText, setPluginsText }}>
      {children}
    </PluginContext.Provider>
  );
};

const usePlugins = () => useContext(PluginContext);

export { usePlugins, PluginProvider };
