import { useState } from 'react';
import Login from './Login';
import Register from './Register';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg transition-all duration-300">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-700 hover:text-white transition-colors duration-200`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-700 hover:text-white transition-colors duration-200`}
          >
            Register
          </button>
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Auth;