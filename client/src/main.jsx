import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Auth from './pages/Auth.jsx';
import Home from './pages/Home.jsx';
import Groups from './pages/Groups.jsx';
import Goals from './pages/Goals.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/goals" element={<Goals />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </UserProvider>
  </React.StrictMode>
);