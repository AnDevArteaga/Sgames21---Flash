import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/userContext";

const useAuthCheck = () => {
    const { setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
        console.log('verifyToken');
      try {
        const response = await axios.get("http://localhost:5000/api/user/verify-token", { withCredentials: true });
       console.log(response);
        setIsLoading(false); // Token válido, permitir el acceso
        setUser(response.data.data);
        window.localStorage.setItem("id_usuario", response.data.data.id_usuario);
      } catch (error) {
        console.error("Error al verificar el token", error);
        navigate("/"); // Redirigir si es 401
      }
    };

    verifyToken();
  }, [navigate]);

  return { isLoading };
};

export default useAuthCheck;
