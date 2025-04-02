import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const InputFieldPassword = ({ icon: Icon, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative mb-4">
        {/* Aquí sí se coloca correctamente el ícono a la izquierda */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
          {Icon && <Icon size={18} />} 
        </div>

        <input
          type={showPassword ? "text" : "password"}
          className="w-full py-2 pl-10 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-900 text-white"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {/* Botón para mostrar u ocultar la contraseña */}
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-white cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
};
