import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home.jsx';
import Login from './login/Login.jsx';
import { UserProvider } from './UserContext.jsx';
import Verification from './varification/Verification.jsx';
export const BASEURL = 'http://localhost:8080';

export default function App() {
  return (
    <div>
      <UserProvider>
        <Routes>
          <Route key='login' path={'/'} element={<Login />} />
          <Route key='verification' path={'/verification'} element={<Verification />} />
          <Route key='home' path={'/home'} element={<Home />} />
        </Routes>
      </UserProvider>
    </div>
  );
}
