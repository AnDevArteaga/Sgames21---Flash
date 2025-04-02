import { useState } from "react";
import { getAgentMessage } from "../services/getAgentMessage";
import { useP1Context } from "../contexts/p1Context";

const useAgentMessage = () => {
    const [isLoadingAgent, setIsLoadingAgent] = useState(false);
    const [message, setMessage] = useState("");
    const { setIsAgentTalking } = useP1Context();

    // 🔹 Función para obtener el mensaje según la clave
    const fetchAgentMessage = async (key) => {
        setIsLoadingAgent(true);
        setMessage("");
        setIsAgentTalking(true); // El agente comienza a "hablar"

        try {
            const response = await getAgentMessage(key);
            console.log(response);
            setMessage(response.mensaje); // Guarda el mensaje para el efecto de escritura
        } catch (error) {
            console.error("Error al obtener el mensaje:", error);
        } finally {
            setIsLoadingAgent(false);
        }
    };

    return { isLoadingAgent, message, fetchAgentMessage };
};

export default useAgentMessage;
