import { Lock, ChevronRight, ArrowRight } from "lucide-react";
import forest from "../../assets/forest.jpg";
import { useUser } from "../../contexts/userContext.jsx";

const ModuleCard = ({ isLocked, openModal }) => {
  const { userDataPhase } = useUser();
  
  const handleOpenModal = () => {
    if (!isLocked) {
      openModal(userDataPhase.data.id_usuario);
    }
  };
  
  // Extraer título y descripción
  const title = userDataPhase.data.fase.split(" - ")[0];
  const description = userDataPhase.data.fase.split(" - ")[1];
  
  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 transform ${
        isLocked 
          ? "bg-gray-800 cursor-not-allowed" 
          : "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      }`}
      onClick={handleOpenModal}
    >
      {/* Barra de progreso (solo visible cuando no está bloqueado) */}
      {!isLocked && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 bg-opacity-70 z-20"></div>
      )}
      
      {/* Fondo y Overlay */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
          isLocked 
            ? "opacity-30 grayscale" 
            : "opacity-90 group-hover:opacity-100 group-hover:scale-105"
        }`}
        style={{ backgroundImage: `url(${forest})` }}
      />
      
      {/* Overlay gradiente para mejorar legibilidad */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          isLocked
            ? "bg-gray-900/70"
            : "bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:opacity-80"
        }`}
      />
      
      {/* Overlay de bloqueo con candado en el medio */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-800 rounded-full p-4 shadow-xl">
            <Lock className="w-12 h-12 text-gray-400" />
          </div>
        </div>
      )}
      
      {/* Contenido */}
      <div className="relative z-10 p-6 h-full flex flex-col min-h-52">
        {!isLocked && (
          <div className="mb-3 inline-flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
            <span className="text-white text-xs font-medium">Disponible</span>
          </div>
        )}
        
        <h3
          className={`text-xl font-bold transition-colors duration-500 ${
            isLocked ? "opacity-0" : "text-white group-hover:text-white"
          }`}
        >
          {title}
        </h3>
        
        <p
          className={`mt-2 transition-colors duration-500 ${
            isLocked ? "opacity-0" : "text-white/80 group-hover:text-white/90"
          }`}
        >
          {description}
        </p>
        
        {!isLocked && (
          <div className="mt-auto pt-4 flex justify-between items-center">
            <span className="text-xs text-white/70">Continuar</span>
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full group-hover:bg-blue-500 transition-colors duration-300">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;