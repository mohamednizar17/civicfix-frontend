import React from 'react';

function FAQ() {
  return (
    <div className="faq-root" style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#f8fafc', borderRadius: 12 }}>
      <h2 style={{ color: '#2563eb', marginBottom: 24 }}>Frequently Asked Questions</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: 20 }}>
          <b>How do I submit a complaint?</b>
          <p>Click the <b>Get Started</b> button on the homepage or use the navigation menu to go to the complaint submission form. Fill in the details and submit.</p>
        </li>
        <li style={{ marginBottom: 20 }}>
          <b>How will I know if my complaint is resolved?</b>
          <p>You will receive an email notification when the status of your complaint changes. You can also track the status and admin comments in your dashboard.</p>
        </li>
        <li style={{ marginBottom: 20 }}>
          <b>Who can see my complaint?</b>
          <p>Only you and the admin team can view your complaint details. Your privacy is respected.</p>
        </li>
        <li style={{ marginBottom: 20 }}>
          <b>Can I edit or delete my complaint?</b>
          <p>You can delete your complaint before it is resolved. Editing is not allowed after submission for transparency.</p>
        </li>
        <li style={{ marginBottom: 20 }}>
          <b>What kind of issues can I report?</b>
          <p>You can report issues related to roads, water, electricity, sanitation, or any other civic concern.</p>
        </li>
        <li style={{ marginBottom: 20 }}>
          <b>What should I do when the webpage is not working?</b>
          <p>Since the backend is hosted on Render, it will go down due to inactivity . so kindly refresh your browser or login again.</p>
        </li>
      </ul>

      <div style={{ marginTop: 40, padding: 24, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #e0e7ff' }}>
        <h3 style={{ color: '#2563eb' }}>Send Us Your Feedback</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href={`mailto:civicfix17@gmail.com?subject=Feedback for CivicFix&body=Your feedback here...`}
            style={{
              display: 'inline-block',
              background: '#2563eb',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 'bold',
              marginTop: 12,
              transition: 'background 0.3s, transform 0.2s',
              boxShadow: '0 4px 4px rgba(14, 97, 239, 0.1)',
              alignContent: 'center',
            }}
          >
            Click here to send feedback via email
          </a>
        </div>
        <p style={{ fontSize: '0.95em', color: '#64748b', marginTop: 8, textAlign: 'center' }}>
          (We are always keen to hear your suggestions!.)
        </p>
      </div>
    </div>
  );
}

export default FAQ;
