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
        <div className="flex justify-center items-center">

        <div className="flex flex-col h-full bg-gray-900 w-2/3 rounded-xl ">
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-3 border-b border-gray-800">
          <span className="text-white font-semibold tracking-wide">Selecciona un actor para conocer su opinión</span>
          <button 
            onClick={close}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
  
        {/* Main content */}
        <div className="flex flex-row flex-1">
          {/* Left panel - Actor details */}
          <div className="w-2/5 p-6 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col justify-center rounded-r-xl shadow-xl">
            {actorSeleccionado ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center space-y-6"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img
                    src={actorSeleccionado.img}
                    alt={actorSeleccionado.nombre}
                    className="w-28 h-28 object-cover  border-2 border-indigo-500 shadow-lg"
                  />
                </motion.div>
                
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-extrabold text-white tracking-tight">
                    {actorSeleccionado.nombre}
                  </h2>
                  <div className="min-h-24 bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl">
                    <TypingText
                      key={textoActual}
                      text={textoActual}
                      onFinish={() => setBloqueado(false)}
                      className="text-white leading-relaxed"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-slate-300 opacity-70"
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
                <p className="text-gray-400">Selecciona un actor</p>
              </div>
            )}
          </div>
  
          {/* Right panel - Grid of characters */}
          <div className="w-3/5 p-6 flex items-center justify-center bg-gray-900">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 w-full">
              {personajes.map((actor) => (
                <motion.div
                  key={actor.id}
                  className={`flex flex-col items-center space-y-2 ${
                    bloqueado && actorSeleccionado?.id !== actor.id
                      ? "opacity-50"
                      : ""
                  }`}
                  whileHover={!bloqueado || actorSeleccionado?.id === actor.id ? { scale: 1.05 } : {}}
                  onClick={() => manejarSeleccion(actor)}
                >
                  <div className="relative">
                    <img
                      src={actor.img}
                      alt={actor.nombre}
                      className="w-auto h-auto object-contain max-h-24 transition-transform cursor-pointer"
                    />
                    
                    {/* Highlight selected actor */}
                    {actorSeleccionado?.id === actor.id && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -inset-1 rounded-md border-2 border-indigo-500"
                        style={{ zIndex: -1 }}
                      />
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
      </div>

    );
}
