import React, { useState, useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";

const STORAGE_KEY = "deforestation_table_data";

const defaultData = {
  "Ganadero": { perspective: [], solution: [], stance: [] },
  "Alcalde": { perspective: [], solution: [], stance: [] },
  "Abuelo": { perspective: [], solution: [], stance: [] },
  "Manuel": { perspective: [], solution: [], stance: [] },
  "Empresas Madereras": { perspective: [], solution: [], stance: [] },
};

const DeforestationTable = ({ onComplete, incorrect, handleClose }) => {
  const [modalOpen, setModalOpen] = useState({ actor: null, column: null });
  const [tableData, setTableData] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  });

  const [tracking, setTracking] = useState({ time: 0, clicks: 0, wrongIdeas: 0 });
  const [hasFired, setHasFired] = useState(false);
  const timerRef = useRef(null);

  const [modalMessage, setModalMessage] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const columnIdeas = {
    perspective: {
      "Ganadero": "La ganadería es vista como motor económico regional.",
      "Alcalde": "La comunidad valora tanto el desarrollo como la conservación.",
      "Abuelo": "La naturaleza es parte esencial de la cultura Zenú, y su pérdida afecta al pueblo.",
      "Manuel": "El impacto ambiental de la tala afecta directamente al agua y la fertilidad del suelo.",
      "Empresas Madereras": "La explotación de la madera se justifica por su valor económico",
    },
    solution: {
      "Ganadero": "Buscar alternativas sostenibles como la ganadería silvopastoril.",
      "Alcalde": "Promover proyectos eco-amigables y sostenibles.",
      "Abuelo": "Reforestación y educación ambiental para conservar el legado Zenú.",
      "Manuel": "Implementar programas de reforestación y control estricto de la tala.",
      "Empresas Madereras": "Regular la tala mediante políticas de manejo forestal sostenible.",
    },
    stance: {
      "Ganadero": "A favor de la deforestación por razones económicas.",
      "Alcalde": "Neutral, con enfoque en sostenibilidad y equilibrio.",
      "Abuelo": "Totalmente en contra",
      "Manuel": "En contra de la deforestación.",
      "Empresas Madereras": "A favor de la deforestación por demanda y empleo.",
    },
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTracking(prev => {
        const newTime = prev.time + 1;
        if (newTime >= 10 && !hasFired) {
          setHasFired(true);
          incorrect('ac2p1m3');
        }
        return { ...prev, time: newTime };
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [hasFired]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData));
  }, [tableData]);

  useEffect(() => {
    if (tracking.wrongIdeas >= 5 && !hasFired) {
      setHasFired(true);
      incorrect('ac2p1m2');
    }
  }, [tracking.wrongIdeas, hasFired]);

  const openModal = (actor, column) => {
    setModalOpen({ actor, column });
  };

  const closeModal = () => {
    setModalOpen({ actor: null, column: null });
  };

  const addIdea = (idea) => {
    const { actor, column } = modalOpen;

    const expectedIdea = columnIdeas[column][actor];
    if (idea !== expectedIdea) {
      setTracking(prev => ({ ...prev, wrongIdeas: prev.wrongIdeas + 1 }));
    }

    setTracking(prev => ({ ...prev, clicks: prev.clicks + 1 }));

    const updatedTableData = Object.keys(tableData).reduce((acc, currentActor) => {
      return {
        ...acc,
        [currentActor]: {
          ...tableData[currentActor],
          [column]: tableData[currentActor][column].filter((existingIdea) => existingIdea !== idea),
        },
      };
    }, {});

    updatedTableData[actor][column] = [idea];
    setTableData(updatedTableData);
    closeModal();
  };

  const removeIdea = (actor, column, index) => {
    setTracking(prev => ({ ...prev, clicks: prev.clicks + 1 }));

    setTableData((prev) => ({
      ...prev,
      [actor]: {
        ...prev[actor],
        [column]: prev[actor][column].filter((_, i) => i !== index),
      },
    }));
  };

  const verifyTable = () => {
    let correct = true;

    for (const actor of Object.keys(tableData)) {
      for (const column of ["perspective", "solution", "stance"]) {
        const expected = columnIdeas[column][actor];
        const actual = tableData[actor][column][0];
        if (actual !== expected) {
          correct = false;
          break;
        }
      }
    }

    if (correct) {
      setModalMessage("¡Muy bien! Podemos avanzar ahora.");
      setIsCorrect(true);
    } else {
      setModalMessage("Algunas ideas están mal ubicadas.");
      setIsCorrect(false);
    }
  };

  const handleModalClose = () => {
    setModalMessage(null);
    if (isCorrect) {
      onComplete();
    } else {
      incorrect('ac2p1m2');
    }
  };

  const close = () => {
    handleClose()
  }

  return (
    <div className="container mx-auto p-2">
        <div className="absolute top-2 right-2 cursor-pointer" onClick={close}>
        <X className="text-white" />
        </div>
        
      <table className="w-full border-collapse bg-gray-700 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-purple-600 to-gray-900 text-white">
          <tr>
            <th className="p-2 text-left">Actores involucrados</th>
            <th className="p-2 text-left">Perspectiva</th>
            <th className="p-2 text-left">Posible solución</th>
            <th className="p-2 text-left">¿A favor o en contra?</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tableData).map((actor) => (
            <tr key={actor} className="border-b">
              <td className="p-2 font-semibold text-white text-sm">{actor}</td>
              {["perspective", "solution", "stance"].map((column) => {
                const currentIdeas = tableData[actor][column];
                return (
                  <td
                    key={column}
                    className="p-2 relative text-white cursor-pointer"
                    onClick={() => {
                      if (currentIdeas.length > 0) {
                        removeIdea(actor, column, 0);
                      }
                    }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {currentIdeas.map((idea, index) => (
                        <span
                          key={index}
                          className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center"
                        >
                          {idea}
                        </span>
                      ))}
                      {currentIdeas.length === 0 && (
                        <Plus
                          className="text-purple-300 cursor-pointer"
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(actor, column);
                          }}
                        />
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-6">
        <button
          onClick={verifyTable}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          {isCorrect ? "Continuar" : "Verificar respuestas"}
        </button>
      </div>

      {modalOpen.actor && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div
            className="bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white font-semibold">
                Selecciona ideas para {modalOpen.actor} - {modalOpen.column === "perspective" ? "Perspectiva" : modalOpen.column === "solution" ? "Posible solución" : "Posición"}
              </h2>
              <button onClick={closeModal} className="text-white hover:text-gray-900">
                <X size={24} />
              </button>
            </div>
            <div className="grid gap-2">
              {Object.entries(columnIdeas[modalOpen.column])
                .filter(([actor]) => !Object.values(tableData).some((entry) => entry[modalOpen.column][0] === columnIdeas[modalOpen.column][actor]))
                .map(([actor, idea], index) => (
                  <button
                    key={index}
                    className="w-full text-left p-2 bg-gray-800 hover:bg-purple-100 text-white cursor-pointer hover:text-purple-800 rounded transition-colors"
                    onClick={() => addIdea(idea)}
                  >
                    {idea}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {modalMessage && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold text-gray-900 mb-4">{modalMessage}</p>
            <button
              className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 cursor-pointer"
              onClick={handleModalClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeforestationTable;
