import { useState } from 'react';
import '../styles/FormStyles.css';

function RegisterPage() {
  const [nombres, setNombres] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (contrasena !== confirmar) {
      setError('❌ Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombres, correo, contrasena }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ ' + data.message);
        window.location.href = '/login';
      } else {
        setError('❌ ' + data.message);
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="form-section">
      <div className="image-side">
        <img src="/assets/login2.jpg" alt="Register Visual" />
        <div className="image-overlay">
          <h1>Bienvenido</h1>
          <p>Únete a nuestra comunidad y comienza tu viaje</p>
        </div>
      </div>
      <div className="form-container">
        <div className="form-header">
          <h2>Crear Cuenta</h2>
          <p>Regístrate para acceder a todas las funcionalidades</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Nombre completo</label>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="Ingrese su correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Confirme su contraseña"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            <span>Registrarme</span>
          </button>

          <p className="switch-form">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
