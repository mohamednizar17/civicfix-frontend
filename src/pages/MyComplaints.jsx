// src/pages/MyComplaints.jsx

import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ComplaintProgressBar from '../components/ComplaintProgressBar';
const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/complaints/my')
      .then(res => {
        setComplaints(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mycomplaints-root">
      <div className="mycomplaints-card">
        <h2 className="mycomplaints-title">📋 My Submitted Complaints</h2>
        {loading ? (
          <div className="mycomplaints-loading">Loading...</div>
        ) : complaints.length === 0 ? (
          <div className="mycomplaints-empty">No complaints submitted yet.</div>
        ) : (
          <ul className="mycomplaints-list">
            {complaints.map(c => (
              <li key={c._id} className="mycomplaints-item">
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <ComplaintProgressBar status={complaint.status} />
                <div className="mycomplaints-meta">
                  <span>{c.category}</span>
                  <span>{c.status}</span>
                  <span>{new Date(c.createdAt).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
