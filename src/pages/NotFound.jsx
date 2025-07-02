import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-4">🚫 404 - Page Not Found</h2>
      <p className="text-lg text-gray-700 mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg hover:from-blue-600 hover:to-green-500 transition-all duration-200"
      >
        🔙 Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;