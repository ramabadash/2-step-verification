import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home.jsx';
import Login from './login/Login.jsx';
import { UserProvider } from './UserContext.jsx';
export const BASEURL = 'http://localhost:8080';

export default function App() {
  return (
    <div>
      <UserProvider>
        <Routes>
          <Route key='login' path={'/'} element={<Login />} />
          <Route key='login' path={'/home'} element={<Home />} />
        </Routes>
      </UserProvider>
    </div>
  );
}
