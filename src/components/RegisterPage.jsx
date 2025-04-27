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
      <div className="image-side">
        <img src="/assets/login2.jpg" alt="Register Visual" />
      </div>
      <div className="form-container">
        <h2>REGISTRO</h2>
        <form onSubmit={handleRegister}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="Ingrese su correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <label>Confirmar contraseña</label>
          <input
            type="password"
            placeholder="Confirme su contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />

          <button type="submit" className="primary-btn">Registrarme</button>

        

          <p className="switch-form">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
