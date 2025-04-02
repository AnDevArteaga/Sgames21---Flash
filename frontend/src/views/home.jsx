import { useState } from "react";
import { Menu } from "lucide-react";
import fondoHeader from "../assets/fondoHeader.jpg";
import Modules from "../components/home/modules";
import { useUser } from "../contexts/userContext.jsx";
import StartPhase from "../modals/StartPhase.jsx";
import useGetInfoPhaseStudent from "../hooks/useGetPhaseInfo";
import LoadingHome from "../components/common/loadingHome.jsx";

const Dashboard = () => {
    const { isLoading } = useGetInfoPhaseStudent();

    const [isOpen, setIsOpen] = useState(false);
    const openModal = (id) => {
        console.log('openModal', id);
        setIsOpen(true);

    }

    const { user } = useUser();

    if (isLoading) return <LoadingHome />;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="relative h-64 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${fondoHeader})`,
                            opacity: 1,
                        }}
                    />
                    <div className="relative flex items-center justify-between px-6 py-4">
                        <button //   onClick={toggleS   idebar}
                         className="p-2 rounded-md bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 lg:hidden">
                            <Menu size={24} />
                        </button>
                        <div></div>
                    </div>
                    <div className="relative flex items-center px-6 h-full">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                Bienvenido {user.nombre_completo.split(" ")[0]}
                            </h1>
                            <p className="text-white/80 font-semibold">
                                Desarrolla tus competencias del siglo 21 y haz
                                seguimiento a tu progreso
                            </p>
                        </div>
                    </div>
                </header>

                {/* Module Section */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            Módulos Principales
                        </h2>
                        <p className="text-white">
                            Seleccione un módulo para iniciar sus actividades
                        </p>
                    </div>

                    <div className="flex items-center mb-6 relative">
                        <div className="flex-1 border-t border-white/50"></div>
                        <span className="text-lg font-bold text-white mx-4 bg-gray-900 px-2">
                            Fortalecimiento del Pensamiento Crítico y
                            Metacognitivo
                        </span>
                        <div className="flex-1 border-t border-white/50"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dashboard-area">
                        <Modules
                            isLocked={false}
                            openModal={openModal}
                        />
                        <Modules
                            title={"Gestión de Proyectos"}
                            description={"Administra tus proyectos y tareas"}
                            isLocked={true}
                        />
                        <Modules
                            title={"Configuración"}
                            description={"Personaliza las opciones del sistema"}
                            isLocked={true}
                        />
                    </div>
                </main>
            </div>
            <StartPhase onClose={() => setIsOpen(false)} isOpen={isOpen} />
        </div>
    );
};

export default Dashboard;
