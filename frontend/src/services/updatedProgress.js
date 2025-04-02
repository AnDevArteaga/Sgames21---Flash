import axios from "axios";
import { toast } from "react-toastify";

export const updatedProgress = async (id, activity) => {
    try {
        const response = await axios.put(
            "http://localhost:5000/api/phase-one/updatedProgress/",
            { id, activity },
            { withCredentials: true },
        );
        if (response.data.success) {
            console.log(response);
            return response.data.data;
        } else {
            // Si tu backend manda success: false con algún mensaje (en caso de error controlado)
            toast.error(
                response.data.message || "error al obtener la información",
            );
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            "Error en el servidor";
        toast.error(errorMessage);
        console.error("Error en login", error);
    }
};
