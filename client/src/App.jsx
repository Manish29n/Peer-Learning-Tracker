import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="font-bold">Peer Learning Tracker</Link>
          <div>
            {user ? (
              <>
                <Link to="/groups" className="mr-4">Groups</Link>
                <Link to="/goals" className="mr-4">Goals</Link>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
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