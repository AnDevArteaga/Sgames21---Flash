import { useUser } from "../contexts/userContext.jsx";
import { CheckCircle } from "lucide-react";
import forest from "../assets/forest.jpg";
import { useNavigate } from "react-router-dom";
const Modal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { userDataPhase } = useUser();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={onClose}>
            <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden max-w-lg w-full mx-4 transform transition-all" 
            onClick={(e) => e.stopPropagation()}
            >
                {/* Header con imagen de fondo */}
                <div className="relative h-64">
                    <div className="absolute inset-0">
                        <img
                            src={forest}
                            alt="Header background"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gray-900/60 flex flex-col justify-end p-6">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {userDataPhase.data.fase.split(" - ")[0]}
                        </h2>
                        <p className="text-white text-xl text-opacity-90">
                            {userDataPhase.data.fase.split(" - ")[1]}
                        </p>
                    </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                    <div className="p-4 bg-gray-800 rounded-lg mb-8">
                        {/* Descripción */}
                        <div className="flex items-center gap-2 mb-4">
                            <p className="text-white">
                                {userDataPhase.data.descripcion}
                            </p>
                        </div>

                        {/* Títulos */}
                        <div className="space-y-2">
                            {[
                                userDataPhase.data.titulo1,
                                userDataPhase.data.titulo2,
                            ].map((titulo, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <CheckCircle
                                        className="text-purple-600"
                                        size={20}
                                    />
                                    <p className="text-white">{titulo}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Botones */}
                    <div className="flex space-x-4 justify-end">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button className="px-5 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 cursor-pointer"
                            onClick={() => {
                                onClose();
                                navigate('/app/fase1');
                            }}
                        >
                            Iniciar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
