import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

export default function MiniQuizModal({ onClose, onSave }) {
    const [answers, setAnswers] = useState({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
    });
    
    const [isFormValid, setIsFormValid] = useState(false);
    
    // Verificar si al menos una pregunta tiene respuesta
    useEffect(() => {
        const hasAtLeastOneAnswer = Object.values(answers).some(answer => answer !== "");
        setIsFormValid(hasAtLeastOneAnswer);
    }, [answers]);

    const handleSelect = (question, value) => {
        setAnswers((prev) => ({ ...prev, [question]: value }));
    };
    
    const handleSave = () => {
        onSave(answers); // Envía las respuestas al padre
        onClose(); // Cierra el modal
    };

    // Componente de opción de radio personalizada
    const RadioOption = ({ name, value, label, checked, onChange }) => (
        <label className="flex items-start p-1 rounded-lg transition-all cursor-pointer hover:bg-gray-800 mb-1">
            <div className="relative flex items-center pt-0.5">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    checked ? "border-purple-500" : "border-gray-700"
                }`}>
                    {checked && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                    )}
                </div>
            </div>
            <span className="text-gray-200 text-sm">{label}</span>
        </label>
    );
    
    // Componente de sección de pregunta
    const QuestionSection = ({ number, title, question, options }) => {
        const answeredClass = answers[question] ? "border-purple-500" : "border-gray-700";
        
        return (
            <div className={`rounded-lg bg-gray-800 p-2 border-l-4 ${answeredClass} transition-all`}>
                <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-gray-900 text-purple-500 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {number}
                    </div>
                    <h3 className="font-semibold text-white">{title}</h3>
                </div>
                <div className="space-y-0">
                    {options.map((option, idx) => (
                        <RadioOption
                            key={idx}
                            name={question}
                            value={option}
                            label={option}
                            checked={answers[question] === option}
                            onChange={(e) => handleSelect(question, e.target.value)}
                        />
                    ))}
                </div>
                {answers[question] && (
                    <div className="mt-2 text-xs flex items-center text-purple-400">
                        <Check size={12} className="mr-1" />
                        Respuesta seleccionada
                    </div>
                )}
            </div>
        );
    };

    const questions = [
        {
            number: "1",
            title: "¿Qué has aprendido sobre la deforestación en la Sabana Cordobesa?",
            question: "q1",
            options: [
                "Ha cambiado el ecosistema y afecta el agua, tierra y fauna",
                "Solo tiene impacto económico",
                "No he aprendido mucho aún"
            ]
        },
        {
            number: "2",
            title: "¿Qué te ha sorprendido más?",
            question: "q2",
            options: [
                "El nivel de destrucción del ecosistema",
                "La cantidad de actores implicados",
                "No me ha sorprendido nada"
            ]
        },
        {
            number: "3",
            title: "¿Cómo has mejorado tus habilidades de pensamiento crítico y metacognitivo?",
            question: "q3",
            options: [
                "Analizo mejor las causas y consecuencias",
                "Reflexiono sobre mi forma de pensar",
                "No he notado ningún cambio"
            ]
        },
        {
            number: "4",
            title: "¿Qué estrategias te han sido más útiles?",
            question: "q4",
            options: [
                "Lectura crítica y subrayado",
                "Búsqueda de palabras clave",
                "No utilicé ninguna estrategia"
            ]
        }
    ];
    
    // Contador de respuestas completadas
    const completedCount = Object.values(answers).filter(value => value !== "").length;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2">
            <div className="bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden relative">
                {/* Header */}
                <div className="bg-gray-800 p-2 border-b border-gray-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Quiz Final</h2>
                        <p className="text-gray-400 text-sm">Evaluación de lo aprendido</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
                
                {/* Contenido */}
                <div className="p-3 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-1">
                        {/* Barra de progreso */}
                        <div className="mb-6">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>{completedCount} de 4 respondidas</span>
                                <span>{Math.round((completedCount/4)*100)}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                                <div 
                                    className="bg-purple-500 h-2 rounded-full transition-all" 
                                    style={{ width: `${(completedCount/4)*100}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        {/* Preguntas */}
                        {questions.map((q, index) => (
                            <QuestionSection 
                                key={index}
                                number={q.number}
                                title={q.title}
                                question={q.question}
                                options={q.options}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Footer */}
                <div className="bg-gray-800 p-2 border-t border-gray-700 flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                        {isFormValid 
                            ? "¡Listo para guardar tus respuestas!" 
                            : "Selecciona al menos una respuesta para continuar"}
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={!isFormValid}
                        className={`px-6 py-2 rounded-lg transition-all ${
                            isFormValid 
                                ? "bg-purple-500 text-white hover:bg-purple-600 cursor-pointer" 
                                : "bg-gray-700 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Guardar respuestas
                    </button>
                </div>
            </div>
        </div>
    );
}