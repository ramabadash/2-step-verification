import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login/Login.jsx';
import { UserProvider } from './UserContext.jsx';
export const BASEURL = 'http://localhost:8080';

export default function App() {
  return (
    <div>
      <UserProvider>
        <Routes>
          <Route exect key='login' path={'/'} element={<Login />} />
        </Routes>
      </UserProvider>
    </div>
  );
}
