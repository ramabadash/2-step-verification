import React from 'react';
import './Verification.css';

export default function Verification() {
  return (
    <div id='verification-div'>
      <h1>Verification page :</h1>
      <input type='text' placeholder='Enter the code from your app here...' />
      {/* TODO - ADD CODE VALIDATION API FUNCTION */}
      <button className='login-btn'>LOGIN</button>
    </div>
  );
}
