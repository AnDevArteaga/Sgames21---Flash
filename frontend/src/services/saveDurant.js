import axios from "axios";

export const saveDurant = async (data) => {
    console.log(data);
    try {
        const response = await axios.post("http://localhost:3000/backend/api/phase-one/durante/", data);
        return response.data;
    } catch (error) {
        console.error("Error al guardar las respuestas", error);
    }
};