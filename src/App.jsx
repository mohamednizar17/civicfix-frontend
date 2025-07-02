import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SubmitComplaint from './pages/SubmitComplaint';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from './context/AuthContext';
import FAQ from './pages/FAQ'

const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminTools = lazy(() => import('./pages/AdminTools'));

function App() {
  const { user } = useAuth();

  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <Suspense fallback={
          <div className="app-loading">
            <div className="app-spinner"></div>
            <p>Loading page...</p>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitComplaint />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin', 'user']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-tools"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminTools />
                </ProtectedRoute>
              }
            />
            <Route path="/faq" element={<FAQ />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="app-footer">
        CivicFix &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;