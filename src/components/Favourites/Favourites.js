import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import style from './Favourites.module.css';

import FavouriteRecipe from '../FavouriteRecipe/FavouriteRecipe';
import FavouriteModal from '../FavouriteModal/FavouriteModal';
import { UserContext } from "../../providers/UserProvider";

import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore"; 

const Favourites = (props) => {

  const [ recipeList, setRecipeList ] = useState([]);

  const userContext = useContext(UserContext);
  const uid = userContext.uid;
  const foodRef = doc(db, 'users', uid);

  // console.log("recipeList: ", recipeList);
  const [ modalState, setModalState ] = useState(false);
  const [ modalRecipe, setModalRecipe ] = useState({});
  const [ recipeEquipment, setRecipeEquipment] = useState([]);
  const [ recipeDescription, setRecipeDescription] = useState("");
  const [ recipeInformation, setRecipeInformation ] = useState();
  const [ savedStatus, setSavedStatus ] = useState(false);

  const getFavouriteRecipes = async () => {
    const docSnap = await getDoc(foodRef);
    // console.log(docSnap.data());
    let savedRecipes = docSnap.data();
    savedRecipes = savedRecipes.savedRecipeList;
    // console.log("saved recipes: ",savedRecipes);
    setRecipeList(savedRecipes);
  }

  useEffect(() => {
    getFavouriteRecipes();
  }, []);
  

  return (
    <div className={style.Favourites}>
      {modalState ?
        <FavouriteModal 
          closeModal={setModalState}
          recipeObj={modalRecipe}
          equipment={recipeEquipment}
          description={recipeDescription.summary}
          information={recipeInformation}
          savedStatus={savedStatus}
          setSavedStatus={setSavedStatus}
          getFavouriteRecipes={getFavouriteRecipes}
        />
      :
        <>
          <h3>Favourites</h3>
          <div className={style.RecipeList}>
            {recipeList ?
              recipeList.map( (recipe, index) => 
                <FavouriteRecipe 
                  key={index}
                  id={recipe.id}
                  name={recipe.title}
                  missedIngredientNum={recipe.missedIngredientCount}
                  missedIngredients={recipe.missedIngredients}
                  image={recipe.image}
                  modalState={setModalState}
                  recipeModalState={setModalRecipe}
                  singleRecipeEquiptment={setRecipeEquipment}
                  singleRecipeDescription={setRecipeDescription}
                  singleRecipeInformation={setRecipeInformation}
                  recipeObj={recipe}
                  setSavedStatus={setSavedStatus}
                  savedStatus={savedStatus}
                />
              )
              :
              <p>No recipes found</p>
            }
          </div>
        </> 
      }
    </div>
  )
}

export default Favourites;
