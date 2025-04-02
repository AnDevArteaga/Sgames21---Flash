import React, { useState, useEffect } from 'react';

const AnimatedChecklist = ({ initFinalCheck, next }) => {
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
  
      // Obtener el mensaje relacionado con el ítem
      const mensaje = agentMessageItem[item];
  
      // Ejecutar función pasando el mensaje
      initFinalCheck(mensaje);
  
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
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 p-12 rounded-xl h-full max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Checklist Inicial</h2>
      <p className="text-white mb-4">Marca los siguientes puntos para confirmar que has definido tu plan:</p>
      
      <ul className="space-y-4">
        {Object.entries({
          'estrategias': 'He seleccionado las estrategias a utilizar.',
          'organizar': 'He definido cómo organizar la información encontrada.',
          'herramientas': 'He revisado las herramientas disponibles para la actividad.'
        }).map(([key, text]) => (
          <li key={key} className="flex items-start">
            <div className="relative flex items-center justify-center mr-3">
              <div 
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  checkedItems[key] 
                    ? 'bg-indigo-600 border-indigo-600' 
                    : 'border-gray-400 hover:border-indigo-400'
                }`}
                onClick={() => handleCheck(key)}
              >
                {checkedItems[key] && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 text-white fill-current animate-scale-in"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </div>
              {checkedItems[key] && (
                <>
                  <div className="absolute inset-0 bg-indigo-400 opacity-30 rounded-md animate-pulse scale-110"></div>
                  <Sparkles visible={true} />
                </>
              )}
            </div>
            <span className={`transition-all duration-300 ${
              checkedItems[key] 
                ? 'text-white font-medium' 
                : 'text-white'
            }`}>
              {text}
            </span>
          </li>
        ))}
      </ul>
      
      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AnimatedChecklist;