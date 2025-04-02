import React from "react";
import logoHotizontal from "../../assets/logoHorizontalBlanco.png";
import useAuth from "../../hooks/auth";
import { LoginView } from "./loginView";
import { RegisterView } from "./registerView";
import { RecoverView } from "./recoveryView";
import { ResetPasswordView } from "./resetPasswordView";

const AuthSystem = () => {

  const { view, setRecoverData, recoverData, checkPasswordRecovery, setView, register, login, setLoginData, loginData, registerData, setRegisterData, setConfirmPassword, checkPasswordMatch, confirmPassword, checkUserExists, changePassword  } = useAuth();



  // Renderiza la vista apropiada
  const renderView = () => {
    switch (view) {
      case "login":
        return <LoginView setLoginData={setLoginData} loginData={loginData} login={login} setView={setView} />;
      case "register":
        return <RegisterView setView={setView} setRegisterData={setRegisterData} registerData={registerData} register={register} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} checkPasswordMatch={checkPasswordMatch}  />;
      case "recover":
        return <RecoverView  setView={setView} setRecoverData={setRecoverData} recoverData={recoverData} checkUserExists={checkUserExists}/>;
      case "resetPassword":
        return <ResetPasswordView setView={setView} setRecoverData={setRecoverData} recoverData={recoverData} checkPasswordRecovery={checkPasswordRecovery} changePassword={changePassword} />;
      default:
        return <LoginView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-sm transition-all">
        {renderView()}
      </div>
      <div className="flex justify-center items-center p-2">
        <img
          src={logoHotizontal}
          alt="logo"
          className="w-1/4"
          style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))" }}
        />
      </div>
    </div>
  );
};

export default AuthSystem;
