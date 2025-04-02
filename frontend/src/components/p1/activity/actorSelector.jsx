import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import ganadero from "../../../assets/Recurso4actores.png";
import empresas from "../../../assets/Recurso3actores.png";
import abuelo from "../../../assets/Recurso2actores.png";
import politico from "../../../assets/Recurso1actores.png";
import maunuel from "../../../assets/sprites/Recurso1sprite.png";
import { X } from "lucide-react";

const personajes = [
    {
        id: 1,
        nombre: "Manuel",
        img: maunuel,
        texto:
            "Si seguimos talando sin control, dentro de unos años no quedará agua en nuestros ríos y la tierra será estéril",
    },
    {
        id: 2,
        nombre: "Ganadero",
        img: ganadero,
        texto: "Necesitamos más tierras para que nuestro ganado crezca. Sin la ganadería, la economía de la región se vería afectada",
    },
    {
        id: 3,
        nombre: "Alcalde",
        img: politico,
        texto: "Debemos encontrar un equilibrio entre el desarrollo económico y la conservación del medio ambiente para garantizar el bienestar de la comunidad",
    },
    {
        id: 4,
        nombre: "Empresas madereras",
        img: empresas,
        texto: "La madera es un recurso valioso y su comercio genera empleo. Mientras haya demanda, seguiremos aprovechándola",
    },
    {
        id: 5,
        nombre: "Abuelo",
        img: abuelo,
        texto: "La deforestación, no solo destruye el ecosistema, sino también la identidad cultural de los Zenúes, quienes veían la naturaleza como parte esencial de la vida.",
    },
    // {
    //     id: 6,
    //     nombre: "Empresa",
    //     img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
    //     texto: "Las empresas construyen sin pensar en el ambiente.",
    // },
    // {
    //     id: 7,
    //     nombre: "Animal",
    //     img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
    //     texto: "Los animales huyen del bosque afectado.",
    // },
    // {
    //     id: 8,
    //     nombre: "Rio",
    //     img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
    //     texto: "Los rios se reducen a hilos de agua.",
    // },
    // {
    //     id: 9,
    //     nombre: "Abuelo",
    //     img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
    //     texto: "El abuelo dejo un mensaje sabio sobre los arboles.",
    // },
    // {
    //     id: 10,
    //     nombre: "Tierra",
    //     img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
    //     texto: "La tierra se vuelve esteril con la deforestacion.",
    // },
];

const TypingText = ({ text, onFinish }) => {
    return (
        <p className="text-sm text-white leading-4">
            <Typewriter
                options={{
                    delay: 10,
                    cursor: "",
                }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString(text)
                        .callFunction(() => {
                            if (onFinish) onFinish();
                        })
                        .start();
                }}
            />
        </p>
    );
};

export default function ActorSelector( { handleClose } ) {
    const [actorSeleccionado, setActorSeleccionado] = useState(null);
    const [bloqueado, setBloqueado] = useState(false);
    const [textoActual, setTextoActual] = useState("");
    const [lastActorId, setLastActorId] = useState(null);

    const manejarSeleccion = (actor) => {
        if (bloqueado || actor.id === lastActorId) return;

        setBloqueado(true);
        setTextoActual(""); // 🔹 Resetea antes de asignar el nuevo texto
        setTimeout(() => {
            setTextoActual(actor.texto);
        }, 50); // 🔹 Pequeña pausa para reiniciar el efecto

        setActorSeleccionado(actor);
        setLastActorId(actor.id);
    };

    const close = () => {
        handleClose()
    }

    return (
        <div className="flex flex-col h-full bg-gray-900">
            <div className="flex items-center justify-between px-4 py-2" >
            <span className="text-white font-semibold">Selecciona un actor para conocer su opinión</span>

            <button onClick={close}  
                    className="text-white cursor-pointer ">
                        <X size={20} />
                    </button>
                               </div>
            <div className="flex flex-row items-center justify-center">
            {/* Columna izquierda: Detalles */}
            <div className="w-2/5 p-8 bg-gray-700 shadow-lg rounded-r-2xl flex flex-col justify-center">
                {actorSeleccionado
                    ? (
                        <div className="flex flex-col items-center justify-center space-y-3 transform transition-all duration-300 ease-in-out">
                            <div className="flex flex-col items-center justify-center space-y-3 transform transition-all duration-300 ease-in-out">
                                <img
                                    src={actorSeleccionado.img}
                                    alt={actorSeleccionado.nombre}
                                    className="w-1/3 object-cover rounded-full hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="text-center space-y-3">
                                <h2 className="text-xl font-extrabold text-white tracking-tight">
                                    {actorSeleccionado.nombre}
                                </h2>
                                <TypingText
                                    key={textoActual}
                                    text={textoActual}
                                    onFinish={() => setBloqueado(false)}
                                    className="text-white max-w-md mx-auto"
                                />
                            </div>
                        </div>
                    )
                    : (
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-24 w-24 text-slate-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.818-.393-1.544-1-2.2M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.818.393-1.544 1-2.2m0 0a5.002 5.002 0 019 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>

                        </div>
                    )}
            </div>

            {/* Columna derecha: Grid de personajes */}
            <div className="w-3/5 p-8 flex items-center">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full">
                    {personajes.map((actor) => (
                        <motion.div
                            key={actor.id}
                            className={`flex flex-col items-center space-y-2 transform transition-all duration-300 ${
                                bloqueado
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }`}
                            whileHover={!bloqueado ? { scale: 1.05 } : {}}
                            onClick={() => manejarSeleccion(actor)}
                        >
                            <div className="relative">
                                <img
                                    src={actor.img}
                                    alt={actor.nombre}
                                    className={`${actor.id === 1 ? 'w-1/2' : actor.id === 5 ? '2/3' : 'w-auto'} h-auto object-cover rounded-md shadow-md transition-transform hover:scale-105 cursor-pointer`}
                                />
                                {bloqueado && (
                                    <div className="absolute inset-0 bg-slate-100 bg-opacity-70 rounded-full flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10 text-slate-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm font-semibold text-white text-center">
                                {actor.nombre}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            </div>

        </div>
    );
}
