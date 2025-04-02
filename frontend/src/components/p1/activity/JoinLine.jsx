import React, { useState, useEffect, useRef } from "react";
import Xarrow from "react-xarrows";

export default function App({ onComplete, incorrect }) {
  const [connections, setConnections] = useState(() => {
    const saved = localStorage.getItem("character_connections");
    return saved ? JSON.parse(saved) : [];
  });  const [startPoint, setStartPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCorrectResult, setIsCorrectResult] = useState(null);
  const [tracking, setTracking] = useState({ time: 0, clicks: 0, incorrectTries: 0 });
  const [hasTriggeredLimit, setHasTriggeredLimit] = useState(false);
  const timerRef = useRef(null);

  const correctConnections = [
    { from: "img0", to: "box0-1" },
    { from: "box0-1", to: "box0-2" },
    { from: "img1", to: "box1-1" },
    { from: "box1-1", to: "box1-2" },
    { from: "img2", to: "box2-1" },
    { from: "box2-1", to: "box2-2" }
  ];

  const canConnect = (from, to) => {
    const fromCol = from.startsWith("img") ? 1 : from.includes("-1") ? 2 : 3;
    const toCol = to.startsWith("img") ? 1 : to.includes("-1") ? 2 : 3;
    if (fromCol >= toCol) return false;
    const connectionsFrom = connections.filter((conn) => conn.from === from);
    const connectionsTo = connections.filter((conn) => conn.to === to);
    if (from.startsWith("img") && connectionsFrom.length >= 1) return false;
    if (to.includes("-1") && connectionsTo.length >= 1) return false;
    if (to.includes("-1") && connectionsTo.some(conn => conn.to.includes("-2"))) return false;
    if (from.includes("-1") && connectionsTo.length >= 1) return false;
    return true;
  };

  const handleClick = (id) => {
    setTracking(prev => ({ ...prev, clicks: prev.clicks + 1 }));
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
      connections.some((conn) => conn.from === correct.from && conn.to === correct.to)
    );
    setIsCorrectResult(isCorrect);
    setShowModal(true);
    if (!isCorrect) {
      setTracking(prev => ({ ...prev, incorrectTries: prev.incorrectTries + 1 }));
    }
    };

  const removeConnection = (connectionToRemove) => {
    setConnections((prevConnections) =>
      prevConnections.filter((conn) =>
        conn.from !== connectionToRemove.from || conn.to !== connectionToRemove.to
      )
    );
  };

  const characterNames = ['Manuel', 'Ganadero', 'Abuelo'];
  const dialogues = [
    ["Necesitamos tierras para el ganado, es clave para la economía.", "Implementar ganadería silvopastoril."],
    ["La naturaleza es el legado del pueblo Zenú.", "Educar y reforestar para conservar nuestra cultura."],
    ["El impacto ambiental de la tala afecta al agua y la fertilidad.", "Reforestar y controlar la tala."]
  ];

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTracking(prev => {
        const newTime = prev.time + 1;
        if (newTime >= 120 && !hasTriggeredLimit) {
          setHasTriggeredLimit(true);
          incorrect('ac2p1m5');
        }
        return { ...prev, time: newTime };
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [hasTriggeredLimit]);

  useEffect(() => {
    if (tracking.incorrectTries >= 3 && !hasTriggeredLimit) {
      setHasTriggeredLimit(true);
      incorrect('ac2p1m4');
    }
  }, [tracking.incorrectTries, hasTriggeredLimit]);

  useEffect(() => {
    localStorage.setItem("character_connections", JSON.stringify(connections));
  }, [connections]);


  return (
    <div className="p-6 bg-gray-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-8">
          {[0, 1, 2].map((row) => (
            <React.Fragment key={row}>
              <div
                id={`img${row}`}
                className={`rounded-xl bg-gray-800 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition ${startPoint?.id === `img${row}` ? "ring-4 ring-purple-400" : ""}`}
                onClick={() => handleClick(`img${row}`)}
              >
                <span className="text-white font-semibold text-xl"> {characterNames[row]} </span>
              </div>

              <div
                id={`box${row}-1`}
                className={`bg-white rounded-xl p-4 border-l-4 border-blue-500 cursor-pointer hover:bg-blue-50 transition ${startPoint?.id === `box${row}-1` ? "ring-4 ring-purple-400" : ""}`}
                onClick={() => handleClick(`box${row}-1`)}
              >
                <p className="text-sm text-gray-800 font-medium">{dialogues[row][0]}</p>
              </div>

              <div
                id={`box${row}-2`}
                className="bg-white rounded-xl p-4 border-l-4 border-green-500 cursor-pointer hover:bg-green-50 transition"
                onClick={() => handleClick(`box${row}-2`)}
              >
                <p className="text-sm text-gray-800 font-medium">{dialogues[row][1]}</p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {connections.map((conn, index) => (
          <div key={index} className="relative cursor-pointer" onClick={() => removeConnection(conn)}>
            <Xarrow start={conn.from} end={conn.to} color="#6366f1" headSize={4} path="smooth" />
          </div>
        ))}

        <div className="mt-8 flex flex-col items-center">
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition shadow-lg"
            onClick={isCorrectResult ? onComplete : verifyConnections}
          >
            {isCorrectResult === true ? "Continuar" : "Verificar conexiones"}
            </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <p className="text-lg font-semibold mb-4">
              {isCorrectResult ? "✅ ¡Todas las conexiones son correctas!" : "❌ Hay errores en las conexiones."}
            </p>
            <button
              className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 cursor-pointer"
              onClick={() => {
                if (isCorrectResult) {
                  setShowModal(false);
                } else {
                  incorrect('ac2p1m4');
                }
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}