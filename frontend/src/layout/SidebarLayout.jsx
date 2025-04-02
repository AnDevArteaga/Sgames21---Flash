import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/home/sideBar";
import { Menu } from "lucide-react"
import useAuthCheck from "../hooks/useAuthVerify";
import LoadingPages from "../components/common/loadingPages";
import LogoutModal from "../components/auth/logoutModal";
import useAuth from "../hooks/auth";

const SidebarLayout = () => {
  const { isLoading } = useAuthCheck();
  const { logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true); // Controla la visibilidad del botón de menú
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  // Cierra el sidebar cuando cambia la ruta
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Maneja la apertura y cierre del sidebar
  const handleSidebarToggle = (state) => {
    if (!state) {
      setShowMenu(false); // Oculta el botón de menú antes de cerrar
      setTimeout(() => setShowMenu(true), 10); // Muestra el botón después de 500ms
    }
    setSidebarOpen(state);
  };
  const handleLogout = () => {
    setModalOpen(false);
    logOut();
  };
  if (isLoading) {
    return <LoadingPages />;
  }
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900">
      {/* Sidebar con posición absoluta para desplazar el contenido */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={handleSidebarToggle} logOuthandler={() => setModalOpen(true)} />

      {/* Contenido principal con margen dinámico */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        {/* Botón de menú con opacidad y retardo */}
        {showMenu && !sidebarOpen && (
          <button
            onClick={() => handleSidebarToggle(true)}
            className="p-3 fixed top-4 left-4 bg-purple-600 text-white rounded-md shadow-md z-50 opacity-0 animate-fadeIn cursor-pointer"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Contenido de la vista */}
        <div className="flex-1 overflow-auto bg-gray-900">
          <Outlet />
        </div>
      </div>
      <LogoutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleLogout} />

    </div>
  );
};

export default SidebarLayout;
