import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import style from './Application.module.css';

import NavBar from '../../components/NavBar/NavBar';
import UserSignUp from '../../components/UserSignUp/UserSignUp';
import UserSignIn from '../../components/UserSignIn/UserSignIn';
import UserSignOut from '../../components/UserSignOut/UserSignOut';
import Authenticated from '../Authenticated/Authenticated';
// import NotFound from '../NotFound/NotFound';
import LandingPage from '../LandingPage/LandingPage';
import KitchenPantry from '../KitchenPantry/KitchenPantry';
import Recipes from '../../components/Recipes/Recipes';
import Favourites from '../../components/Favourites/Favourites';
import Footer from '../../components/Footer/Footer';


function Application() {
  const user = useContext(UserContext);
  return (
    user ?
    <BrowserRouter>
        <NavBar />
        <div className={style.AuthenticatedUser}>
          <Routes>
            <Route exact="true" path="/" element={<Authenticated />} />
            <Route path="/your-pantry" element={<KitchenPantry />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        <Footer />
        </div>
    </BrowserRouter>
    :
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact="true" path="/" element={<LandingPage/>} />
        <Route path="/signin" element={<UserSignIn/>} />
        <Route path="/signup" element={<UserSignUp/>} />
        <Route path="/signout" element={<UserSignOut/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Application;
