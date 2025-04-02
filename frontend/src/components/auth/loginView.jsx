  // Vista de Login
  import { User, Lock } from "lucide-react";
  import { InputField } from "../common/inputFieldAuth";
  import { InputFieldPassword } from "../common/inpudFieldPassword";
  import { PrimaryButton } from "../common/primaryButton";
  import { SecondaryLink } from "../common/secondaryLinks";
  
export const LoginView = ( { setLoginData, loginData, login, setView } ) => {

    return (
    <div   
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
      <h2 className="text-xl font-bold text-white mb-2">Iniciar Sesión</h2>
      <p className="text-white text-sm">Bienvenido de nuevo</p>
    </div>
        <div className="space-y-4">
            <InputField
                icon={User}
                type="text"
                placeholder="Nombre de usuario"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData((loginData) => ({ ...loginData, username: e.target.value }))
                }            />
            <InputFieldPassword
                icon={Lock}
                placeholder="Contraseña"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((loginData) => ({ ...loginData, password: e.target.value }))
                }              />
            <div className="flex justify-end">
                <SecondaryLink onClick={() => setView("recover")}>¿Olvidaste tu contraseña?</SecondaryLink>
            </div>
            <PrimaryButton onClick={login}>
                Iniciar Sesión
            </PrimaryButton>
            <div className="text-center">
                <p className="text-white text-sm">
                    ¿No tienes una cuenta?{" "}
                    <SecondaryLink onClick={() => setView("register")}>
                        Regístrate
                    </SecondaryLink>
                </p>
            </div>
        </div>
    </div>
  )};
