import { useEffect, useState } from "react";
import { getStage } from "../services/getStage";
import { useP1Context } from "../contexts/p1Context";

const useGetPhaseStudent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { setStage } = useP1Context();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("id_usuario"));
        console.log(user)
        const getStageUser = async () => {
            try {
                const response = await getStage(user);
                console.log('response', response);
                setStage(response.etapa);
                setIsLoading(false);
                
            } catch (error) {
                console.error("Error al obtener la etapa", error);
            }
        };
        getStageUser();
}, []);

    return { isLoading };
};

export default useGetPhaseStudent;