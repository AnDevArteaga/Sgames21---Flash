import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const TextHighlighter = ({ onComplete, incorrect, handleClose }) => {
    const text =
        `Manuel cada vez se daba cuenta de como los tiempos cambiaron. motosierras rugían, arboles caian, verde desaparecia. Los ganaderos expandían potreros sin límite, los agricultores talaban para sembrar a gran escala, y los madereros explotaban los árboles centenarios. inversionistas y grandes empresas compraban tierras para proyectos urbanísticos y comerciales, destruyendo más bosque. Manuel recorrió el bosque. Los ríos eran hilos de agua, la tierra estaba seca y animales huian. Recordó las palabras de su abuelo: "Sin árboles, no hay vida." Sabía que debía hacer algo antes de que todo desapareciera.`;

    const correctWords = {
        green: ["motosierras", "arboles", "verde", "caian", "desaparecia", "rugían"],
        yellow: [
            "ganaderos",
            "agricultores",
            "madereros",
            "empresas",
            "inversionistas",
        ],
        purple: ["ríos", "hilos", "tierra", "seca", "animales", "huian"],
    };

    const [selectedColor, setSelectedColor] = useState(null);
    const [highlighted, setHighlighted] = useState(() => {
        const stored = localStorage.getItem("highlighted_words");
        return stored ? JSON.parse(stored) : {};
    });    
    const [modalMessage, setModalMessage] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [hasTriggeredTimeout, setHasTriggeredTimeout] = useState(false);

    const [tracking, setTracking] = useState({
        clicks: 0,
        badSelections: 0,
        time: 0,
    });

    useEffect(() => {
        localStorage.setItem("highlighted_words", JSON.stringify(highlighted));
    }, [highlighted]);

    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTracking(prev => {
                const newTime = prev.time + 1;
                if (newTime >= 120 && !hasTriggeredTimeout) {
                    console.log("⏱️ Tiempo límite alcanzado");
                    incorrect('ac1p1m4');
                    setHasTriggeredTimeout(true);
                }
                return { ...prev, time: newTime };
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [hasTriggeredTimeout]);

    useEffect(() => {
        if (tracking.badSelections >= 5 && !hasTriggeredTimeout) {
            console.log("🚫 Demasiadas palabras incorrectas");
            incorrect('ac1p1m3');
            setHasTriggeredTimeout(true);
        }
    }, [tracking.badSelections, hasTriggeredTimeout]);

    const wordsWithIndexes = text.split(/(\s+)/).map((word, index) => ({
        word,
        index,
    }));

    const handleWordClick = ({ word, index }) => {
        setTracking(prev => ({ ...prev, clicks: prev.clicks + 1 }));

        const plainWord = word.replace(/[\.","'!?¡¿]/g, "").toLowerCase();
        const allCorrect = Object.values(correctWords).flat();
        if (!allCorrect.includes(plainWord) || !selectedColor) {
            setTracking(prev => ({ ...prev, badSelections: prev.badSelections + 1 }));
            return;
        }

        setHighlighted((prev) => {
            const newHighlights = { ...prev };
            if (newHighlights[index]) {
                delete newHighlights[index];
            } else {
                newHighlights[index] = selectedColor;
            }
            return newHighlights;
        });
    };

    const verifyHighlights = () => {
        let allValid = true;
        const totalCorrectWords = Object.values(correctWords).flat();

        for (const [index, selected] of Object.entries(highlighted)) {
            const word = wordsWithIndexes[parseInt(index)].word.replace(
                /[\.","'!?¡¿]/g,
                "",
            ).toLowerCase();
            const correctColor = Object.keys(correctWords).find((color) =>
                correctWords[color].includes(word)
            );
            if (!correctColor || selected !== correctColor) {
                allValid = false;
                break;
            }
        }

        const allCorrectWordsSet = new Set(totalCorrectWords);
        const allSelectedWordsSet = new Set(
            Object.keys(highlighted).map((i) =>
                wordsWithIndexes[i]?.word?.replace(/[\.","'!?¡¿]/g, "")
                    .toLowerCase()
            ),
        );

        if (
            allValid &&
            allCorrectWordsSet.size === Object.keys(highlighted).length
        ) {
            setIsCorrect(true);
            setModalMessage("¡Muy bien! Puedes continuar.");
            setIsCompleted(true);
            clearInterval(timerRef.current);
        } else {
            setIsCorrect(false);
            setModalMessage(
                "Algunas palabras están mal o no se han resaltado todas.",
            );
        }
    };

    const close = () => {
        handleClose();
    };

    return (
        <div className="flex flex-col items-center justify-center">
        <div className="p-3 space-y-2 bg-gray-900 w-4/5">
            <X size={20} className="text-white cursor-pointer" onClick={close} />
            <header className="text-white rounded-xl">
                <ul className="text-sm space-y-1 ">
                    <li>
                        <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                        ¿Cómo la deforestación ha cambiado el ecosistema de la sabana cordobesa?
                    </li>
                    <li>
                        <span className="inline-block w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>
                        ¿Quiénes son los principales responsables de la deforestación?
                    </li>
                    <li>
                        <span className="inline-block w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                        ¿Qué consecuencia de la deforestación se menciona en la historia?
                    </li>
                </ul>
            </header>

            <div className="flex space-x-10 items-center justify-center">
                {Object.entries({
                    green: "#10B981",
                    yellow: "#FBBF24",
                    purple: "#8B5CF6",
                }).map(([color, hex]) => (
                    <div
                        key={color}
                        className={`w-6 h-6 rounded-full cursor-pointer border-4 transition-transform ${
                            selectedColor === color ? "scale-110 border-white" : "border-transparent"
                        }`}
                        style={{ backgroundColor: hex }}
                        onClick={() => setSelectedColor(color)}
                    ></div>
                ))}
            </div>

            <div className="p-4 border rounded-md bg-gray-700 leading-5 text-sm text-white">
                {wordsWithIndexes.map(({ word, index }) => {
                    const isSpace = /^\s+$/.test(word);
                    if (isSpace) return <span key={index}>{word}</span>;

                    return (
                        <span
                            key={index}
                            className="inline-block cursor-pointer px-1"
                            onClick={() => handleWordClick({ word, index })}
                            style={{
                                backgroundColor: highlighted[index]
                                    ? {
                                        green: "#10B981",
                                        yellow: "#FBBF24",
                                        purple: "#8B5CF6",
                                    }[highlighted[index]]
                                    : "transparent",
                                borderRadius: highlighted[index] ? "10px" : "0px",
                            }}
                        >
                            {word}
                        </span>
                    );
                })}
            </div>

            <div className="text-center">
                <button
                    onClick={isCompleted ? onComplete : verifyHighlights}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                    {isCorrect ? "Continuar" : "Verificar Resaltados"}
                </button>
            </div>

            {modalMessage && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
                        <p className="text-lg font-semibold text-gray-800 mb-4">
                            {modalMessage}
                        </p>
                        <button
                            onClick={() => {
                                setModalMessage(null);
                                if (!isCompleted) incorrect('ac1p1m3');
                            }}
                            className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default TextHighlighter;
