import axios from "axios";
import { toast } from "react-toastify";

export const getAgentMessage = async ( key_msg ) => {
    console.log(key_msg);
    try {
        const response = await axios.get(
            "http://localhost:5000/api/agent/" + key_msg,
            {},
            { withCredentials: true },
        );

        if (response.data.success) {
            console.log(response);
            return response.data.data;
        } else {
            // Si tu backend manda success: false con algún mensaje (en caso de error controlado)
            toast.error(response.data.message || "error al obtener el mensaje");
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            "Error en el servidor";
        toast.error(errorMessage);
        console.error("Error en login", error);
    }
};
