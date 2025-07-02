import { useEffect, useState } from 'react';
import axios from '../api/axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import ComplaintTimeline from '../components/ComplaintTimeline';

const COLORS = ['#2563eb', '#22c55e', '#facc15', '#f87171', '#00C49F'];

function AdminTools() {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [comment, setComment] = useState({}); // { [complaintId]: commentText }

  useEffect(() => {
    fetchComplaints();
    axios.get('/admin/stats').then(res => setStats(res.data));
    // eslint-disable-next-line
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/complaints', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setComplaints(res.data);
    } catch (err) {
      setError(err.response?.data?.message || '❌ Error fetching complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) return;
    try {
      await axios.delete(`/complaints/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchComplaints();
    } catch (err) {
      console.error('❌ Error deleting complaint:', err.response?.data?.message || err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`/complaints/${id}`, {
        status: newStatus,
        comment: comment[id] || '',
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchComplaints();
      setComment((prev) => ({ ...prev, [id]: '' })); // Clear comment after submit
    } catch (err) {
      console.error('❌ Error updating status:', err.response?.data?.message || err.message);
    }
  };

  const handleDownloadImage = (base64Image, fileName) => {
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryData = () => {
    const counts = {};
    complaints.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const getStatusData = () => {
    const counts = {};
    complaints.forEach((c) => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const getComplaintsByDate = () => {
    const counts = {};
    complaints.forEach((c) => {
      const date = new Date(c.createdAt).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([date, value]) => ({ date, value }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const filteredComplaints = complaints.filter((c) => {
    return (
      (filterStatus ? c.status === filterStatus : true) &&
      (filterCategory ? c.category === filterCategory : true)
    );
  });

  return (
    <div className="admin-root">
      <div className="admin-container">
        <h2 className="admin-title">
          🛠️ Admin Complaint Tools
        </h2>

        {error && <p className="admin-error">{error}</p>}

        {loading ? (
          <p className="admin-loading">Loading complaints...</p>
        ) : (
          <>
            {/* Stats */}
            <div className="admin-card admin-stats-card">
              <h3 className="admin-card-title">Admin Statistics</h3>
              {stats ? (
                <ul className="admin-stats-list">
                  <li>Total Users: <b>{stats.users}</b></li>
                  <li>Total Complaints: <b>{stats.complaints}</b></li>
                  <li>Resolved: <b>{stats.resolved}</b></li>
                </ul>
              ) : (
                <div className="admin-loading">Loading stats...</div>
              )}
            </div>

            {/* Charts */}
            <div className="admin-charts-row">
              <div className="admin-card admin-chart-card">
                <h3 className="admin-card-title">Complaints by Category</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={getCategoryData()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {getCategoryData().map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="admin-card admin-chart-card">
                <h3 className="admin-card-title">Complaints by Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={getStatusData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="admin-card admin-chart-card">
              <h3 className="admin-card-title">Complaints Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getComplaintsByDate()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Filters */}
            <div className="admin-filter-row">
              <select
                className="admin-filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                className="admin-filter-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Road">Road</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Complaint List */}
            {filteredComplaints.length === 0 ? (
              <p className="admin-empty">No complaints match filter.</p>
            ) : (
              <ul className="admin-complaint-list">
                {filteredComplaints.map((c) => (
                  <li
                    key={c._id}
                    className="admin-complaint-card"
                  >
                    <div>
                      <h3 className="admin-complaint-title">{c.title}</h3>
                      <p className="admin-complaint-desc">{c.description}</p>
                      <p className="admin-complaint-meta">
                        {c.category} • {new Date(c.createdAt).toLocaleString()}
                      </p>
                      <span className="admin-complaint-status">
                        {c.status}
                      </span>
                    </div>
                    {c.image && (
                      <div className="admin-complaint-image-wrap">
                        <strong>Image:</strong>
                        <br />
                        <img
                          src={c.image}
                          alt="Complaint"
                          className="admin-complaint-image"
                        />
                        <br />
                        <button
                          onClick={() => handleDownloadImage(c.image, c._id)}
                          className="admin-complaint-download-btn"
                        >
                          Download Image
                        </button>
                      </div>
                    )}
                    <div className="admin-complaint-status-row">
                      <label>Status:</label>
                      <select
                        value={c.status}
                        onChange={e => handleStatusChange(c._id, e.target.value)}
                        className="admin-complaint-status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Admin comment (optional)"
                      value={comment[c._id] || ''}
                      onChange={e => setComment(prev => ({ ...prev, [c._id]: e.target.value }))}
                      className="admin-comment-input"
                    />
                    <button
                      className="admin-complaint-delete-btn"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                    {/* Timeline */}
                    <ComplaintTimeline statusHistory={c.statusHistory || []} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminTools;