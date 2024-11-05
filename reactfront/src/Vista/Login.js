import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Limpiar el estado de error

        try {
            const response = await axios.post('http://localhost:8000/usuarios/login', {
                correo,
                contrasena
            });

            if (response.data.success) {
                // Si el login es exitoso, redirigir a la página principal o dashboard
                alert('Inicio de sesión exitoso');
                navigate('muro/');  // Redirige a la página principal
            } else {
                setError(response.data.message);  // Mostrar error si las credenciales son incorrectas
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError('Error al iniciar sesión. Por favor, intente de nuevo.');
        }
    };

    return (
        <div className="login-content">
            <div className="login-container">
                <i className="login-icon fas fa-user-circle"></i>
                <h3 className="welcome-title">Inicio de Sesión</h3>
                <p className="subtitle">Bienvenido de nuevo. Por favor, inicia sesión.</p>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-item">
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                            placeholder="Correo"
                        />
                    </div>
                    <div className="input-item">
                        <input
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="button-group">
                        <button className="login-button" type="submit">Ingresar</button>
                        <Link to="/registro" className="register-button">Registrarse</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
