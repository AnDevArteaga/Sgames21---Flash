import React, { useState, useEffect } from 'react';
import { useP1Context } from '../../contexts/p1Context';

const AnimatedChecklist = ({ initFinalCheck, next }) => {
  const {isVisible} = useP1Context()
  const [checkedItems, setCheckedItems] = useState({
    'estrategias': false,
    'organizar': false,
    'herramientas': false
  });

  const agentMessageItem = {
    'estrategias': 'strategy_selected',
    'organizar': 'organizer_selected',
    'herramientas': 'tool_selected'
  }

  const handleCheck = (item) => {
    setCheckedItems(prev => {
      const updated = {
        ...prev,
        [item]: !prev[item]
      };
  
        // Contar cuántos ítems quedarían en true después del cambio
        const totalChecked = Object.values(updated).filter(v => v).length;

        // Solo cuando se alcancen 3 seleccionados
        if (totalChecked === 3 && !prev[item]) {
          initFinalCheck('strategy_selected');
        }
  
        return updated;
    });
  };

   // ✅ Revisar si todos están en true y llamar a next()
   useEffect(() => {
    const allChecked = Object.values(checkedItems).every(Boolean);
    if (allChecked && next) {
      next(4);
    }
  }, [checkedItems, next]);
  

  useEffect(() => {
    initFinalCheck('verified_select_p1')
  }, [])
  
  // Efecto de chispas
  const Sparkles = ({ visible }) => {
    if (!visible) return null;
    
    return (
      <div className="absolute pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 bg-yellow-300 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 30 - 15}px`,
              top: `${Math.random() * 30 - 15}px`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
              animationDelay: `${Math.random() * 0.2}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`bg-white p-8 rounded-2xl h-full max-w-full mx-auto shadow-lg border border-blue-100 ${isVisible ? "pointer-events-none select-none" : ""} `}>
    <div className="flex items-center mb-8">
      <div className="mr-3 bg-blue-100 p-2 rounded-lg">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-blue-800">Checklist Inicial</h2>
    </div>
    
    <p className="text-gray-600 mb-6 pl-2">Marca los siguientes puntos para confirmar que has definido tu plan:</p>
    
    <ul className="space-y-5">
      {Object.entries({
        'estrategias': 'He seleccionado las estrategias a utilizar.',
        'organizar': 'He definido cómo organizar la información encontrada.',
        'herramientas': 'He revisado las herramientas disponibles para la actividad.'
      }).map(([key, text]) => (
        <li key={key} className="flex items-start bg-blue-50 rounded-xl p-3 transition-all duration-300 hover:bg-blue-100 border border-blue-100">
          <div className="relative flex items-center justify-center mr-4 mt-1">
            <div 
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                checkedItems[key] 
                  ? 'bg-purple-600 border-purple-600' 
                  : 'border-blue-300 hover:border-purple-400'
              }`}
              onClick={() => handleCheck(key)}
            >
              {checkedItems[key] && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  className="w-4 h-4 text-white fill-current"
                  style={{animation: 'scale-in 0.3s ease-out'}}
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              )}
            </div>
            {checkedItems[key] && (
              <>
                <div className="absolute inset-0 bg-purple-400 opacity-30 rounded-lg" style={{animation: 'pulse 2s infinite'}}></div>
                <Sparkles visible={true} />
              </>
            )}
          </div>
          <span className={`transition-all duration-300 ${
            checkedItems[key] 
              ? 'text-blue-800 font-medium' 
              : 'text-gray-700'
          }`}>
            {text}
          </span>
        </li>
      ))}
    </ul>
    
    <div className="mt-8 ml-3 text-gray-500 text-sm flex items-center">
      <div className={`w-2 h-2 rounded-full mr-2 ${Object.values(checkedItems).every(item => item) ? 'bg-green-500' : 'bg-blue-400'}`}></div>
      <p>{Object.values(checkedItems).filter(v => v).length} de 3 completados</p>
    </div>
    
    <style jsx>{`
      @keyframes scale-in {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.1); opacity: 0.2; }
        100% { transform: scale(1); opacity: 0.3; }
      }
      @keyframes ping {
        0% { transform: scale(0); opacity: 0.8; }
        70%, 100% { transform: scale(2); opacity: 0; }
      }
    `}</style>
  </div>
  );
};

export default AnimatedChecklist;