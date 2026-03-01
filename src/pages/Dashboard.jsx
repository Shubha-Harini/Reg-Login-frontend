import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/verify');
        setUser(response.data);
      } catch (err) {
        // If unauthorized, the ProtectedRoute handles redirect usually, 
        // but double check here.
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome to KodNest Application</h1>
        <p>Hello, <strong>{user?.username}</strong>! You are logged in.</p>
        <button onClick={handleLogout} className="btn-outline">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
