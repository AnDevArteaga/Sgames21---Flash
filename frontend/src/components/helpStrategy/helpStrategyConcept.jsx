import React from 'react';
import { BookOpen, Table, Tags, FileText, Lock, Info } from 'lucide-react';  // Usa estos íconos o los que prefieras
import { Tooltip } from 'react-tooltip';
const SidebarInfo = ({ SelectedKey, agentEvent }) => {
    const handleItemClick = (key) => {
      if (key === 'Lectura Crítica y Subrayado') {
        agentEvent('strategy1_p1_concept');
      } else if (key === 'Búsqueda de Palabras Clave') {
        agentEvent('strategy2_p1_concept');
      } else if (key === 'Mapas Conceptuales') {
        agentEvent('organizer1_p1_concept');
      } else if (key === 'Uso de Tablas') {
        agentEvent('organizer2_p1_concept');
      } else if (key === 'Cuadro de Notas') {
        agentEvent('tool1_p1_concept');
      } else if (key === 'Sistema de Etiquetado') {
        agentEvent('tool2_p1_concept');
      }
    };

       
  const renderContent = () => {
    if (SelectedKey === null) {
      return (
        <div className="flex flex-col items-center justify-center space-y-2">
          <Lock className="w-10 h-10 text-white" />
          <span className="text-white text-center font-medium">Aún no hay nada para mostrar aquí</span>
        </div>
      );
    }

    const renderClickableItem = (icon, label) => (
        <div
          onClick={() => handleItemClick(label)}
          className="flex items-center gap-3 text-white cursor-pointer group 
                     p-3 rounded-lg transition-all duration-300 
                     bg-gray-800 hover:bg-purple-700 hover:scale-105 
                     active:scale-95 active:bg-purple-900"
        >
          <div className="flex-shrink-0">{icon}</div>
          <span className="flex-grow font-medium">{label}</span>
        </div>
      );

    switch (SelectedKey) {
      case "Estrategias":
        return (
          <div className="space-y-3">
            {renderClickableItem( <BookOpen className="w-6 h-6" />, "Lectura Crítica y Subrayado")}
            {renderClickableItem( <FileText className="w-6 h-6" />, "Búsqueda de Palabras Clave")}
          </div>
        );

      case "Organización":
        return (
          <div className="space-y-3">
            {renderClickableItem( <Table className="w-6 h-6" />, "Mapas Conceptuales")}
            {renderClickableItem( <Table className="w-6 h-6" />, "Uso de Tablas")}
          </div>
        );

      case "Herramientas":
        return (
          <div className="space-y-3">
           {renderClickableItem( <FileText className="w-6 h-6" />, "Cuadro de Notas")}
            {renderClickableItem( <Tags className="w-6 h-6" />, "Sistema de Etiquetado")}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full rounded p-4 space-y-8 transition-all duration-500 ease-in-out bg-gray-800">
    {/* Contenedor del título con tooltip */}
    <div className="flex items-center justify-center relative">
      <span className="text-white font-semibold text-xl">{SelectedKey}</span>
      
      {/* Ícono de información con Tooltip */}
      {SelectedKey !== null && (
        <>
              <Info
        className="w-5 h-5 text-white ml-2 cursor-pointer"
        data-tooltip-id="info-tooltip"
      />
      <Tooltip id="info-tooltip" place="top" effect="solid" className='z-100'>
        Haz click en cada opción para decirle a tu agente que te explique cada tipo de {SelectedKey}
      </Tooltip>
        </>


      )}
    </div>

    {/* Contenido dinámico */}
    <div className="space-y-4">{renderContent()}</div>
  </div>
  );
};

export default SidebarInfo;
