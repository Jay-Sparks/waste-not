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

      {/* <div className={style.ListBanner}>
        <h3>Waste Not will help you:</h3>
        <ul className={style.ListWrapper}>
          <li>Keep track of the food in your kitchen</li>
          <li>find recipes with your ingredients</li>
          <li>Plan your meals to waste less</li>
        </ul>
      </div> */}
    </div>
  </div>

);


export default LandingPage;
