import React from 'react';

import style from './LandingPage.module.css';

const LandingPage = () => (
  <div className={style.LandingPage}>
    <div className={style.BackgroundImage}>
      <div className={style.Intro}>
        <h1>Welcome to Waste Not!</h1>
        <p>The app designed to find you new recipes</p>
        <p>with <i>whatever</i> food you have in your kitchen</p>
      </div>

      <div className={style.NewBox}>
        <p>
          Waste Not is a portfolio project by  Jay Spencer. 
          Built using React.js and Firebase
        </p>
        <p>
          Please feel free to create a test account using a fake email address to experiment with the features.
          All data is deleted every 30 days.
        </p>

      </div>
    </div> 
  </div>

);


export default LandingPage;
