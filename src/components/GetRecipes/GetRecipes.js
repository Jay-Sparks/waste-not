import React from 'react';
import { useNavigate } from 'react-router-dom';

import style from './GetRecipes.module.css';

function GetRecipes(props) {

  const navigate = useNavigate();
  // console.log(history);

  const getRecipes = () => {
    // console.log(sessionStorage.getItem("recipes", ));
    let myFood = props.foodItems.map ( p => p.name); //creating an array of food names
    let ingredients = "";
    let endpoint = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients"
    const data = null;
    function formatParams(params) { // setting API parameters
      return "?" + Object
        .keys(params)
        .map(function(key){
          return key + "=" + params[key]
        })
        .join("&")
    }
    
    function URLify(string) {
      return string.trim().replace(/\s/g, '%20');
    }
    
    for (let i=0; i<myFood.length; i++) { // looping through the myFood array to generate the ingredients params for the api
      ingredients += URLify(myFood[i]) + "%2C"
      // console.log(ingredients);
    }
    
    let params = {
      ingredients: ingredients, //A comma-separated list of ingredients that the recipes should contain.
      number: "12", //The maximal number of recipes to return (default = 5).
      ranking: "2", //Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
      ignorePantry: "true", // Whether to ignore pantry ingredients such as water, salt, flour etc..
    }
    
    let url = endpoint + formatParams(params);
    // console.log(url);
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    let response = [];
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        // console.log(this.responseText);
        response = this.responseText;
        response = JSON.parse(response);
        console.log("ok", response);
        // console.log(response.length);
        // console.log(response);
        localStorage.setItem("recipes", JSON.stringify(response));
        // let storedArray = JSON.parse(sessionStorage.getItem("recipes"));
        navigate('/recipes');
      }
    });
    xhr.open("GET", url);
    xhr.setRequestHeader("X-RapidAPI-Key", "621b2506f1msh98f6da2d038f416p1309d9jsn41aff0cd1f5a");
    xhr.setRequestHeader("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");
    xhr.send(data);
  }

  return (
    <div className="center-align">
        <button
          type="button"
          className={style.GetRecipes}
          onClick={ getRecipes }
        >
          Get New Recipes
        </button>
    </div>
  );
}

export default GetRecipes;
