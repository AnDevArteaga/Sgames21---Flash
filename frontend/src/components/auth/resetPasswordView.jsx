
import { Lock, ArrowLeft } from "lucide-react";
import { InputFieldPassword } from "../common/inpudFieldPassword";
import { PrimaryButton } from "../common/primaryButton";

  // Vista de Restablecer Contraseña
export const ResetPasswordView = ( { setView, setRecoverData, recoverData, changePassword } ) => {

    return (
    <div
      className="w-full max-w-md"
    >
      <div className="flex items-center mb-8">
        <button
          onClick={() => setView("recover")}
          className="mr-4 p-2 rounded-full hover:bg-purple-600 cursor-pointer transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} color="white" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Nueva Contraseña
          </h2>
        </div>
      </div>

      <form className="space-y-4"  onSubmit={(e) => {
    e.preventDefault(); 
    changePassword();
  }}>
        <p className="text-white text-sm mb-4">
          Crea una nueva contraseña segura que no uses en otros sitios.
        </p>

        <InputFieldPassword
          icon={Lock}
          placeholder="Nueva contraseña"
          value={recoverData.password}
          onChange={(e) => { setRecoverData({ ...recoverData, password: e.target.value }); }}
        />

        <InputFieldPassword
          icon={Lock}
          placeholder="Confirmar nueva contraseña"
          value={recoverData.confirmPassword}
          onChange={(e) => { setRecoverData({ ...recoverData, confirmPassword: e.target.value }); }}
        />

        <div className="mt-6">
          <PrimaryButton type={"submit"}
          >
            Cambiar Contraseña
          </PrimaryButton>
        </div>
      </form>
    </div>
  )};