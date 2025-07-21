import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { user, token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={token ? "/home" : "/"} className="font-bold text-xl hover:text-blue-200 transition-colors duration-200">
            Peer Learning Tracker
          </Link>
          <div className="flex gap-4">
            {token ? (
              <>
                <Link
                  to="/home"
                  className="bg-blue-600 border border-white text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/groups"
                  className="bg-blue-600 border border-white text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Groups
                </Link>
                <Link
                  to="/goals"
                  className="bg-blue-600 border border-white text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Goals
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="bg-red-600 border border-white text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 border border-white text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 border border-white text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;