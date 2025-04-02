import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { UpdateStrategy } from "../../services/updateStrategy";
import LoadingButtons from "../common/LoadingButtons";

const StudyStrategyPlanner = ({ SelectedKey, initCheckInicial, next }) => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <div className="max-w-4xl mx-auto p-6">
      {isSubmitted
        ? ( // Nueva vista después del guardado
          <div className="bg-gray-800 text-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">¡Listo!</h2>
            {sections.map((section, index) => (
              <div key={section.key} className="mb-4">
                <h3 className="font-semibold">{section.title}:</h3>
                <p className="bg-gray-600 p-2 rounded-lg mt-2">
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
                    className="w-full text-left p-5 flex cursor-pointer justify-between items-center bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-md"
                  >
                    {selectedOptions[index] && (
                      <Info
                        className="w-5 h-5 text-purple-500 cursor-pointer hover:text-blue-600"
                        onClick={() => handleInfoClick(section.key)}
                      />
                    )}

                    <h2 className="font-semibold text-base text-white">
                      {section.title}
                    </h2>

                    <div className="text-purple-100 cursor-pointer">
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
                                  ? "bg-purple-800 text-white scale-105 shadow-lg"
                                  : "bg-gray-800 text-white hover:scale-105 hover:bg-purple-900"
                              }`}
                            >
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
                className="px-6 py-3 cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg transition-all duration-300"
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
