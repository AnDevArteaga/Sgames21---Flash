import axios from "axios";

export const saveDurant = async (data) => {
    console.log(data);
    try {
        const response = await axios.post("http://24.199.103.0/backend/api/phase-one/durante/", data);
        return response.data;
    } catch (error) {
        console.error("Error al guardar las respuestas", error);
    }
};