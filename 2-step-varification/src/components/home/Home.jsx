import React, { useContext, useState, useRef } from 'react';
import axios from 'axios';
import { BASEURL } from '../App.jsx';
import { UserContext } from '../UserContext.jsx';
import './Home.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

export default function Home() {
  /***** REFS *****/
  const toggleBtn = useRef(null);

  /***** STATES *****/
  const { userName, verification, setVerification } = useContext(UserContext);
  const [qrImg, setImg] = useState(false); // QR src
  const [showImg, setShowImg] = useState(false);

  /***** FUNCTIONS *****/
  // Convert verification from true to false and false to true
  const onVerificationChange = async () => {
    try {
      const response = await axios.post(`${BASEURL}/users/change-verification`, { userName });
      if (response.data !== 'changed!') {
        setImg(response.data); //Set state for showing QR code
        setShowImg(true);
        setVerification(true);
      } else {
        setVerification((prevState) => !prevState);
        setShowImg((prevState) => !prevState); //Set state for hiding QR code
      }
      notyf.success('changed!'); //success message
    } catch (error) {
      setVerification(false);
      notyf.error('Problem updating verification settings Please try again'); //error messege
    }
  };

  return (
    <div id='home-div'>
      <h1>Welcome to my home page, {userName ? userName : 'user'}!! </h1>

      <div id='toggle-div'>
        <h2>Do you want 2-step-verification?</h2>
        <label className='switch'>
          <input ref={toggleBtn} type='checkbox' onChange={onVerificationChange} checked={verification} />
          <span className='slider round'></span>
        </label>
      </div>

      {showImg ? (
        <div>
          <h3>Scan this code for your "Google Authenticator" app:</h3>
          <img alt='qr-code' src={qrImg} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
