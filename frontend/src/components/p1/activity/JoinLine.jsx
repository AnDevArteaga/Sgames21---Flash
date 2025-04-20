import React, { useEffect, useRef, useState } from "react";
import Xarrow from "react-xarrows";
import { X } from "lucide-react";

export default function App({ onComplete, incorrect, handleClose }) {
  const [connections, setConnections] = useState(() => {
    const saved = localStorage.getItem("character_connections");
    return saved ? JSON.parse(saved) : [];
  });
  const [startPoint, setStartPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCorrectResult, setIsCorrectResult] = useState(null);
  const [tracking, setTracking] = useState({
    time: 0,
    clicks: 0,
    incorrectTries: 0,
  });
  const [hasTriggeredLimit, setHasTriggeredLimit] = useState(false);
  const [incorrectConnections, setIncorrectConnections] = useState([]);
  const timerRef = useRef(null);

  const correctConnections = [
    { from: "img0", to: "box2-1" },
    { from: "box2-1", to: "box1-2" },
    { from: "img1", to: "box0-1" },
    { from: "box0-1", to: "box0-2" },
    { from: "img2", to: "box1-1" },
    { from: "box1-1", to: "box2-2" },
  ];

  const canConnect = (from, to) => {
    const fromCol = from.startsWith("img") ? 1 : from.includes("-1") ? 2 : 3;
    const toCol = to.startsWith("img") ? 1 : to.includes("-1") ? 2 : 3;
    if (fromCol >= toCol) return false;
    const connectionsFrom = connections.filter((conn) => conn.from === from);
    const connectionsTo = connections.filter((conn) => conn.to === to);
    if (from.startsWith("img") && connectionsFrom.length >= 1) return false;
    if (to.includes("-1") && connectionsTo.length >= 1) return false;
    if (
      to.includes("-1") && connectionsTo.some((conn) => conn.to.includes("-2"))
    ) return false;
    if (from.includes("-1") && connectionsTo.length >= 1) return false;
    return true;
  };

  const handleClick = (id) => {
    setTracking((prev) => ({ ...prev, clicks: prev.clicks + 1 }));
    if (startPoint?.id === id) {
      setStartPoint(null);
    } else if (!startPoint) {
      setStartPoint({ id });
    } else {
      if (canConnect(startPoint.id, id)) {
        setConnections([...connections, { from: startPoint.id, to: id }]);
      }
      setStartPoint(null);
    }
  };

  const verifyConnections = () => {
    const isCorrect = correctConnections.every((correct) =>
      connections.some((conn) =>
        conn.from === correct.from && conn.to === correct.to
      )
    );

    const incorrectOnes = connections.filter((conn) =>
      !correctConnections.some((correct) =>
        correct.from === conn.from && correct.to === conn.to
      )
    );

    setIncorrectConnections(incorrectOnes); // Guardar las flechas incorrectas
    setIsCorrectResult(isCorrect);
    setShowModal(true);
    if (!isCorrect) {
      setTracking((prev) => ({
        ...prev,
        incorrectTries: prev.incorrectTries + 1,
      }));
    }
  };

  const removeConnection = (connectionToRemove) => {
    setConnections((prevConnections) =>
      prevConnections.filter((conn) =>
        conn.from !== connectionToRemove.from ||
        conn.to !== connectionToRemove.to
      )
    );
  };

  const characterNames = ["Manuel", "Ganadero", "Abuelo"];
  const dialogues = [
    [
      "Necesitamos tierras para el ganado, es clave para la economía.",
      "Combinar la cría de ganado con la plantación de árboles.",
    ],
    [
      "La naturaleza es el legado del pueblo Zenú.",
      "Reforestar y controlar la tala.",
    ],
    [
      "El impacto ambiental de la tala afecta al agua y la fertilidad.",
      "Educar y reforestar para conservar nuestra cultura.",
    ],
  ];

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTracking((prev) => {
        const newTime = prev.time + 1;
        if (newTime >= 120 && !hasTriggeredLimit) {
          setHasTriggeredLimit(true);
          incorrect("ac2p1m5");
        }
        return { ...prev, time: newTime };
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [hasTriggeredLimit]);

  useEffect(() => {
    if (tracking.incorrectTries >= 3 && !hasTriggeredLimit) {
      setHasTriggeredLimit(true);
      incorrect("ac2p1m4");
    }
  }, [tracking.incorrectTries, hasTriggeredLimit]);

  useEffect(() => {
    localStorage.setItem("character_connections", JSON.stringify(connections));
  }, [connections]);

  return (
    <div className="flex flex-col items-center justify-center">
    <div className="p-4 bg-white w-4/5 rounded-xl">
   
   <div className="container mx-auto">
        <X className="text-gray-800 cursor-pointer mb-2 hover:text-gray-800" onClick={handleClose} />
        <div className="grid grid-cols-[1fr_3fr_3fr] gap-8">
        {[0, 1, 2].map((row) => (
            <React.Fragment key={row}>
              <div
                id={`img${row}`}
                className={`rounded-xl bg-blue-600 col-span-1 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition ${
                  startPoint?.id === `img${row}` ? "ring-4 ring-gray-800" : ""
                }`}
                onClick={() => handleClick(`img${row}`)}
              >
                <span className="text-white font-semibold text-xl">
                  {characterNames[row]}
                </span>
              </div>
              <div
                id={`box${row}-1`}
                className={`bg-gray-200 rounded-xl p-4 border-l-4 border-blue-500 cursor-pointer hover:bg-blue-200 transition ${
                  startPoint?.id === `box${row}-1`
                    ? "ring-4 ring-gray-800"
                    : ""
                }`}
                onClick={() => handleClick(`box${row}-1`)}
              >
                <p className="text-sm text-gray-800 font-medium">
                  {dialogues[row][0]}
                </p>
              </div>

              <div
                id={`box${row}-2`}
                className="bg-gray-200 rounded-xl p-4 border-l-4 border-green-500 cursor-pointer hover:bg-green-200 transition"
                onClick={() => handleClick(`box${row}-2`)}
              >
                <p className="text-sm text-gray-800 font-medium">
                  {dialogues[row][1]}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {connections.map((conn, index) => {
          const isIncorrect = incorrectConnections.some(
            (inc) => inc.from === conn.from && inc.to === conn.to,
          );

          return (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => removeConnection(conn)}
            >
              <Xarrow
                start={conn.from}
                end={conn.to}
                color={isIncorrect ? "#ef4444" : "#6366f1"} // rojo si incorrecto, púrpura si correcto
                headSize={4}
                path="smooth"
              />
            </div>
          );
        })}

        <div className="mt-8 flex flex-col items-center">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-lg cursor-pointer"
            onClick={isCorrectResult ? onComplete : verifyConnections}
          >
            {isCorrectResult === true ? "Completar" : "Verificar conexiones"}
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <p className="text-lg font-semibold mb-4">
              {isCorrectResult
                ? "✅ ¡Todas las conexiones son correctas!"
                : "❌ Hay errores en las conexiones."}
            </p>
            <button
              className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer"
              onClick={() => {
                setShowModal(null)
                isCorrectResult ? onComplete() : incorrect('ac2p1m5');
              }}
            >
              {isCorrectResult ? "Continuar" : "Cerrar"}
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
