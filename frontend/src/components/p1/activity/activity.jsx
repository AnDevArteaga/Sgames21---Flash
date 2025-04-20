import React, { useEffect, useRef, useState } from "react";
import bg from "../../../assets/bg2.jpg";
import suelo from "../../../assets/suelo.jpg";
import Personaje from "../../../components/sprite/character.jsx";
import text from "../../../assets/redaccion.png";
import activity from "../../../assets/cerebro-artificial.png";
import arrow from "../../../assets/arrow.png";
import testimonies from "../../../assets/testimonio-del-cliente.png";
import Text from "./texts.jsx";
import WordAssignment from "./WordAssignment.jsx";
import HighLigh from "./highlighttext.jsx";
import Testimonies from "./tableTestimonies.jsx";
import Actor from "./actorSelector.jsx";
import JoinLine from "./JoinLine.jsx";
import Durante from "./durant.jsx"
import After from "./after.jsx"
import { getProgressActivity } from "../../../services/getProgressActivity.js";
import { updatedProgress } from "../../../services/updatedProgress.js";
import medalla from "../../../assets/Recurso1medalla.png";
import Confetti from 'react-confetti';
import { useP1Context } from "../../../contexts/p1Context.jsx";
import useUpdatePhaseStudent from "../../../hooks/useUpdateStage.js";



import { getInfoCheck } from "../../../services/getInfoCheck.js";

