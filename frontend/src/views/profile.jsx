import React from 'react';
import fondoHeader from "../assets/fondoHeader.jpg";
import { useUser } from '../contexts/userContext.jsx';
const StudentProfile = () => {
const { user } = useUser();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="relative h-64 bg-gradient-to-r from-purple-600 to-purple-800 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${fondoHeader})`,
              opacity: 0.4
            }}
          />
        </header>

        {/* Profile Photo Circle */}
        <div className="relative px-6 -mt-20 mb-8">
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <img 
              src="/api/placeholder/200/200" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Content */}
        <main className="flex-1 overflow-y-auto p-6 pt-24 md:pt-6 bg-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Student Info */}
            <div className="md:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-md p-12">
                <h2 className="text-2xl font-bold text-white mb-4">Información del Estudiante</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-white">Nombre Completo</h3>
                    <p className="text-lg font-semibold text-white"> {user.nombre_completo}  </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-white">Nombre de Usuario</h3>
                    <p className="text-lg font-semibold text-white">{user.nombre_usuario}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-white">Institución Educativa</h3>
                    <p className="text-lg font-semibold text-white">{user.institucion}</p>
                  </div>
                
                </div>
              </div>
            </div>
            
            {/* Right Column - Module */}
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-md h-full p-12">
                <h2 className="text-2xl font-bold text-white mb-4">Módulo</h2>
                <div className="p-4 bg-purple-600 rounded-lg">
                  <p className="text-white text-sm">Estadísticas</p>
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