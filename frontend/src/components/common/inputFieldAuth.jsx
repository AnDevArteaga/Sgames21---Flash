 // Componente para los inputs
 import { Lock } from "lucide-react";
  import { useState } from "react";
  import { Eye, EyeOff } from "lucide-react";

export const InputField = ({ icon, type, placeholder, value, onChange }) => {
    const Icon = icon;
    const [showPassword, setShowPassword] = useState(false);
    console.log(icon, Icon)
    return (
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white">
        {icon && <Icon size={18} color="white" />} 
        {type === "password" && <Lock size={18} color="white" />}
        </div>
        {type === "password"
          ? (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 pl-10 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-900 text-white"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 cursor-pointer right-0 flex items-center pr-3 text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )
          : (
            <input
              type={type}
              className="w-full py-2 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-purple-900 transition-all bg-gray-900 text-white"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          )}
      </div>
    );
  };
