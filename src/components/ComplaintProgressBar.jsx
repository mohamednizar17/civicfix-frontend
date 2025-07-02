import React from 'react';

const statusSteps = ['Pending', 'In Progress', 'Resolved', 'Rejected'];

function ComplaintProgressBar({ status }) {
  const currentStep = statusSteps.indexOf(status);

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
      {statusSteps.map((step, idx) => (
        <React.Fragment key={step}>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              background: idx <= currentStep ? '#2563eb' : '#e0e7ff',
              color: idx <= currentStep ? '#fff' : '#2563eb',
              fontWeight: idx === currentStep ? 'bold' : 'normal',
              border: idx === currentStep ? '2px solid #facc15' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {step}
          </div>
          {idx < statusSteps.length - 1 && (
            <div
              style={{
                width: 28,
                height: 4,
                background: idx < currentStep ? '#2563eb' : '#e0e7ff',
                margin: '0 4px',
                borderRadius: 2,
                transition: 'all 0.2s'
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ComplaintProgressBar;