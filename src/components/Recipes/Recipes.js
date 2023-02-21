import React from 'react';
import { useState, useEffect } from 'react';
import style from './Recipes.module.css';

import RecipeSingle from '../RecipeSingle/RecipeSingle';
import Modal from '../Modal/Modal';

const Recipes = () => {

  const [ recipeList, setRecipeList ] = useState(JSON.parse(localStorage.getItem("recipes")));

  // console.log(recipeList);
  const [ modalState, setModalState ] = useState(false);
  const [ modalRecipe, setModalRecipe ] = useState({});
  const [ recipeEquipment, setRecipeEquipment] = useState([]);
  const [ recipeDescription, setRecipeDescription] = useState("");
  const [ recipeInformation, setRecipeInformation ] = useState();
  const [ savedStatus, setSavedStatus ] = useState(false);

  useEffect(() => {
    setRecipeList(recipeList);
  }, [recipeList]);

  return (
    <div className={style.Recipes}>
      {modalState ?
        <Modal 
          closeModal={setModalState}
          recipeObj={modalRecipe}
          equipment={recipeEquipment}
          description={recipeDescription.summary}
          information={recipeInformation}
          savedStatus={savedStatus}
          setSavedStatus={setSavedStatus}
        />
      :
        <div className={style.RecipeWrapper}>
          <h3>Meal Ideas</h3>
          <div className={style.RecipeList}>
            {recipeList ?
              recipeList.map( (recipe, index) => 
                <RecipeSingle 
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
              <p className={style.noRecipes}>No ideas yet...you can get new recipes using the pantry page</p>
            }
          </div>
        </div> 
      }
    </div>
  )
}

export default Recipes;
