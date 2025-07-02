import React from 'react';

function ComplaintTimeline({ statusHistory }) {
  if (!statusHistory || statusHistory.length === 0) return null;
  return (
    <div className="complaint-timeline">
      <h4>Status Timeline</h4>
      <ul>
        {statusHistory.map((entry, idx) => (
          <li key={idx}>
            <b>{entry.status}</b> by {entry.changedBy}
            {entry.changedBy === 'Admin' && (
              <span
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  borderRadius: '6px',
                  fontSize: '0.8em',
                  padding: '2px 8px',
                  marginLeft: 8,
                  verticalAlign: 'middle'
                }}
              >
                Verified Admin
              </span>
            )}
            {' '}on {new Date(entry.date).toLocaleString()}
            {entry.comment && (
              <div style={{ marginLeft: 12, color: '#2563eb' }}>
                <b>Admin Comment:</b> {entry.comment}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComplaintTimeline;