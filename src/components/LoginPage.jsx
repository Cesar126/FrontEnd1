import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyles.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert('❌ ' + data.message);
      }
    } catch (err) {
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="login-root">
      <div className="login-container">
        <div className="login-left">
          <div className="login-content">
            <div className="login-header">
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Welcome back! Please enter your details.</p>
            </div>
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
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login-footer-row">
                <label className="remember-me">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  /> 
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot password</a>
              </div>
              <button type="submit" className="login-btn">Sign in</button>
              <p className="login-bottom-text">
                Don't have an account? <a href="/register">Sign up to free!</a>
              </p>
            </form>
          </div>
        </div>
        <div className="login-right">
          {/* Use an actual illustration of an athlete in motion similar to the reference image */}
          <img src="/assets/login2.jpg" alt="Login Visual" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;