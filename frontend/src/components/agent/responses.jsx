import React, { useEffect, useState } from "react";
import { useP1Context } from "../../contexts/p1Context";
import { useUser } from "../../contexts/userContext";
import Typewriter from "typewriter-effect";
import { Bot, CheckCircle } from "lucide-react";

const Responses = ({ fullMessage }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { isAgentTalking, setIsAgentTalking, isVisible, setIsVisible } = useP1Context();
  const { user } = useUser();
  
  // Process the message and replace user placeholder with real name
  const processedMessage = fullMessage
    ? fullMessage.replace(
        "{nombre_usuario}",
        user?.nombre_completo || "Usuario"
      )
    : "";
  
  // When the message changes, ensure the agent is talking and reset confirmation
  useEffect(() => {
    if (processedMessage) {
      setIsAgentTalking(true);
      setShowConfirmation(false);
    }
  }, [processedMessage, setIsAgentTalking]);

  // Show component when agent starts talking
  useEffect(() => {
    if (isAgentTalking) {
      setIsVisible(true);
    }
    // We don't hide the component automatically anymore - user must click the check
  }, [isAgentTalking]);

  // Handle when typing finishes
  const handleTypingComplete = () => {
    setIsAgentTalking(false);
    setShowConfirmation(true);
  };

  // Handle confirmation click
  const handleConfirmationClick = () => {
    setShowConfirmation(false);
    setIsVisible(false);
  };

  return (
    <div 
      className={`fixed right-8 bottom-72 w-96 bg-gray-200 rounded-xl shadow-xl border-4 border-gray-300 overflow-hidden z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex gap-2 p-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shrink-0">
          <Bot size={20} className="text-white" />
        </div>
        <div className="flex-1 overflow-auto">
          <div className="w-full">
            <div className="flex items-center mb-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-indigo-200 p-3 rounded-md min-h-12 flex items-center">
              <div className="text-sm text-gray-800 font-medium">
                {processedMessage && isVisible && (
                  <Typewriter
                    key={processedMessage}
                    options={{
                      delay: 30,
                      cursor: "|",
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(processedMessage)
                        .callFunction(() => handleTypingComplete())
                        .start();
                    }}
                  />
                )}
              </div>
            </div>
            
            {/* Confirmation button that appears when agent finishes talking */}
            {showConfirmation && (
              <div className="flex justify-end mt-2">
                <button 
                  onClick={handleConfirmationClick}
                  className="flex items-center gap-1 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium cursor-pointer"
                >
                  <CheckCircle size={16} />
                  <span>Entendido</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responses;