import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Debes iniciar sesión primero');
      navigate('/login');
      return;
    }

    // Decodificar el token para sacar el nombre del usuario (manual simple)
    const payloadBase64 = token.split('.')[1];
    const payloadDecoded = JSON.parse(atob(payloadBase64));
    
    setNombreUsuario(payloadDecoded.nombre);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Sesión cerrada correctamente');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Bienvenido, {nombreUsuario}</h2>
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Cerrar Sesión
        </button>
      </header>

      <main className="dashboard-content">
        <h1 className="dashboard-title">Dashboard Principal</h1>
        <div className="dashboard-card">
          <h3>Resumen de Actividad</h3>
          <p>Bienvenido a tu panel de control personalizado.</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
