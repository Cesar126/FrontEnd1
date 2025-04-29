import { useState } from 'react';
import '../styles/FormStyles.css';

function RegisterPage() {
  const [nombres, setNombres] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (contrasena !== confirmar) {
      alert('❌ Las contraseñas no coinciden');
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
        alert('❌ ' + data.message);
      }
    } catch (err) {
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="form-section">
      <div className="form-container">
        <div className="form-header">
          <h2>Registro</h2>
          <p>Crear una nueva cuenta</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Nombres</label>
            <input
              type="text"
              placeholder="Ingresa tus nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Correo</label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Confirma tu contraseña"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="primary-btn">
            Registrarse
          </button>
        </form>
        <div className="switch-form">
          <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
      </div>
      <div className="image-side">
        <img src="/images/register-image.jpg" alt="Registro" />
      </div>
    </div>
  );
}

export default RegisterPage;
