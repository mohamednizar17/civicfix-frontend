import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...registerData } = form;
      const res = await axios.post('/auth/register', registerData);
      localStorage.setItem('token', res.data.token);
      login(res.data.user);

      if (res.data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch {
      setError('Registration failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-root">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2 className="register-title">📝 Create an Account</h2>
        {error && <div className="register-error">{error}</div>}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="register-input"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="register-input"
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="register-input"
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
        <div className="password-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="register-input"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={toggleConfirmPasswordVisibility}
            tabIndex="-1"
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" className="register-btn">
          Create Account
        </button>
        <div className="register-link-row">
          <span>Already have an account?</span>
          <a href="/login" className="register-link">
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
