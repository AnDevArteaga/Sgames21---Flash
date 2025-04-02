import { useState } from "react";
import { UpdateStage } from "../services/updateStage";
import { useP1Context } from "../contexts/p1Context";

const useUpdatePhaseStudent = () => {

    const [isLoadingGetStage, setIsLoadingGetStage] = useState(false);
    const { setStage } = useP1Context();

        const user = JSON.parse(localStorage.getItem("id_usuario"));
        console.log(user)

        const getStageUser = async (id_stage) => {
            console.log('stage', id_stage, 'use', user)
            setIsLoadingGetStage(true)
            try {
                const response = await UpdateStage(id_stage, user);
                console.log('response', response);
                setStage(response.etapa);
                setIsLoadingGetStage(false);
                
            } catch (error) {
                console.error("Error al obtener la etapa", error);
            }
        };


    return { isLoadingGetStage, getStageUser};
};

export default useUpdatePhaseStudent;