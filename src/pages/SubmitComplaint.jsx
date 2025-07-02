// src/pages/SubmitComplaint.jsx
import { useState } from 'react';
import axios from '../api/axios';

function SubmitComplaint() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: 'Other',
    image: '',
  });

  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axios.post('/complaints', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Complaint submitted successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        category: 'Other',
        image: '',
      });
      setPreview('');
    } catch {
      setError('Submission failed.');
    }
  };

  return (
    <div className="submit-root">
      <form className="submit-card" onSubmit={handleSubmit}>
        <h2 className="submit-title">📢 Submit a Complaint</h2>
        {message && <div className="submit-success">{message}</div>}
        {error && <div className="submit-error">{error}</div>}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="submit-input"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="submit-input"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="submit-input"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="submit-input"
        >
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="submit-input"
        />
        {preview && (
          <img src={preview} alt="Preview" className="submit-preview" />
        )}
        <button type="submit" className="submit-btn">Submit Complaint</button>
      </form>
    </div>
  );
}

export default SubmitComplaint;
