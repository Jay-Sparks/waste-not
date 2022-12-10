import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from "../../firebase";
import { UserContext } from '../../providers/UserProvider';

import style from './NavBar.module.css';
import LogoImage from '../../assets/logo192.png';

const NavBar = () => {
  const user = useContext(UserContext);

  const [isActive, setIsActive] = useState(false);

  const handleToggleMenu = () => {
    isActive ? 
      setIsActive(false)
    :
      setIsActive(true)
  };

  return(
    <div className={style.NavBar}>
      <NavLink exact="true" to="/" className={({isActive}) => isActive ? "activePage" : null  }>
        <img src={LogoImage} alt="Waste-not" className={style.Logo} />
        <p>Waste-Not</p>
      </NavLink>
        <ul className={isActive ? 
          style.NavigationItems
          :
          style.NavigationInactive
          }
        >
          {
            user ? (
              <ul className={style.AuthNavItems}>
                <li className={style.AuthList}>
                  <NavLink
                    exact="true" to="/your-pantry"
                    className={({isActive}) => isActive ? "activePage" : ""  }
                  >
                    Pantry
                  </NavLink>
                </li>
                <li className={style.AuthList}>
                  <NavLink
                    exact="true" to="/recipes"
                    className={({isActive}) => isActive ? "activePage" : ""  }
                    >
                      Meal Ideas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true" to="/favourites"
                    className={({isActive}) => isActive ? "activePage" : ""  }
                    >
                      Favourites
                  </NavLink>
                </li>
              </ul>
            ) : (
              null
            )
          }
          {
            user ? (
              null
              ) : (
              <li className={style.SignUp}>
                <NavLink
                  exact="true" to="/signup"
                  className={({isActive}) => isActive ? "activePage" : ""  }
                  onClick={() => {setIsActive(false)}}>
                    Sign up
                </NavLink>
              </li>
            )
          }
          <li className={style.Login}>
          {
            user ? (
              <>
                <NavLink
                  exact="true" to="/" 
                  onClick = {() => {auth.signOut(); localStorage.clear(); setIsActive(false);}}
                  >
                    Log out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  exact="true" to="/signin"
                  className={({isActive}) => isActive ? "activeLogin" : ""  }
                  onClick={() => {setIsActive(false)}}
                  >
                    Log in
                </NavLink>
              </>
            )
          }
          </li>
        </ul>

      <div className={style.toggleButton} onClick={handleToggleMenu}>
        <span className={style.bar}></span>
        <span className={style.bar}></span>
        <span className={style.bar}></span>
      </div>
    </div>
  );
};

export default NavBar;
