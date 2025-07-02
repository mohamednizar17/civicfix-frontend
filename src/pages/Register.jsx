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
    role: 'user',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/auth/register', form);
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
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="register-input"
          required
        />
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
