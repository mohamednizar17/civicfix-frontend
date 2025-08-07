import { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      login(res.data.user, res.data.token);
      if (res.data.user.role === 'admin') {
        navigate('/admin-tools');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-root">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">🔐 Login</h2>
        {error && <div className="login-error">{error}</div>}
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="login-input"
          required
        />
        <div className="password-container">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="login-input"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            tabIndex="-1"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" className="login-btn">Login</button>
        <div className="login-link-row">
          <span>Don't have an account?</span>
          <a href="/register" className="login-link">Register</a>
        </div>
      </form>
    </div>
  );
}

export default Login; 
