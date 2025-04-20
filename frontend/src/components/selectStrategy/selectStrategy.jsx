import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Info, CheckCircle } from "lucide-react";
import { UpdateStrategy } from "../../services/updateStrategy";
import LoadingButtons from "../common/LoadingButtons";
import { useP1Context } from "../../contexts/p1Context";

const StudyStrategyPlanner = ({ SelectedKey, initCheckInicial, next }) => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {isVisible} = useP1Context()
  const dataCompleted = Object.keys(selectedOptions).length === 3

  useEffect(() => {
    initCheckInicial("startad_p1");
  }, []);

  const sections = [
    {
      key: "Estrategias",
      title:
        "¿Qué estrategias utilizarás para identificar los hechos relevantes?",
      options: [
        "Lectura Crítica y Subrayado",
        "Búsqueda de Palabras Clave",
      ],
    },
    {
      key: "Organización",
      title: "¿Cómo organizarás la información encontrada?",
      options: [
        "Mapas Conceptuales",
        "Uso de Tablas y Gráficos",
      ],
    },
    {
      key: "Herramientas",
      title: "¿Qué herramientas te serán útiles?",
      options: [
        "Cuadro de Notas",
        "Sistema de Etiquetado",
      ],
    },
  ];

  const toggleSection = (index, sectionKey) => {
    console.log("sectionKey", sectionKey);

    const isOpen = openSection === index;

    // Primero, abre la sección sin importar si tiene valores seleccionados
    setOpenSection(isOpen ? null : index);
    SelectedKey(isOpen ? null : sectionKey);

    // Si la sección ya tiene valores seleccionados, no ejecutar el agente
    if (selectedOptions[index]) {
      return;
    }

    // Ejecutar el agente solo si la sección no tiene valores previos
    if (!isOpen) {
      if (sectionKey === "Herramientas") {
        initCheckInicial("select_tool_p1");
      } else if (sectionKey === "Organización") {
        initCheckInicial("select_organizer_p1");
      } else if (sectionKey === "Estrategias") {
        initCheckInicial("select_strategy_p1");
      }
    }
  };
  const handleSelectOption = (sectionIndex, option) => {
    console.log("option", option);
    console.log("sectionIndex", sectionIndex);
    setSelectedOptions({ ...selectedOptions, [sectionIndex]: option });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const userId = localStorage.getItem("id_usuario");
    const updatedStrategy = await UpdateStrategy(
      userId,
      selectedOptions[0],
      selectedOptions[1],
      selectedOptions[2],
    );

    if (updatedStrategy) {
      initCheckInicial("selected_p1");
      setIsSubmitted(true);
      next(3);
    }
    setIsLoading(false);
  };

  const handleInfoClick = (key) => {
    if (key === "Herramientas") {
      initCheckInicial("select_tool_p1");
    } else if (key === "Organización") {
      initCheckInicial("select_organizer_p1");
    } else if (key === "Estrategias") {
      initCheckInicial("select_strategy_p1");
    }
  };
  return (
    <div className={`max-w-4xl mx-auto p-6 bg-white ${ isVisible ? "pointer-events-none select-none" : "" }`}>
    {isSubmitted
      ? ( // Vista después del guardado
        <div className="bg-white shadow-md text-gray-800 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">¡Listo!</h2>
          {sections.map((section, index) => (
            <div key={section.key} className="mb-4">
              <h3 className="font-semibold text-blue-700">{section.title}:</h3>
              <p className="bg-blue-50 p-3 rounded-lg mt-2 text-blue-800">
                {selectedOptions[index] || "No seleccionado"}
              </p>
            </div>
          ))}
        </div>
      )
      : (
        <>
          <div className="overflow-hidden space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.key}
                className="transition-all duration-300 ease-in-out"
              >
                <button
                  onClick={() => toggleSection(index, section.key)}
                  className="w-full text-left p-5 flex cursor-pointer justify-between items-center bg-blue-50 hover:bg-blue-100 transition-colors duration-200 rounded-lg shadow-sm"
                >
                  <div className="flex items-center">
                    {selectedOptions[index] && (
                      <Info
                        className="w-5 h-5 text-purple-500 cursor-pointer hover:text-blue-600 mr-2"
                        onClick={() => handleInfoClick(section.key)}
                      />
                    )}
                    <h2 className="font-semibold text-base text-blue-800">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-purple-500 cursor-pointer">
                    {openSection === index ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openSection === index
                      ? "max-h-96 opacity-100 py-5"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <div className="p-5">
                    {section.options.length > 0 && (
                      <ul className="space-y-2">
                        {section.options.map((option, optIndex) => (
                          <li
                            key={optIndex}
                            onClick={() => handleSelectOption(index, option)}
                            className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 transform ${
                              selectedOptions[index] === option
                                ? "bg-purple-100 text-purple-800 scale-105 shadow-md border border-purple-200"
                                : "bg-white text-gray-700 hover:bg-blue-50 hover:scale-105 border border-gray-100"
                            }`}
                          >
                            {selectedOptions[index] === option && (
                              <CheckCircle className="w-5 h-5 text-purple-600 inline mr-2" />
                            )}
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!dataCompleted}
              className="px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? <LoadingButtons /> : "Guardar Estrategia"}
            </button>
          </div>
        </>
      )}
  </div>
  );
};

export default StudyStrategyPlanner;