const InfiniteScroller = ({ agentMessage }) => {
  const { position, setPosition, stage, strategy_info, setStrategy_info, isVisible } = useP1Context();
  const { getStageUser } = useUpdatePhaseStudent();
  const [progrees, setProgrees] = useState({});
  const [isMoving, setIsMoving] = useState(false);
  const [groundOffset, setGroundOffset] = useState(0);
  const [activeComponent, setActiveComponent] = useState(null);
  const animationRef = useRef(null);
  const remainingStepsRef = useRef(0);
  const positionRef = useRef(0);
  const [isIntro, setIsIntro] = useState(false);
  const [canAdvance, setCanAdvance] = useState(false);
  const [completedActivities, setCompletedActivities] = useState([]);

  const [showCelebration, setShowCelebration] = useState(false);
  const [confettiIsVisible, setConfettiIsVisible] = useState(false);

  const handleShowMedal = () => {
    setShowCelebration(true);
    setConfettiIsVisible(true); // Mostrar confeti cuando se activa la medalla

  };

  useEffect(() => {
    console.log('stage', stage)
    if (stage === 'final') {
      console.log('show medal')
      handleShowMedal()
    }
  }, [stage]);

  const incorrect = (msg) => {
    agentMessage(msg);
  }

  useEffect(() => {
    if (Array.isArray(progrees) && progrees.length > 0) {
      const newValues = [];
  
      progrees.forEach((actividad) => {
        if (actividad.actividad1) {
          newValues.push(14, 15);
        }
        if (actividad.durante) {
          newValues.push(25);
        }
        if (actividad.actividad2) {
          newValues.push(35, 36, 37);
        }
        if (actividad.despues) {
          newValues.push(47);
        }
      });
    
      setCompletedActivities((prev) => [...new Set([...prev, ...newValues])]);
      
    }
  }, [progrees]);
  
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("id_usuario"));
    handleGetInfoCheck(user);
    handleGetProgress(user);
  }, []); // Solo al montar
  
  useEffect(() => {
    if (stage === 'Actividad') {
      setIsIntro(true);
    } else if (stage === 'final') {
      setIsIntro(false);
      agentMessage('final_p1');
      setCanAdvance(false);
      setIsMoving(false);
    }
  }, [stage]);
  
  useEffect(() => {
    if (isIntro) {
      setIsMoving(true);
      agentMessage("ac1p1m1");
  
      const timer = setTimeout(() => {
        setIsIntro(false);
        setIsMoving(false);
        setCanAdvance(true);
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [isIntro]);
  // Actividades disponibles en posiciones específicas

  const handleGetInfoCheck = async (user) => {
    try {
      const response = await getInfoCheck(user);
      setStrategy_info({
        strategy: response.estrategia,
        organizer: response.organizador,
        tool: response.herramienta,
      });
      console.log(response);
    } catch (error) {
      console.error("Error al obtener la información", error);
    }
  };

  const handleGetProgress = async (user) => {
    try {
      const response = await getProgressActivity(user);
      console.log(response, 'response')
      setProgrees(response);
    } catch (error) {
      console.error("Error al obtener la información", error);
    }
  };

  const onSaveDurant = (data) => {
    console.log(data);
    setCompletedActivities((prev) => [...prev, 25])
    if (data.q1 == 3) {
      setStrategy_info((prev) => ({
        ...prev,
        strategy: prev.strategy === "Búsqueda de Palabras Clave" ? "Lectura Crítica y Subrayado" : "Búsqueda de Palabras Clave"
      }));
    }
    setCanAdvance(true);
    updateProgressHandler('durante')
    agentMessage('durantep1m2')
  }

  const onSaveAfter = async () => {
    setActiveComponent(null);
    setCompletedActivities((prev) => [...prev, 47]);
    updateProgressHandler('despues')
    agentMessage('final_p1')
    handleShowMedal()
    getStageUser(5)
  }

  const updateProgressHandler  = async (activity) => {
    try {
      const response = await updatedProgress(localStorage.getItem("id_usuario"), activity);
      console.log(response);
    } catch (error) {
      console.error("Error al actualizar el progreso", error);
    }
  }

  const activities = {
    14: {
      icon: <img src={text} alt="text" className="w-8 h-8" />,
      component: (
        <div className="flex items-center justify-center">
          <Text
            title={"Primera actividad "}
            text={'Manuel cada vez se daba cuenta de como los tiempos cambiaron. Las motosierras rugían, los árboles caían y el verde desaparecía. Los ganaderos expandían potreros sin límite, los agricultores talaban para sembrar a gran escala, y los madereros explotaban los árboles centenarios. Inversionistas y grandes empresas compraban tierras para proyectos urbanísticos y comerciales, destruyendo más bosque. Manuel recorrió el bosque. Los ríos eran hilos de agua, la tierra estaba seca y los animales huían. Recordó las palabras de su abuelo: "Sin árboles, no hay vida. "Sabía que debía hacer algo antes de que todo desapareciera.'}
            handleClose={() => setActiveComponent(null)}
          />
        </div>
      ),
    },
    15: {
      icon: <img src={activity} alt="text" className="w-8 h-8" />,
      component: (
        <>
          {strategy_info.strategy === "Búsqueda de Palabras Clave"
            ? (
              <WordAssignment
                handleClose={() => setActiveComponent(null)}
                incorrect={incorrect}
                onComplete={() => {
                  setCompletedActivities((prev) => [...prev, 14, 15]);
                  setActiveComponent(null);
                  setCanAdvance(true);
                  agentMessage('ac1p1m6')
                  updateProgressHandler('actividad1')
                }}
              />
            )
            : strategy_info.strategy === "Lectura Crítica y Subrayado"
            ? (
              <HighLigh
                onComplete={() => {
                  setCompletedActivities((prev) => [...prev, 14, 15]);
                  setActiveComponent(null);
                  setCanAdvance(true);
                  agentMessage('ac1p1m6')
                  updateProgressHandler('actividad1')
                }}
                incorrect={incorrect}
                handleClose={() => setActiveComponent(null)}
                
              />
            )
            : (
              <div className="bg-gray-900 flex items-center justify-center">
                <span className="text-white font-semibold">
                  No hay Actividades o no hay estrategia
                </span>
              </div>
            )}
        </>
      ),
    },
    25: {
      icon: <img src={text} alt="text" className="w-8 h-8" />,
      component: (
        <div className="flex items-center justify-center">
          <Durante onClose={() => setActiveComponent(null)} onSave={onSaveDurant} />
        </div>
      ),
    },

    35: {
      icon: <img src={text} alt="text" className="w-8 h-8" />,
      component: (
        <div className="flex items-center justify-center">
          <Text
            title={"Segunda actividad "}
            text={"La deforestación en la sabana cordobesa no era un problema reciente, sino el resultado de años de expansión ganadera, agrícola y comercial. Cada actor tenía un papel en esta situación. Los ganaderos y agricultores , buscando aumentar su producción, talaban grandes extensiones de bosque para obtener más tierras. Las empresas madereras , por su parte, aprovechaban la demanda de madera para la construcción y la industria del papel. Los ambientalistas y científicos advertían sobre el daño ecológico, mientras que la comunidad y los campesinos sufrían las consecuencias de la escasez de agua y el deterioro del suelo."}
            handleClose={() => setActiveComponent(null)}
          />
        </div>
      ),
    },
    36: {
      icon: <img src={testimonies} alt="text" className="w-8 h-8" />,
      component: <Actor handleClose={() => setActiveComponent(null)} />,
    },
    37: {
      icon: <img src={activity} alt="text" className="w-8 h-8" />,
      component: (
        <>
          {strategy_info.strategy === "Lectura Crítica y Subrayado"
            ? (
              <Testimonies
                handleClose={() => setActiveComponent(null)}
                onComplete={() => {
                  setCompletedActivities((prev) => [...prev, 35, 36, 37]);
                  setActiveComponent(null);
                  setCanAdvance(true);
                  agentMessage('ac2p1m6')
                  updateProgressHandler('actividad2')
                }}
                incorrect={incorrect}
              />
            )
            : strategy_info.strategy === "Búsqueda de Palabras Clave"
            ? (
              <JoinLine
                handleClose={() => setActiveComponent(null)}
                onComplete={() => {
                  setCompletedActivities((prev) => [...prev, 35, 36, 37]);
                  setActiveComponent(null);
                  setCanAdvance(true);
                  agentMessage('ac2p1m6')
                  updateProgressHandler('actividad2')
                }}
                incorrect={incorrect}
              />
            )
            : (
              <div className="bg-gray-900 flex items-center justify-center">
                <span className="text-white font-semibold">
                  No hay Actividades o no hay estrategia
                </span>
              </div>
            )}
        </>
      ),
    },
    47: {
      icon: <img src={text} alt="text" className="w-8 h-8" />,
      component: (
        <div className="flex items-center justify-center">
          <After onClose={() => setActiveComponent(null)} onSave={onSaveAfter} />
        </div>
      ),
    },
  };

  // Función para mover un paso a la vez
  const moveOneStep = () => {
    const newPosition = positionRef.current + 1;
    positionRef.current = newPosition;
    setPosition(newPosition);

    // Mover el suelo (efecto de desplazamiento)
    setGroundOffset((prevOffset) => prevOffset - 100);

    // Reducir contador de pasos restantes
    remainingStepsRef.current -= 1;

    // Si aún quedan pasos, programar el siguiente movimiento
    if (remainingStepsRef.current > 0) {
      animationRef.current = setTimeout(moveOneStep, 500);
    } else {
      setIsMoving(false);
      {newPosition === 8 ? agentMessage("ac1p1m2") : newPosition === 19 ? agentMessage('durantep1') : newPosition === 29 ? agentMessage('ac2p1m1') : newPosition === 41 ? agentMessage("despues_p1") : agentMessage('nada')};
    }
  };

  const moveForward = () => {
    if (isMoving) return;
    setCanAdvance(false);
  
    const currentPosition = positionRef.current;
  
    // Obtener los IDs de actividades ordenados numéricamente
    const orderedActivityIds = Object.keys(activities)
      .map(Number)
      .sort((a, b) => a - b);
  
    // Buscar la primera actividad no completada
    const nextIncompleteActivityId = orderedActivityIds.find(id => !completedActivities.includes(id));
  
    if (!nextIncompleteActivityId) {
      // Todas completadas, no hay movimiento
      console.log("✅ Todas las actividades han sido completadas.");
      return;
    }
  
    // Calcular el paso anterior al ID de actividad incompleta
    const destination = nextIncompleteActivityId - 1;
  
    // Calcular cuántos pasos se necesitan desde la posición actual
    const steps = destination - currentPosition - 5;
  
    if (steps <= 0) {
      console.log("🟡 Ya estás en o después del destino.");
      return;
    }
  
    setIsMoving(true);
    remainingStepsRef.current = steps;
    moveOneStep();
  };
  

  // Función para mostrar un componente al hacer clic en un icono
  const showComponent = (positionKey) => {
    setActiveComponent(positionKey);
  };

  // Limpiar temporizadores al desmontar
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // Función para calcular la posición horizontal de un icono
  const calculateIconPosition = (activityPosition) => {
    // Posición relativa al personaje
    return (activityPosition - positionRef.current) * 80 + 200;
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-sky-300 transition-opacity duration-1000 ${
        isIntro ? "opacity-0" : "opacity-100"
      } ${isVisible ? "pointer-events-none select-none": ""}`}
    >

            {/* Confetti */}
            {confettiIsVisible && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
        />
      )}

      {/* Imagen de la medalla */}
      {showCelebration && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-fadeInDown z-20">
          <img
            src={medalla}
            alt="Medalla"
            className="w-24 h-24 animate-bounce"
          />
        </div>
      )}
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: isIntro ? "center" : `-${position}px 0`,
          filter: "blur(1px)",
        }}
      >
      </div>

      {/* Suelo infinito */}
      <div
        className="absolute bottom-0 w-full h-24"
        style={{
          backgroundImage: `url(${suelo})`,
          backgroundPosition: isIntro ? "0 0" : `${groundOffset}px 0`,
          transition: "background-position 0.3s linear",
        }}
      >
      </div>

      {/* Íconos siempre visibles */}
      {Object.entries(activities).map(([posKey, activity]) => {
        const positionNum = parseInt(posKey, 10);

        // Calcular posición en el entorno
        const horizontalOffset = calculateIconPosition(positionNum);

        return (
          <div
            key={posKey}
            className={`absolute bottom-40 cursor-pointer transition-all duration-300 ${
              completedActivities.includes(positionNum)
                ? "opacity-80 pointer-events-none"
                : "hover:scale-110 animate-bounce"
            }`}
            style={{
              left: `${horizontalOffset}px`,
            }}
            onClick={() => showComponent(positionNum)}
          >
            <div className="bg-white p-2 rounded-full shadow-lg">
              {activity.icon}
            </div>
            {completedActivities.includes(positionNum) && (
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}

      {/* Personaje */}
      <div
        className={`absolute bottom-0 transition-transform duration-500 ease-in-out`}
        style={{
          left: isIntro ? `0%` : `25%`, // desde el inicio a su posición normal
          width: "48px",
          height: "64px",
          zIndex: 10,
        }}
      >
        <div className="w-full h-full relative">
          <Personaje isMoving={isIntro || isMoving} />
        </div>
      </div>

      {/* Panel de control */}
      <div className="absolute top-4 right-4 p-4">
        <div className="flex items-center mb-2">
          {canAdvance && (
            <>
              <div className="relative border-none animate-bounce transition-transform duration-300 hover:scale-110 px-4 rounded-xl shadow-lg">
                <span className="text-green-200 text-sm">Avanza</span>
              </div>

              <button
                onClick={() => moveForward()}
                disabled={isMoving}
                className="relative w-16 h-16 bg-transparent border-none focus:outline-none animate-bounce transition-transform duration-300 hover:scale-110 cursor-pointer"
              >
                <img
                  src={arrow}
                  alt="Avanzar"
                  className="w-full h-full"
                />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Ventana modal para mostrar componentes */}
      {activeComponent !== null && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="max-w-auto w-full">
            {activities[activeComponent].component}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroller;
