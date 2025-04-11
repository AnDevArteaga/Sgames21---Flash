import React, { useEffect, useState } from "react";
import { useP1Context } from "../../contexts/p1Context";
import { useUser } from "../../contexts/userContext";
import Typewriter from "typewriter-effect";

const Responses = ({ fullMessage }) => {
  const [text, setText] = useState("");
  const { setIsAgentTalking } = useP1Context();
  const { user } = useUser();

  // Procesar el mensaje y reemplazar el marcador de usuario con el nombre real
  const processedMessage = fullMessage
    ? fullMessage.replace(
        "{nombre_usuario}",
        user?.nombre_completo || "Usuario"
      )
    : "";

  // Cuando el mensaje cambie, asegurarse de que el agente está hablando
  useEffect(() => {
    if (processedMessage) {
      setIsAgentTalking(true);
    }
  }, [processedMessage, setIsAgentTalking]);

  return (
    <div className="w-full h-full flex items-center">
      <div className="w-full p-2">
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-xs text-white">
            Mensaje del asistente
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-indigo-200 p-3 rounded-md min-h-16 flex items-center">
          <div className="text-sm text-gray-800 font-bold">
            <Typewriter
              key={processedMessage} // Esto asegura que el Typewriter se reinicie cada vez que el mensaje cambie
              options={{
                delay: 30, // Ajusta el retraso entre caracteres
                cursor: "|", // Puedes cambiar el cursor a tu preferencia
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(processedMessage)
                  .callFunction(() => setIsAgentTalking(false))
                  .start();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responses;
