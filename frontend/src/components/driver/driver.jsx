import React, { useState } from "react";
import Joyride from "react-joyride";

const Tutorial = () => {
    const [run, setRun] = useState(true); // Estado para iniciar el tutorial
    const [stepIndex, setStepIndex] = useState(0); // Paso actual

    const steps = [
        {
            target: ".menu-button", // Clase del elemento a resaltar
            content: "Este es el menú, aquí puedes acceder a las opciones.",
        },
        {
            target: ".create-button",
            content: "Este botón te permite crear un nuevo tablero.",
        },
        {
            target: ".dashboard-area",
            content: "Aquí verás los tableros creados y su información.",
        }
    ];

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showProgress
            showSkipButton
            stepIndex={stepIndex}
            callback={(data) => {
                const { action, index, status } = data;
                if (action === "next") setStepIndex(index + 1);
                if (status === "finished") setRun(false);
            }}
        />
    );
};

export default Tutorial;
