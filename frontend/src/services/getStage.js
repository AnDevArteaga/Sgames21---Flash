import axios from "axios";
import { toast } from "react-toastify";

export const getStage = async ( id_usuario ) => {
    console.log(id_usuario);
    try {
        const response = await axios.get(
            "http://localhost:5000/api/phase-one/" + id_usuario,
            {},
            { withCredentials: true },
        );

        if (response.data.success) {
            console.log(response);
            return response.data.data;
        } else {
            // Si tu backend manda success: false con algún mensaje (en caso de error controlado)
            toast.error(response.data.message || "error al obtener la etapa");
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            "Error en el servidor";
        toast.error(errorMessage);
        console.error("Error en login", error);
    }
};
