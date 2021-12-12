import React, { useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';
import { BASEURL } from '../App.jsx';
import { useNavigate } from 'react-router';
import './Verification.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
const notyf = new Notyf();

export default function Verification() {
  /***** STATES ******/
  const { loggedIn, userName, verification } = useContext(UserContext);

  /***** REFS ******/
  const codeInput = useRef(null);

  /***** FUNCTIONS ******/
  //
  const { logout } = useContext(UserContext);
  //
  const navigate = useNavigate();
  // Navigate to login page if not logged in
  useEffect(() => {
    if (!loggedIn || !verification) {
      navigate('/'); //Login page
    }
  }, [loggedIn]);

  // Validate from app code
  const validateCode = async () => {
    try {
      const code = codeInput.current.value;
      const response = await axios.post(`${BASEURL}/users/verification-login`, { userName, code });
      if (response.data) {
        navigate(`/${response.data}`);
      }
    } catch (error) {
      notyf.error(`Sorry, ${error.response.data}. please try again!`); //error message
    }
  };

  return (
    <div id='verification-div'>
      <button className='logout' onClick={logout}>
        <i className='fas fa-sign-out-alt'></i>
      </button>
      <h1>Verification page :</h1>
      <input ref={codeInput} type='text' placeholder='Enter the code from your app here...' />
      <button className='login-btn' onClick={validateCode}>
        LOGIN
      </button>
    </div>
  );
}
