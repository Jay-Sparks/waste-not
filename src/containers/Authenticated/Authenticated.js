import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../providers/UserProvider";

import style from './Authenticated.module.css';

import PantryIcon from '../../assets/pantry.png';
import PlannerIcon from '../../assets/Planner.png';
import Favourites from '../../assets/wishlist.png';

const Authenticated = () => {
  const user = useContext(UserContext);
  // console.log(user);
  const userArray = {...user};
  // console.log(userArray);
  return (
    <div className={style.TopContainer}>
      <div className={style.TopWrapper}>
        <h3>Hi {userArray.displayName}!</h3>
        <ul className={style.tiles}>
          <Link to="/your-pantry">
            <li>
              <p>Kitchen Pantry</p>
              <img src={PantryIcon} alt="Pantry" />
            </li>
          </Link>
          <Link to="/recipes">
            <li>
              <p>Meal Ideas</p>
              <img src={PlannerIcon} alt="Planner" />
            </li>
          </Link>
          <Link to="/favourites">
            <li>
              <p>Favourite Recipes</p>
              <img src={Favourites} alt="Favourites" />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Authenticated;
