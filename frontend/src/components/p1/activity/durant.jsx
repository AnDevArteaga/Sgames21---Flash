import React, { useState, useEffect } from "react";
import { saveDurant } from "../../../services/saveDurant.js";

const Durant = ({ onSave, onClose }) => {
    const [respuestas, setRespuestas] = useState({
        estrategias: "",
        informacion: "",
        objetividad: "",
    });
    
    const [formCompleto, setFormCompleto] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const { estrategias, informacion, objetividad } = respuestas;
        setFormCompleto(estrategias !== "" && informacion !== "" && objetividad !== "");
    }, [respuestas]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRespuestas((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuardar = async () => {
        setLoading(true);
        const userId = localStorage.getItem("id_usuario");
        const data = {
            id: userId,
            q1: respuestas.estrategias,
            q2: respuestas.informacion,
            q3: respuestas.objetividad,
        };
        try {
            console.log(respuestas);
            const response = await saveDurant(data);
            console.log(response);
            onSave(response.data);
            onClose();
        } catch (error) {
            console.error("Error al guardar respuestas:", error);
        } finally {
            setLoading(false);
        }
    };
    const RadioOption = ({ name, value, label }) => (
        <label className="flex items-start space-x-3 p-1 rounded-lg transition-colors cursor-pointer mb-2 hover:bg-gray-800">
            <div className="relative flex items-center justify-center">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={respuestas[name] === value}
                    onChange={handleChange}
                    className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 ${
                    respuestas[name] === value 
                        ? "border-purple-500" 
                        : "border-gray-600"
                }`}>
                    {respuestas[name] === value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        </div>
                    )}
                </div>
            </div>
            <span className="text-gray-200 text-sm">{label}</span>
        </label>
    );

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className="bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-800 text-white text-center">
                    <p className="text-lg font-semibold">Guardando respuestas...</p>
                    <div className="mt-4 w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 w-full max-w-5xl overflow-hidden">
                <div className="bg-gray-800 px-6 py-2 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">DURANTE</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Responde todas las preguntas para continuar
                    </p>
                </div>
                
                <div className="p-3 space-y-1 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-1">
                        <p className="font-semibold text-white mb-3 border-l-4 border-purple-500 pl-3">
                        ¿Estás utilizando las estrategias planificadas, te están
                        funcionando?
                        </p>
                        <div className="ml-2">
                            <RadioOption name="estrategias" value="1" label="Sí, las estoy siguiendo y están funcionando bien." onChange={handleChange} />
                            <RadioOption name="estrategias" value="2" label="Sí, pero he tenido que hacer algunos ajustes." onChange={handleChange} />
                            <RadioOption name="estrategias" value="3" label="No estoy seguro(a), necesito revisar mis estrategias." onChange={handleChange} />
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <p className="font-semibold text-white mb-3 border-l-4 border-purple-500 pl-3">
                        ¿Estás encontrando información relevante y confiable, entiendes esa información?
                        </p>
                        <div className="ml-2">
                        <RadioOption name="informacion" value="1" label="Sí, la información es relevante, confiable y la comprendo bien." onChange={handleChange} />
                            <RadioOption name="informacion" value="2" label="En parte, algunas fuentes son útiles, pero tengo dudas sobre su confiabilidad." onChange={handleChange} />
                            <RadioOption name="informacion" value="3" label="No, estoy encontrando información poco clara o poco confiable." onChange={handleChange} />
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <p className="font-semibold text-white mb-3 border-l-4 border-purple-500 pl-3">
                        ¿Estás siendo objetivo en tu análisis y considerando diferentes perspectivas?
                        </p>
                        <div className="ml-2">
                            <RadioOption name="objetividad" value="1" label="Sí, estoy analizando los datos sin influencias personales y explorando distintos puntos de vista." onChange={handleChange} />
                            <RadioOption name="objetividad" value="2" label="En parte, pero a veces mis opiniones pueden afectar mi juicio y necesito ampliar mi visión." onChange={handleChange} />
                            <RadioOption name="objetividad" value="3" label="No, estoy dejando que mis ideas personales influyan demasiado y solo estoy considerando una perspectiva." onChange={handleChange} />
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-800 px-6 py-4 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleGuardar} disabled={!formCompleto} className={`px-6 py-2 rounded-lg transition-all ${formCompleto ? "bg-purple-500 text-white hover:bg-purple-600" : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Durant;
