import { createContext, useContext, useState, useEffect } from 'react';

const p1Context = createContext();

export const AppProvider = ({ children }) => {
  const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Introduccion');
  const [position, setPosition] = useState(0);
    const [strategy_info, setStrategy_info] = useState({
      strategy: null,
      organizer: null,
      tool: null,
    });

  useEffect(() => {
    let newProgress = 0;

    switch (stage) {
      case 'Introduccion':
        newProgress = 0;
        setIsFullScreenVisible(true);
        break;
      case 'CheckInicial':
        newProgress = 20;
        
        break;
      case 'CheckFinal':
        newProgress = 30;
        break;
      case 'Actividad':
        newProgress = 50;

        if (position >= 38) {
          newProgress = 90;
        } else if (position >= 26) {
          newProgress = 75;
        } else if (position >= 16) {
          newProgress = 60;
        }
        break;
      case 'final':
        newProgress = 100;
        setIsFullScreenVisible(false);
        break;
      default:
        newProgress = 0;
    }

    setProgress(newProgress);
  }, [stage, position]);

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
        position,
        setPosition,
        strategy_info,
        setStrategy_info,
      }}
    >
      {children}
    </p1Context.Provider>
  );
};

export const useP1Context = () => useContext(p1Context);
