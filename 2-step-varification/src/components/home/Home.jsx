import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BASEURL } from '../App.jsx';
import { UserContext } from '../UserContext.jsx';
import { useNavigate } from 'react-router';
import './Home.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

export default function Home() {
  /***** REFS *****/
  const toggleBtn = useRef(null);

  /***** STATES *****/
  const { loggedIn, userName, verification, setVerification, qrImg, setQRImg } = useContext(UserContext);
  const [showImg, setShowImg] = useState(qrImg ? true : false);

  /***** FUNCTIONS *****/
  const navigate = useNavigate();
  // Navigate to login page if not logged in
  useEffect(() => {
    if (!loggedIn) {
      navigate('/'); //Login page
    }
  }, [loggedIn]);

  // Convert verification from true to false and false to true
  const onVerificationChange = async () => {
    try {
      const response = await axios.post(`${BASEURL}/users/change-verification`, { userName });
      if (response.data !== 'changed!') {
        setQRImg(response.data); //Set state for showing QR code
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
        <div id='qr-div'>
          <h3>Scan this code for your "Google Authenticator" app:</h3>
          <img alt='qr-code' src={qrImg} />
          <h4>
            Don't have the app? install here easily
            <br />
            <a target='_blank' href='https://apps.apple.com/us/app/google-authenticator/id388497605' rel='noreferrer'>
              App Store
            </a>{' '}
            <br />
            <a
              target='_blank'
              href={
                'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US'
              }
              rel='noreferrer'
            >
              Android
            </a>
          </h4>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
