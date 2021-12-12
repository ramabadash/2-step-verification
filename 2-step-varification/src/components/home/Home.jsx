import React, { useContext } from 'react';
import { UserContext } from '../UserContext.jsx';
import './Home.css';

export default function Home() {
  /***** STATES *****/
  const { userName } = useContext(UserContext);

  return (
    <div id='home-div'>
      <h1>Welcome to my home page, {userName ? userName : 'user'}!! </h1>

      <div id='toggle-div'>
        <h2>Do you want 2-step-verification?</h2>
        <label className='switch'>
          <input type='checkbox' />
          <span className='slider round'></span>
        </label>
      </div>
    </div>
  );
}
