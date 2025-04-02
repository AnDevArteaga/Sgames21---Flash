// Vista de Registro

import { ArrowLeft, Lock, University, User } from "lucide-react";
import { InputField } from "../common/inputFieldAuth";
import { InputFieldPassword } from "../common/inpudFieldPassword";
import { PrimaryButton } from "../common/primaryButton";
export const RegisterView = (
    {
        setView,
        setRegisterData,
        registerData,
        register,
        confirmPassword,
        setConfirmPassword,
    },
) => {
    return (
        <div
            key="register"
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md"
        >
            <div className="flex items-center mb-8">
                <button
                    onClick={() => setView("login")}
                    className="mr-4 p-2 rounded-full hover:bg-purple-600 cursor-pointer transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowLeft size={20} color="white" />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">
                        Crear Cuenta
                    </h2>
                    <p className="text-white text-sm">
                        Completa tus datos para registrarte
                    </p>
                </div>
            </div>

            <InputField
                icon={User}
                type="text"
                placeholder="Nombre completo"
                value={registerData.fullName}
                onChange={(e) => {
                    setRegisterData({
                        ...registerData,
                        fullName: e.target.value,
                    });
                }}
            />
            <InputField
                icon={University}
                type="text"
                placeholder="Institución educativa"
                value={registerData.institution}
                onChange={(e) => {
                    setRegisterData({
                        ...registerData,
                        institution: e.target.value,
                    });
                }}
            />
            <InputField
                icon={User}
                type="text"
                placeholder="Nombre de usuario"
                value={registerData.username}
                onChange={(e) => {
                    setRegisterData({
                        ...registerData,
                        username: e.target.value,
                    });
                }}
            />
            <InputFieldPassword
                icon={Lock}
                placeholder="Contraseña"
                value={registerData.password}
                onChange={(e) => {
                    setRegisterData({
                        ...registerData,
                        password: e.target.value,
                    });
                }}
            />
            <InputFieldPassword
                icon={Lock}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Indicador de coincidencia */}

            <div className="mt-6">
                <PrimaryButton onClick={register}>
                    Crear Cuenta
                </PrimaryButton>
            </div>
        </div>
    );
};
