import { useState } from 'react';
import '../styles/RegisterStyles.css';

function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
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
        body: JSON.stringify({ nombre, apellidos, contrasena }),
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
    <div className="register-root">
      <div className="register-left">
        <h1 className="register-title">REGISTRO</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Apellidos</label>
            <input
              type="text"
              placeholder="Apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>confirmar contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
            />
          </div>
          {error && <div className="register-error">{error}</div>}
          <button type="submit" className="register-btn">Registrarse</button>
        </form>
      </div>
      <div className="register-right">
        <img src="/assets/login2.jpg" alt="Register Visual" />
      </div>
    </div>
  );
}

export default RegisterPage;
