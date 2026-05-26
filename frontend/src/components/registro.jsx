import React, { useState } from 'react';
import api from '../assets/api/api';
import { useNavigate, Link } from 'react-router-dom';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/registro', { email, password });
            navigate('/');
        } catch (error) {
            setError(error.message || 'Error en el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registro-container">
            <h2>Crear Cuenta</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                    <input
                    placeholder='email'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                    placeholder='contraseña'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword  (e.target.value)}
                        required
                    />
                <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
            </form>
            <p><Link to="/">¿Ya tienes cuenta? Inicia sesión aquí</Link></p>
        </div>
    );
};

export default Registro;
