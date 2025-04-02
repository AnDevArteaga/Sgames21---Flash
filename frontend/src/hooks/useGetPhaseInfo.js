import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/userContext";

const useGetInfoPhaseStudent = () => {
  const { user, setUserDataPhase  } = useUser(); 
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    console.log('user', user);
    if (!user || !user.id_usuario) return; // Verificar que user y id_usuario existan

    try {
      const response = await axios.get(`http://localhost:5000/api/student-info/${user.id_usuario}`, { withCredentials: true });
      setUserDataPhase(response.data || {});
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (user && user.id_usuario) {
        console.log('fetchUserData', user);
        fetchUserData();
      }
  }, [user])

  return { isLoading };
};

export default useGetInfoPhaseStudent;
