import axios from "axios";
import { toast } from "react-toastify";

export const UpdateStage = async (id_etapa, id_usuario ) => {
    console.log(id_usuario);

    try {
        const response = await axios.put(
            "http://localhost:5000/api/phase-one/updatePhase",
            {
            id_stage: id_etapa,
            id_user: id_usuario
            },
            { withCredentials: true },
        );

        if (response.data.success) {
            console.log(response);
            return response.data.data;
        } else {
            // Si tu backend manda success: false con algún mensaje (en caso de error controlado)
            toast.error(response.data.message || "error al actualizar la etapa");
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            "Error en el servidor";
        toast.error(errorMessage);
        console.error("Error en la actualización de la etapa", error);
    }
};
