import { Home, LogOut, User, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logoHorizontalBlanco.png";

const SideBar = ({ sidebarOpen, setSidebarOpen, logOuthandler }) => {
  return (
    <div
      className={`absolute inset-y-0 left-0 z-50 w-72 bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out 
    ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
      } h-screen overflow-hidden`}
    >
      {/* Logo y botón de cerrar */}
      <div className="flex items-center justify-between h-16 px-12 py-4 border-b bg-gray-800 space-x-4">
        <img
          src={logo}
          alt="logo"
          className="w-full"
          style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))" }}
        />
        {/* Botón para cerrar solo si el sidebar está abierto */}
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md hover:bg-gray-600 cursor-pointer"
          >
            <X size={20} className="text-white" />
          </button>
        )}
      </div>

      {/* Menú de navegación */}
      <nav className="flex flex-col justify-between h-full py-6">
        <div className="space-y-2 px-3">
          <NavLink
            to="/app/inicio"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-white rounded-md group transition-colors ${
                isActive
                  ? "bg-purple-600 font-semibold"
                  : "hover:bg-purple-600 hover:text-white"
              }`}
          >
            <Home className="w-5 h-5 mr-3 text-white group-hover:text-white" />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/app/perfil"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-white rounded-md group transition-colors ${
                isActive
                  ? "bg-purple-600 font-semibold"
                  : "hover:bg-purple-600 hover:text-white"
              }`}
          >
            <User className="w-5 h-5 mr-3 text-white group-hover:text-white" />
            <span>Perfil</span>
          </NavLink>
          <button
            onClick={() => {
              setSidebarOpen(false);
              logOuthandler();
            }}
            className="flex items-center px-3 py-2 text-white rounded-md group transition-colors hover:bg-purple-600 hover:text-white w-full cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3 text-white group-hover:text-white" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
