import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyles.css'; // ← tu CSS, te voy a pasar también cómo debería ser.

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('✅ ' + data.message);
        navigate('/dashboard');
      } else {
        alert('❌ ' + data.message);
      }
    } catch (err) {
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="form-section">
      {/* Imagen lado derecho */}
      <div className="image-side">
        <img src="/assets/login2.jpg" alt="Login Visual" />
      </div>

      {/* Formulario lado izquierdo */}
      <div className="form-container">
        <h2 className="title">WELCOME BACK</h2>
        <p className="subtitle">Welcome back! Please enter your details.</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="primary-btn">Sign in</button>


          <p className="switch-form">
            Don't have an account? <a href="/register">Sign up for free!</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
