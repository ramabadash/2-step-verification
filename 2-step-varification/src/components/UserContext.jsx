import axios from 'axios';
import React, { useState } from 'react';
import { BASEURL } from './App.jsx';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

export const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [verification, setVerification] = useState(false);

  // Send login form
  const login = async (userName, password) => {
    try {
      if (!userName || !password) {
        return notyf.error(`Sorry, Missing details. please try again!`); //error message
      }
      const response = await axios.post(`${BASEURL}/users/login`, {
        userName,
        password: String(password),
      });
      setUserName(userName);
      setLoggedIn(true);
      setVerification(response.data === 'verification');
      notyf.success('Welcome!'); //success message
      return response.data;
    } catch (error) {
      notyf.error(`Sorry, ${error.response.data}. please try again!`); //error message
    }
  };

  return (
    <UserContext.Provider value={{ loggedIn, userName, verification, setVerification, login }}>
      {children}
    </UserContext.Provider>
  );
};
