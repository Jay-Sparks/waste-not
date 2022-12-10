import React, { useContext } from 'react';
import style from './RecipeSingle.module.css';

import { UserContext } from "../../providers/UserProvider";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore"; 

function RecipeSingle(props)  {

  const userContext = useContext(UserContext);
  const uid = userContext.uid;
  const foodRef = doc(db, 'users', uid);

  const getRecipeInformation = async () => {
    props.recipeModalState(props.recipeObj);
    const data = null;
    const recipeId = props.recipeObj.id.toString();
    // console.log(recipeId);
    let urlDesc = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeId + "/information";
    // console.log(urlDesc);
    const request = new XMLHttpRequest();
    request.withCredentials = false;
    
    const docSnap = await getDoc(foodRef);
    // console.log(docSnap.data());
    let savedRecipes = docSnap.data();
    let matchedBool = false;
    savedRecipes = savedRecipes.savedRecipeList;
    console.log("saved recipes: ",savedRecipes);
    savedRecipes.forEach((recipe) => {
      if (recipe.id === props.id) {
        console.log("MATCHED");
        matchedBool = true;
        props.singleRecipeInformation(recipe);
        // setMatched(true);
        props.setSavedStatus(true);
        // console.log("in Loop",matched);
      }
      console.log("NO MATCH");
    });
    // console.log(matched);
    if (matchedBool !== true) {
      request.open("GET", urlDesc);
      request.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log("API CALL");
          let response = JSON.parse(this.responseText);
          let summaryStr = response.summary;
          summaryStr = String(summaryStr);
          summaryStr = summaryStr.replace(/<\/?[^>]+(>|$)/g, "");
          // summaryStr = summaryStr.substring(0, 500);
          response.summary = summaryStr;
          let instructionsStr = response.instructions;
          instructionsStr = String(instructionsStr);
          instructionsStr = instructionsStr.replace(/<\/?[^>]+(>|$)/g, "");
          // instructionsStr = instructionsStr.substring(0, 500);
          response.instructions = instructionsStr;
          props.singleRecipeInformation(response);
        }
      });
      request.setRequestHeader("X-RapidAPI-Key", "621b2506f1msh98f6da2d038f416p1309d9jsn41aff0cd1f5a");
      request.setRequestHeader("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");
      request.send(data);
    }
    props.modalState(true);
  }

  return (
    <div 
      className={style.RecipeSingle} 
      onClick={() => getRecipeInformation()}
    >
      <img src={props.image} alt={props.name}/>
      <p className={style.RecipeName}>{props.name}</p>
    </div>
  );
}

export default RecipeSingle;
