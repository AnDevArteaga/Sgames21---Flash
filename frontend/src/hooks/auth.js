import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useAuth = () => {
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");

    // Objeto para datos de registro
    const [registerData, setRegisterData] = useState({
        fullName: '',
        institution: '',
        username: '',
        password: ''
    });

    // Objeto para datos de login
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    // Objeto para datos de recuperación de contraseña
    const [recoverData, setRecoverData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        userId: ''
    });

    // Control de vista
    const [view, setView] = useState('login');


    // Login
    const login = async () => {
        // Validación de campos vacíos
        if (loginData.username.trim() === '' || loginData.password.trim() === '') {
            toast.error('El nombre de usuario y la contraseña son obligatorios');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/login', {
                username: loginData.username,
                password: loginData.password,
            }, { withCredentials: true }
        );

            if (response.data.success) {
                toast.success('Inicio de sesión exitoso');
                setLoginData({...loginData,
                    username: '',
                    password: ''
                })
                // Aquí puedes guardar token o redirigir
                navigate('/app/inicio');
            } else {
                // Si tu backend manda success: false con algún mensaje (en caso de error controlado)
                toast.error(response.data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error en el servidor';
            toast.error(errorMessage);
            console.error('Error en login', error);
        }
    };

    // Validación de registro
    const isRegisterDataValid = () => {
        const { fullName, institution, username, password } = registerData;

        if (!fullName.trim() || !institution.trim() || !username.trim() || !password.trim()) {
            toast.error("Todos los campos son obligatorios.");
            return false;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            toast.error("El nombre de usuario solo puede contener letras, números y guiones bajos.");
            return false;
        }

        if (password.length < 8) {
            toast.error("La contraseña debe tener al menos 8 caracteres");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return false;
        }

        return true;
    };

        // Validación de registro
        const isChangePasswordDataValid = () => {
            const { password, confirmPassword } = recoverData;
    
            if (password.length < 8) {
                toast.error("La contraseña debe tener al menos 8 caracteres");
                return false;
            }
    
            if (password !== confirmPassword) {
                toast.error("Las contraseñas no coinciden.");
                return false;
            }
    
            return true;
        };


    const checkPasswordMatch = () =>  {
        if (registerData.password.trim() !== '') {
        confirmPassword === registerData.password;
        }}

    // Registro
    const register = async () => {
        if (!isRegisterDataValid()) return;

        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
                fullname: registerData.fullName,
                institution: registerData.institution,
                username: registerData.username,
                password: registerData.password,
            });
            console.log(response);
            if (response.data.success) {
                toast.success('Registro exitoso');
                setView('login');
                setRegisterData({ ...registerData, fullName: '', institution: '', username: '', password: '' });
                setConfirmPassword('');
            } else {
                toast.error(response.data.message || 'Error en el registro');
            }
    
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error en el servidor';
            toast.error(errorMessage);
            console.error('Error en register', error);
        }
    };

    const checkPassword = (e) => {
        const password = e.target.value;
        setConfirmPassword(password);
    };

    // Buscar usuario para recuperación de contraseña
    const checkUserExists = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/check-user', { 
                username: recoverData.username 
            });
            if (response.data.success) {
                setRecoverData(prev => ({ ...prev, userId: response.data.data.id_usuario })); 
                console.log(response.data);
                toast.success('Usuario encontrado');
                setView('resetPassword');
            } else {
                toast.error('El usuario no existe. Por favor verifica el nombre de usuario.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error en el servidor';
            toast.error(errorMessage);
            console.error('Error en register', error);
        }
    };

    // Cambiar contraseña
    const changePassword = async () => {
        if (!isChangePasswordDataValid()) return;
        console.log(recoverData);
        try {
            const response = await axios.put('http://localhost:5000/api/user/update-password', {
                newPassword: recoverData.password,
                id_usuario: recoverData.userId
            });
            console.log(response);
            if (response.data.success) {
                toast.success('Contraseña cambiada con éxito');
                setView('login');
                setRecoverData( 
                    {...recoverData, password: '', confirmPassword: '', userId: '', username: ''}
                 )
            } else {
                toast.error(response.data.message || 'Error al cambiar la contraseña');
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error en el servidor';
            toast.error(errorMessage);
            console.error('Error en register', error);        }
    };

    const logOut = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/logout', { withCredentials: true });
            console.log(response);
            if (response.data.success) {
                toast.success('Sesión cerrada');
                navigate('/');
            } else {
                toast.error(response.data.message || 'Error al cerrar sesión');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error en el servidor';
            toast.error(errorMessage);
            console.error('Error en cerar sesion', error);
        }}

    return {
        registerData,
        setRegisterData,
        loginData,
        setLoginData,
        recoverData,
        setRecoverData,
        view,
        setView,
        login,
        register,
        checkUserExists,
        changePassword,
        checkPassword,
        setConfirmPassword,
        checkPasswordMatch,
        logOut
    };
};

export default useAuth;
