import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './registro.css';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [telefono, setTelefono] = useState('');
    // const [rol, setRol] = useState('pasajero');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Validación de correo
    const validarCorreo = (email) => {
        const dominioPermitido = '@duocuc.cl';
        return email.endsWith(dominioPermitido);
    };

    // Función para manejar el registro
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        if (!validarCorreo(correo)) {
            setError('El correo debe terminar con @duocuc.cl');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/usuarios/registro', {
                nombre,
                correo,
                contrasena,
                telefono
            });
    
            if (response.data && response.data.success) {
                alert('Registro exitoso');
                navigate('/'); 
            } else {
                setError(response.data.message || 'Error durante el registro.');
            }
        } catch (err) {
            console.error('Error al registrar usuario:', err);
            setError('Error al registrar. Por favor, intente nuevamente.');
        }
    };
    

    return (
        <div className="register-content">
            <div className="register-container">
                <h3 className="register-title">Registro</h3>
                <p className="subtitle">Crea tu cuenta para comenzar</p>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-item">
                        <input
                            placeholder="Nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-item">
                        <input
                            placeholder="Correo"
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-item">
                        <input
                            placeholder="Contraseña"
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-item">
                        <input
                            placeholder="Teléfono"
                            type="number"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>
                    <button className="register-button" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Registro;
