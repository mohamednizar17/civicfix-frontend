import { useState } from 'react';
import axios from './api/axios';

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const complaintData = {
      title,
      description,
      category,
      image: '',
      status: 'Pending',
    };

    try {
      await axios.post('/complaints', complaintData);
      setMessage('Complaint submitted successfully!');
      setTitle('');
      setDescription('');
      setCategory('Other');
      setError('');
    } catch (err) {
      setError('Something went wrong.');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 rounded-3xl shadow-xl p-8 max-w-lg mx-auto flex flex-col gap-5 border border-blue-100 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">Submit a Complaint</h2>
      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-600">{error}</div>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border-2 border-blue-200 rounded-xl px-4 py-3 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border-2 border-blue-200 rounded-xl px-4 py-3 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border-2 border-blue-200 rounded-xl px-4 py-3 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        <option>Other</option>
        <option>Road</option>
        <option>Water</option>
        <option>Electricity</option>
        <option>Sanitation</option>
      </select>
      <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-green-500 transition-all duration-200">
        Submit
      </button>
    </form>
  );
};

export default ComplaintForm;