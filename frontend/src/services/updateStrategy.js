import axios from "axios";
import { toast } from "react-toastify";

export const UpdateStrategy = async (userId, strategy, organizer, tool) => {
    console.log(userId, strategy, organizer, tool);

    try {
        const response = await axios.put(
            "http://localhost:5000/api/phase-one/updatedStrategy",
            {
                id: userId,
                strategy: strategy,
                organizer: organizer,
                tool: tool,
            },
            { withCredentials: true },
        );

        if (response.data.success) {
            console.log(response);
            toast.success("Estrategias guardadas correctamente");
            return response.data.data;
        } else {
            // Si tu backend manda success: false con algún mensaje (en caso de error controlado)
            toast.error(
                response.data.message || "error al actualizar la estrategia",
            );
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            "Error en el servidor";
        toast.error(errorMessage);
        console.error("Error en la actualización de la estrategia", error);
    }
};
