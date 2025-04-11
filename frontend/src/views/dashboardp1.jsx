import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  BarChart,
  BookOpen,
  Bot,
  ChevronRight,
  Home,
  Lightbulb,
  Settings,
  User,
  Video,
} from "lucide-react";
import SelectStrategy from "../components/selectStrategy/selectStrategy";
import HelpStrategyConcept from "../components/helpStrategy/helpStrategyConcept";
import Header from "../components/common/header";
import Responses from "../components/agent/responses";
import ProgressBar from "../components/progressBar/progressBar";
import ProfileButton from "../components/buttons/pofileButton";
import FinalChecklist from "../components/selectStrategy/finalSelectStrategy";
import Introduction from "../components/introduction/introduction";
import { useP1Context } from "../contexts/p1Context";
import LoadingPages from "../components/common/loadingPages";
import BeforeStart from "../components/p1/before/start";
import useGetPhaseStudent from "../hooks/useGetStage";
import useAgentMessage from "../hooks/useAgentMessage";
import useUpdatePhaseStudent from "../hooks/useUpdateStage.js";
import Canvas from "../components/p1/activity/activity.jsx";
import { useUser } from "../contexts/userContext.jsx";
import ConceptMap from "../components/organizer/concetpMap.jsx";

const Dashboard = () => {
  const [keyConcept, setKeyConcept] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { isLoading } = useGetPhaseStudent();
  const {
    strategy_info,
    progress,
    setProgress,
    stage,
    isFullScreenVisible,
    setIsFullScreenVisible,
  } = useP1Context();
  const { user } = useUser();
  const { message, fetchAgentMessage } = useAgentMessage();
  const { getStageUser, isLoadingGetStage } = useUpdatePhaseStudent();
  const [NewStageNumber, setNewStageNumber] = useState(0);
  const [LocalStage, setLocalStage] = useState("Introduccion");
  const [showTips, setShowTips] = useState(false);
  const [showVisualiza, setShowVisualiza] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);
  const [showToolModal, setShowToolModal] = useState(false);

  useEffect(() => {
    setProgress(10);
  }, []);

  useEffect(() => {
    console.log("stage", stage);
    setLocalStage(stage);
  }, [stage]);

  const selectedKey = (key) => {
    setKeyConcept(key);
  };

  const next = (stage) => {
    setIsButtonDisabled(false);
    setNewStageNumber(stage);
  };

  const nexStage = () => {
    setIsButtonDisabled(true);
    const newStage = NewStageNumber === 3 ? "CheckFinal" : "Actividad";
    setLocalStage(newStage);
    getStageUser(NewStageNumber);
  };

  if (isLoading || isLoadingGetStage) return <LoadingPages />;

  return (
    <div className="bg-blue-200 h-screen w-full overflow-auto flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 p-2 gap-2">
        {/* Left Sidebar */}
        <div className="w-16 bg-white rounded-xl shadow-md flex flex-col items-center justify-between py-6">
          <div className="space-y-8">
            <div className="flex flex-col items-center">
              <a
                href="/app/inicio
              "
                className="flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white cursor-pointer">
                  <Home size={20} />
                </div>
                <span className="text-xs mt-1 text-gray-600">Inicio</span>
              </a>
            </div>

            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-lg bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 cursor-pointer"
                onClick={() => setShowVisualiza(!showVisualiza)}
              >
                <BookOpen size={20} />
              </div>
              <span className="text-xs mt-1 text-gray-600">Visualiza</span>
            </div>

            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white cursor-pointer"
                onClick={() => setShowTips(!showTips)}
              >
                <Lightbulb size={20} />
              </div>
              <span className="text-xs mt-1 text-gray-600">Tips</span>
            </div>
          </div>

          <div>
            <ProfileButton
              onClick={() => setShowProfilePanel(!showProfilePanel)}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Top Bar */}

          {/* Main Content */}
          <div className="flex flex-1 gap-4">
            {/* Chat and Content Area */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Assistant Response */}
              <div className="bg-white rounded-xl shadow-md p-2 h-auto flex relative overflow-hidden">
                <div className="flex flex-1 gap-2">
                  <div className="w-32 h-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center self-center">
                    <Bot size={80} className="text-white" />
                  </div>

                  <div className="flex-1 overflow-auto py-2">
                    <Responses fullMessage={message} />
                  </div>
                </div>
              </div>

              {/* Main Learning Area */}
              <div className="flex-1 bg-white rounded-xl shadow-md p-6 relative">
                {
                  /* {isAgentTalking
                  ? (
                    <div className="absolute inset-0 bg--600 bg-opacity-95 flex flex-col items-center justify-center z-100">
                      <div className="mb-4">
                        <ArrowUp size={32} className="text-white rotate-180" />
                      </div>
                      <p className="text-xl font-medium text-white">
                        El asistente está hablando...
                      </p>
                    </div>
                  )
                  : null} */
                }
                {LocalStage === "Introducción" && !isFullScreenVisible
                  ? <BeforeStart updateStage={getStageUser} />
                  : null}

                {LocalStage === "CheckInicial" && (
                  <SelectStrategy
                    SelectedKey={selectedKey}
                    initCheckInicial={fetchAgentMessage}
                    next={next}
                  />
                )}

                {LocalStage === "CheckFinal" && (
                  <FinalChecklist
                    initFinalCheck={fetchAgentMessage}
                    next={next}
                  />
                )}

                {LocalStage === "Actividad" && (
                  <Canvas agentMessage={fetchAgentMessage} />
                )}

                {LocalStage !== "Actividad" && (
                  <button
                    className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={isButtonDisabled}
                    onClick={nexStage}
                  >
                    <span className="font-medium">Continuar</span>
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Right Sidebar - Help and Tips */}
            {
              /* {LocalStage !== "Actividad" && (
              <div className="w-80 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
                  <h2 className="text-white font-bold text-lg">
                    Guía de Conceptos
                  </h2>
                </div>
                <div className="p-4">
                  <HelpStrategyConcept
                    SelectedKey={keyConcept}
                    agentEvent={fetchAgentMessage}
                  />
                </div>
              </div>
            )} */
            }

            {/* Tips Panel (conditionally shown) */}
            {showTips && (
              <div className="absolute left-22 top-24 w-80 bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
                <div className="bg-amber-500 p-4 flex justify-between items-center">
                  <h2 className="text-white font-bold text-lg">
                    Tips de Aprendizaje
                  </h2>
                  <button
                    onClick={() => setShowTips(false)}
                    className="text-white hover:bg-amber-600 rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                      <h3 className="font-medium text-amber-800">
                        🧠 Haz pausas conscientes
                      </h3>
                      <p className="text-sm text-gray-700">
                        Tomarte 5 minutos cada 25 para reflexionar sobre lo
                        aprendido mejora tu comprensión. Pregúntate:{" "}
                        <i>"¿Qué entendí realmente?"</i>
                      </p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                      <h3 className="font-medium text-amber-800">
                        🔍 Cuestiona lo que ves
                      </h3>
                      <p className="text-sm text-gray-700">
                        No aceptes todo como verdad. Pregunta <i>¿Por qué?</i>,
                        {" "}
                        <i>¿Qué evidencia hay?</i>,{" "}
                        <i>¿Hay otra forma de verlo?</i>
                      </p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                      <h3 className="font-medium text-amber-800">
                        🧩 Conecta ideas
                      </h3>
                      <p className="text-sm text-gray-700">
                        Relaciona lo que aprendes con tus experiencias. Esto
                        fortalece tu pensamiento crítico y te permite ver
                        patrones y relaciones.
                      </p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                      <h3 className="font-medium text-amber-800">
                        🗣️ Explica en voz alta
                      </h3>
                      <p className="text-sm text-gray-700">
                        Decir lo que piensas te ayuda a organizar tus ideas y
                        detectar fallos en tu razonamiento. ¡Habla contigo mismo
                        o explícaselo a alguien!
                      </p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                      <h3 className="font-medium text-amber-800">
                        📌 Evalúa tu propio pensamiento
                      </h3>
                      <p className="text-sm text-gray-700">
                        Después de cada actividad, reflexiona:{" "}
                        <i>
                          "¿Qué hice bien?", "¿Qué podría haber hecho
                          diferente?", "¿Qué aprendí sobre cómo pienso?"
                        </i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Visualiza Panel */}
            {showVisualiza && (
              <div className="absolute left-22 top-24 w-80 bg-white rounded-xl shadow-lg border border-blue-300 overflow-hidden z-50">
                <div className="bg-blue-600 p-4 flex justify-between items-center">
                  <h2 className="text-white font-bold text-lg">
                    Visualización
                  </h2>
                  <button
                    onClick={() => setShowVisualiza(false)}
                    className="text-white hover:bg-blue-700 rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    <div
                      className={`border border-blue-200 rounded-lg p-4 transition-colors flex items-center ${
                        strategy_info.organizer
                          ? "hover:bg-blue-50 cursor-pointer"
                          : "opacity-50"
                      }`}
                      onClick={() =>
                        strategy_info.organizer && setShowOrganizerModal(true)}
                    >
                      <div className="bg-blue-100 p-3 rounded-md mr-3">
                        <BarChart className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-800">
                          {strategy_info.organizer ||
                            "Aún No hay organizadores"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Organiza y visualiza tu información
                        </p>
                      </div>
                    </div>

                    <div
                      className={`border border-purple-200 rounded-lg p-4 transition-colors flex items-center ${
                        strategy_info.tool
                          ? "hover:bg-purple-50 cursor-pointer"
                          : "opacity-50"
                      }`}
                      onClick={() =>
                        strategy_info.tool && setShowToolModal(true)}
                    >
                      <div className="bg-purple-100 p-3 rounded-md mr-3">
                        <Settings className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-purple-800">
                          {strategy_info.tool || "Aún No hay herramientas"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Accede a herramientas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

             {/* Organizer Modal */}
      {showOrganizerModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100">
          <div
            className="bg-white rounded-xl shadow-xl w-2/3 h-auto"
          >
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-xl">
              <h3 className="font-semibold">Organizador</h3>
              <button onClick={() => setShowOrganizerModal(false)}>✕</button>
            </div>
            <div className="p-1 text-gray-800">
              <ConceptMap />
            </div>
          </div>
        </div>
      )}

      {/* Tool Modal */}
      {showToolModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <motion.div
            className="bg-white border rounded-xl shadow-xl w-96"
            drag
            dragConstraints={{ top: -300, bottom: 300, left: -300, right: 300 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="bg-purple-600 text-white p-4 flex justify-between items-center cursor-move rounded-t-xl">
              <h3 className="font-semibold">Herramienta</h3>
              <button onClick={() => setShowToolModal(false)}>✕</button>
            </div>
            <div className="p-4 text-gray-800">
              {strategy_info.tool}
            </div>
          </motion.div>
        </div>
      )}

            {/* Profile Panel */}
            {showProfilePanel && (
              <div className="absolute left-22 bottom-24 w-72 bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden z-50">
                <div className="bg-gray-100 p-4 flex justify-between items-center">
                  <h2 className="text-gray-800 font-bold text-lg">Mi perfil</h2>
                  <button
                    onClick={() => setShowProfilePanel(false)}
                    className="text-gray-700 hover:bg-gray-200 rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-gray-800 font-medium">
                    👤 {user?.nombre_completo}
                  </span>{" "}
                  {/* Puedes usar el nombre dinámico aquí */}
                  <a
                    href="/app/perfil"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Ir al perfil
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="flex h-20">
            <div className="flex-1 bg-white rounded-xl shadow-md space-x-10 px-4 flex items-center">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-blue-800">
                  SGAMES21
                </h1>
                <div className="flex items-center mt-1">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    >
                    </div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-600">
                    {progress}%
                  </span>
                </div>
              </div>

              <div
                onClick={() => setIsFullScreenVisible(true)}
                className="cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg p-3 flex items-center gap-2"
              >
                <Video size={20} className="text-blue-600" />
                <span className="text-blue-700 font-medium">Ver Tutorial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullScreenVisible && (
        <Introduction
          onClose={() => setIsFullScreenVisible(false)}
          startAgentMessage={fetchAgentMessage}
        />
      )}
    </div>
  );
};

export default Dashboard;
