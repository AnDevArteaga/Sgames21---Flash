import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUserId = localStorage.getItem("user");
    return storedUserId ? JSON.parse(storedUserId) : null;
  });  const [userDataPhase, setUserDataPhase] = useState({});

  useEffect(() => {
    if (user && user.id_usuario) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, userDataPhase, setUserDataPhase }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder al contexto
export const useUser = () => {
    return useContext(UserContext);
};