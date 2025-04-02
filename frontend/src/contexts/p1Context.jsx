import { createContext, useContext, useState } from "react";

const p1Context = createContext();

export const AppProvider = ({ children }) => {
  const [isFullScreenVisible, setIsFullScreenVisible] = useState(true);
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Introduccion');


  return (
    <p1Context.Provider
      value={{
        isFullScreenVisible,
        setIsFullScreenVisible,
        isAgentTalking,
        setIsAgentTalking,
        progress,
        setProgress,
        stage,
        setStage,
      }}
    >
      {children}
    </p1Context.Provider>
  );
};

export const useP1Context = () => useContext(p1Context);
