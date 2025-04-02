import { User, Lock, ArrowLeft } from "lucide-react";
import { InputField } from "../common/inputFieldAuth";
import { PrimaryButton } from "../common/primaryButton";
  // Vista de Recuperar Contraseña - Buscar Cuenta
export const RecoverView = ( { setView, setRecoverData, recoverData, checkUserExists } ) => {

    return (
    <div
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
            Recuperar Contraseña
          </h2>
          <p className="text-white text-sm">Busca tu cuenta</p>
        </div>
      </div>

        <p className="text-white mb-4 text-sm">
          Ingresa tu nombre de usuario para buscar tu contraseña.
        </p>

        <InputField
          icon={User}
          type="text"
          placeholder="Nombre de usuario"
          value={recoverData.username}
          onChange={(e) => {
            setRecoverData({ ...recoverData, username: e.target.value });
          }}
        />

        <div className="mt-6">
          <PrimaryButton onClick={checkUserExists}>
            Buscar Cuenta
          </PrimaryButton>
        </div>    </div>
  )};
