import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ComplaintProgressBar from '../components/ComplaintProgressBar';
import ComplaintTimeline from '../components/ComplaintTimeline';

function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const endpoint = user?.role === 'admin' ? '/complaints' : '/complaints/my';
        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setComplaints(res.data);
      } catch (err) {
        setError('Failed to fetch complaints');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  const filteredComplaints = complaints.filter(
    (c) => (filterCategory ? c.category === filterCategory : true)
  );

  return (
    <div className="dashboard-root">
      <div className="dashboard-card">
        <h2 className="dashboard-title">
          {user?.role === 'admin' ? '📊 Admin Dashboard' : '📋 Your Complaints'}
        </h2>
        {error && <div className="dashboard-error">{error}</div>}
        {loading ? (
          <div className="dashboard-loading">Loading complaints...</div>
        ) : (
          <>
            <div className="dashboard-filter-row">
              <label>Filter by Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="dashboard-filter"
              >
                <option value="">All</option>
                <option value="Road">Road</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <ul className="dashboard-list">
              {filteredComplaints.length === 0 ? (
                <li className="dashboard-empty">No complaints found.</li>
              ) : (
                filteredComplaints.map((c) => (
                  <li key={c._id} className="dashboard-complaint">
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                    <ComplaintProgressBar status={c.status} />
                    <div className="dashboard-meta">
                      <span>{c.category}</span>
                      <span>{c.status}</span>
                      <span>{new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                    <ComplaintTimeline statusHistory={c.statusHistory || []} />
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
