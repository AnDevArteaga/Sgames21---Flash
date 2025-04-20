import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext.jsx";
import { useP1Context } from "../contexts/p1Context.jsx";
import {
  Award,
  BarChart2,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  School,
  User,
} from "lucide-react";
import useGetPhaseStudent from "../hooks/useGetStage.js";
import { getProgressActivity } from "../services/getProgressActivity.js";
import LoadingPages from "../components/common/loadingPages.jsx";

const AchievementBadge = ({ title, description, lock }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg`}>
      <div className={`w-16 h-16 rounded-full ${lock ? "bg-gray-200 dark:bg-gray-600" : "bg-gradient-to-br from-amber-400 to-orange-500" } flex items-center justify-center mb-2`}>
        <Award className="w-8 h-8 text-white" />
      </div>
      <p className={`text-xs font-medium text-center ${lock ? 'text-gray-400' : 'text-gray-800'} dark:text-white`}>
        {title}
      </p>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        {!lock && description}
      </p>
      {lock && <p className="text-xs text-center text-gray-400 dark:text-gray-500">
        Bloqueado
      </p> 
      }
    </div>
  );
};

const StudentProfile = () => {
  const { user } = useUser();
  const { stage, progress } = useP1Context();
  const [activeTab, setActiveTab] = useState("stats");
  const [progressActivity, setProgressActivity] = useState([]);

  const handleGetProgress = async (user) => {
    try {
      const response = await getProgressActivity(user);
      console.log(response, "response");
      setProgressActivity(response.data);
    } catch (error) {
      console.error("Error al obtener la información", error);
    }
  };

  const { isLoadingGetStage } = useGetPhaseStudent();

  useEffect(() => {
    handleGetProgress(user.id_usuario);
  }, []);

  // Mock data for statistics
  const statistics = {
    completedCourses: stage === "final" ? 1 : 0,
    inProgressCourses: stage === "final" ? 0 : 1,
    averageScore: stage === "final" ? 25 : 0,
    studyHours: 0, // Since no specific condition for this, set as 0
    certificates: 0, // No specific condition, set as 0
  };

  // Creating objects for each phase (fase1, fase2, fase3)
  const phases = [
    {
      id: 1,
      phaseName:
        "Fase 1 - Fortalecimiento del pensamiento crítico y Metacognitivo",
      progress: progress || 0, // Using progress for phase 1
    },
    {
      id: 2,
      phaseName:
        "Fase 2 - Fortalecimiento del pensamiento crítico y Metacognitivo",
      progress: 0, // Default value for phase 2
    },
    {
      id: 3,
      phaseName:
        "Fase 3 - Fortalecimiento del pensamiento crítico y Metacognitivo",
      progress: 0, // Default value for phase 3
    },
  ];

  if (isLoadingGetStage) return <LoadingPages />;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with gradient and pattern */}
        <header className="relative h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]">
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "30px 30px",
            }}
          >
          </div>

          {/* User info in header */}
          <div className="absolute bottom-6 left- ml-8 md:left-16 text-white z-10">
            <h2 className="text-2xl md:text-3xl font-bold">
              {user.nombre_completo}
            </h2>
            <p className="text-white/80 flex items-center">
              <School className="w-4 h-4 mr-2" /> {user.institucion}
            </p>
          </div>
        </header>

        {/* Profile Content */}
        <main className="flex-1 p-4 md:p-8 mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column - Profile Card */}
              <div className="md:w-1/3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                  {/* Profile Photo Card */}
                  <div className="flex flex-col items-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 overflow-hidden shadow-lg mb-4">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white">
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {user.nombre_usuario}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Estudiante
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="p-6">
                    <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3">
                      Información Personal
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                          <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="ml-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID de Estudiante
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {user.id_usuario || "EST-2025-789"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <School className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Institución educativa
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {user.institucion || "Institución"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Modules & Stats */}
              <div className="md:w-2/3">
                {/* Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6 overflow-hidden">
                  <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                      className={`px-6 py-3 text-sm font-medium flex items-center flex-1 justify-center ${activeTab === "stats"
                          ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                          : "text-gray-500 dark:text-gray-400"
                        }`}
                      onClick={() => setActiveTab("stats")}
                    >
                      <BarChart2 className="w-4 h-4 mr-2" />
                      Estadísticas
                    </button>
                    <button
                      className={`px-6 py-3 text-sm font-medium flex items-center flex-1 justify-center ${activeTab === "courses"
                          ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                          : "text-gray-500 dark:text-gray-400"
                        }`}
                      onClick={() => setActiveTab("courses")}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Cursos
                    </button>
                    <button
                      className={`px-6 py-3 text-sm font-medium flex items-center flex-1 justify-center ${activeTab === "achievements"
                          ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                          : "text-gray-500 dark:text-gray-400"
                        }`}
                      onClick={() => setActiveTab("achievements")}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Logros
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === "stats" && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                          Progreso
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {/* Stat Cards */}
                          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg p-4 text-white">
                            <div className="flex justify-between">
                              <p className="text-white/80 text-sm">
                                Modulos Completados
                              </p>
                              <BookOpen className="w-5 h-5 text-white/70" />
                            </div>
                            <p className="text-3xl font-bold mt-2">
                              {statistics.completedCourses}
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-4 text-white">
                            <div className="flex justify-between">
                              <p className="text-white/80 text-sm">
                                En Progreso
                              </p>
                              <Clock className="w-5 h-5 text-white/70" />
                            </div>
                            <p className="text-3xl font-bold mt-2">
                              {statistics.inProgressCourses}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bars */}
                        <div className="mt-8 space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Promedio General
                              </span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {statistics.averageScore}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${statistics.averageScore}%` }}
                              >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "courses" && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                          Mis Cursos
                        </h3>
                        <div className="space-y-3">
                          {phases.map((fase) => (
                            <div
                              key={fase}
                              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                              <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-4">
                                <BookOpen className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                                  Fase {fase.id}{" "}
                                  - Fortalecimiento del pesamiento crítico y
                                  Metacognitivo
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {fase.progress}% Completado
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "achievements" && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                          Mis Logros
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {/* Lógica para mostrar logros según el 'stage' */}
                          {stage === "checkInicial" && (
                            <>
                              <AchievementBadge
                                title="Comienza la aventura"
                                description="Pensamiento crítico y metacognitivo"
                              />
                              <AchievementBadge
                                title="Seleccionando mis estrategias"
                                description="Pensamiento crítico y metacognitivo"
                                lock={true}
                              />
                              <AchievementBadge
                                title="Fortaleciendo mi pensamiento crítico y metacognitivo"
                                description="Pensamiento crítico y metacognitivo"
                                lock={true}
                              />
                            </>
                          )}

                          {stage === "Actividad" && (
                            <>
                              <AchievementBadge
                                title="Comienza la aventura"
                                description="Pensamiento crítico y metacognitivo"
                              />
                              <AchievementBadge
                                title="Seleccionando mis estrategias"
                                description="Pensamiento crítico y metacognitivo"
                              />
                              <AchievementBadge
                                title="Fortaleciendo mi pensamiento crítico y metacognitivo"
                                description="Pensamiento crítico y metacognitivo"
                                lock={true}

                              />
                            </>
                          )}

                          {stage === "final" && (
                            <>
                              <AchievementBadge
                                title="Comienza la aventura"
                                description="Pensamiento crítico y metacognitivo"
                              />
                              <AchievementBadge
                                title="Seleccionando mis estrategias"
                                description="Pensamiento crítico y metacognitivo"
                              />
                              <AchievementBadge
                                title="Fortaleciendo mi pensamiento crítico y metacognitivo"
                                description="Pensamiento crítico y metacognitivo"
                              />
                            </>
                          )}

                          {/* Próximo logro bloqueado */}
                          {/* <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg opacity-50">
                            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mb-2">
                              <Award className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-sm font-medium text-center text-gray-400 dark:text-gray-500">
                              Próximo Logro
                            </p>
                            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                              Bloqueado
                            </p>
                          </div> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;
