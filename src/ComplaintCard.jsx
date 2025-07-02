import React from 'react';

function ComplaintCard({ title, description, status, category, image }) {
  return (
    <div className="bg-white/90 border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col gap-2">
      <h3 className="text-xl font-bold text-blue-700">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{category}</span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{status}</span>
      </div>
      {image && (
        <img
          src={image}
          alt="Complaint"
          className="mt-3 rounded-xl max-h-48 object-contain border"
        />
      )}
    </div>
  );
}

export default React.memo(ComplaintCard);