import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function WordAssignment( { handleClose, incorrect, onComplete } ) {
    const categories = [
        {
            title: "¿Dónde ocurre la historia?",
            correctWords: ["Sabana cordobesa"],
        },
        {
            title: "¿Qué cambios ha sufrido el ecosistema?",
            correctWords: [
                "Talado de árboles",
                "Los suelos están secos",
                "Los ríos han perdido caudal",
            ],
        },
        {
            title:
                "¿Quiénes son los principales autores de la deforestación y sus profesiones?",
            correctWords: [
                "Ganaderos",
                "Empresas",
                "Agricultura",
                "Inversionistas",
            ],
        },
    ];

    const [selectedWord, setSelectedWord] = useState(null);
    const [assignedWords, setAssignedWords] = useState(() => {
        const saved = localStorage.getItem("word_assignment_data");
        return saved ? JSON.parse(saved) : [[], [], []];
    }); 
    const [availableWords, setAvailableWords] = useState(() => {
        const allWords = categories.flatMap((category) => category.correctWords);
        const used = new Set(assignedWords.flat());
        return allWords.filter((w) => !used.has(w));
    });
    const [modalMessage, setModalMessage] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [tracking, setTracking] = useState({ clicks: 0, time: 0, incorrect: 0 });
    const timerRef = useRef(null);
    const [limitReached, setLimitReached] = useState(false);

    const close = () => {
        handleClose()
    }

    const handleWordClick = (word) => {
        setSelectedWord(word);
        setTracking(prev => ({ ...prev, clicks: prev.clicks + 1 }));
    };

    const handleCategoryClick = (index) => {
        if (selectedWord) {
            const newAssignments = [...assignedWords];
            const newAvailableWords = [...availableWords];

            // Verifica si la palabra ya está en otro contenedor y la elimina
            newAssignments.forEach((words, i) => {
                if (i !== index) {
                    const wordIndex = words.indexOf(selectedWord);
                    if (wordIndex !== -1) {
                        words.splice(wordIndex, 1);
                        newAvailableWords.push(selectedWord);
                    }
                }
            });

            // Añadir la palabra al nuevo contenedor si no está ya en él
            if (!newAssignments[index].includes(selectedWord)) {
                newAssignments[index] = [
                    ...newAssignments[index],
                    selectedWord,
                ];
            }

            setAssignedWords(newAssignments);
            setAvailableWords(
                newAvailableWords.filter((w) =>
                    !newAssignments.flat().includes(w)
                ),
            );
            setSelectedWord(null);
        }
    };

    const removeWordFromCategory = (word, index) => {
        const newAssignments = [...assignedWords];
        newAssignments[index] = newAssignments[index].filter((w) => w !== word);
        setAssignedWords(newAssignments);
        setAvailableWords([...availableWords, word]);
    };

    const checkAnswers = () => {
        const isCorrect = categories.every((category, index) => {
            return (
                assignedWords[index].length === category.correctWords.length &&
                assignedWords[index].every((word) =>
                    category.correctWords.includes(word)
                )
            );
        });
        if (!isCorrect) {
            setTracking(prev => {
                const updated = { ...prev, incorrect: prev.incorrect + 1 };
                if (updated.incorrect >= 5 && !limitReached) {
                    incorrect('ac1p1m5');
                    setLimitReached(true);
                }
                return updated;
            });
        }
        if (isCorrect) {
            setIsCompleted(true);
        }
        setModalMessage(isCorrect ? "¡Muy bien! Podemos avanzar ahora." : "Algunas palabras están mal ubicadas.");
    };

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTracking(prev => {
                const updated = { ...prev, time: prev.time + 1 };
                if (updated.time >= 120 && !limitReached) {
                    incorrect('ac1p1m4');
                    setLimitReached(true);
                }
                return updated;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [limitReached]);

    useEffect(() => {
        localStorage.setItem("word_assignment_data", JSON.stringify(assignedWords));
    }, [assignedWords]);

    return (
        <div className="h-auto flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-gray-900 px-6 py-2 flex flex-row justify-between items-center">
                <h1 className="text-3xl font-extrabold text-white text-center tracking-tight">
                        Asigna las palabras
                    </h1>
                    <button onClick={close}  
                    className="text-white cursor-pointer ">
                        <X size={20} />
                    </button>
       
                </div>

                <div className="p-6 space-y-4 bg-gray-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`
                                transform transition-all duration-300 ease-in-out 
                                border-2 rounded-xl p-4 
                                ${
                                    selectedWord
                                        ? "border-purple-500 hover:shadow-lg"
                                        : "border-gray-600 hover:border-purple-300"
                                }
                                bg-gray-800 
                                hover:scale-[1.02]
                                cursor-pointer
                            `}
                                onClick={() => handleCategoryClick(index)}
                            >
                                <h2 className="text-sm font-bold text-white mb-3">
                                    {category.title}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {assignedWords[index].map((word, i) => (
                                        <span
                                            key={i}
                                            className="
                                            bg-purple-500 text-white 
                                            px-3 py-1 rounded-full 
                                            text-sm font-medium
                                            hover:bg-purple-200
                                            transition-colors duration-200
                                            cursor-pointer
                                        "
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeWordFromCategory(
                                                    word,
                                                    index,
                                                );
                                            }}
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-800 rounded-xl p-4 mt-4">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {availableWords.map((word, index) => (
                                <button
                                    key={index}
                                    className={`
                                    px-3 py-1 rounded-full 
                                    text-sm font-semibold 
                                    transition-all duration-300 ease-in-out
                                    ${
                                        selectedWord === word
                                            ? "bg-purple-600 text-white scale-105 shadow-md"
                                            : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                    }
                                `}
                                    onClick={() => handleWordClick(word)}
                                >
                                    {word}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <button
                            onClick={isCompleted ? onComplete : checkAnswers}
                            className="
                            px-8 py-3 
                            bg-gradient-to-r from-purple-600 to-indigo-600 
                            text-white 
                            font-bold 
                            rounded-full 
                            hover:from-purple-700 hover:to-indigo-700
                            transition-all duration-300
                            transform hover:scale-105
                            shadow-lg hover:shadow-xl
                            cursor-pointer
                        "
                        >
                            {isCompleted ? "Continuar" : "Verificar respuestas"}
                            </button>
                    </div>
                </div>
            </div>

            {modalMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                        <p className="text-lg font-semibold text-gray-900">{modalMessage}</p>
                        <button
                            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 cursor-pointer"
                            onClick={() => {
                                setModalMessage(null);
                                if (!isCompleted) incorrect('ac1p1m5');
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
