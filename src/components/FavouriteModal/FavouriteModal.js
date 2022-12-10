import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../providers/UserProvider";
import style from './FavouriteModal.module.css';

import { db } from "../../firebase";
import { doc, setDoc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore"; 

function FavouriteModal({ 
  closeModal, 
  recipeObj, 
  information, 
  savedStatus, 
  setSavedStatus,
  getFavouriteRecipes
}) {
  const [ recipeInfo, setRecipeInfo ] = useState(false);
  const [ recipeToStore, setRecipeToStore ] = useState([]);
  console.log("from localStorage => RecipeObj", recipeObj); // from localsession storage (ie API call getRecipes)

  // Get User
  const userContext = useContext(UserContext);
  const uid = userContext.uid;
  const foodRef = doc(db, 'users', uid);

  useEffect(() => {
    setRecipeInfo(information);
    setRecipeToStore(information);
  }, [information]);


  const saveRecipeHandler = () => {
    let item = recipeToStore;
    if (savedStatus === true) {
      updateDoc(foodRef, {
        savedRecipeList: arrayRemove(item)
      });
      setSavedStatus(false)
    } else {
      setDoc(foodRef, 
        { savedRecipeList: arrayUnion(item) }, 
        { merge: true }
      );
      setSavedStatus(true);
    }
  };

  return (
    <div className={style.Modal}>
      <div className={style.modalContainer}>
        <div className={style.modalHeader}>
          <div className={style.saveButton}>
            <button onClick={() => saveRecipeHandler()}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
              <path
                fillRule={savedStatus ? "nonzero" : "evenodd"}
                clipRule="evenodd"
                d="M12.0122 5.57169L10.9252 4.48469C8.77734 2.33681 5.29493 2.33681 3.14705 4.48469C0.999162 6.63258 0.999162 10.115 3.14705 12.2629L11.9859 21.1017L11.9877 21.0999L12.014 21.1262L20.8528 12.2874C23.0007 10.1395 23.0007 6.65711 20.8528 4.50923C18.705 2.36134 15.2226 2.36134 13.0747 4.50923L12.0122 5.57169ZM11.9877 18.2715L16.9239 13.3352L18.3747 11.9342L18.3762 11.9356L19.4386 10.8732C20.8055 9.50635 20.8055 7.29028 19.4386 5.92344C18.0718 4.55661 15.8557 4.55661 14.4889 5.92344L12.0133 8.39904L12.006 8.3918L12.005 8.39287L9.51101 5.89891C8.14417 4.53207 5.92809 4.53207 4.56126 5.89891C3.19442 7.26574 3.19442 9.48182 4.56126 10.8487L7.10068 13.3881L7.10248 13.3863L11.9877 18.2715Z"
                fill="currentColor"
              />
              </svg>
            </button>
          </div>
          <h3>{recipeObj.title}</h3>
          <div className={style.closeButton}>
            <button 
              onClick={() => {closeModal(false); setRecipeInfo(false); setSavedStatus(false); getFavouriteRecipes();}}
            >
              x
            </button>
          </div>
        </div>
        <div className={style.topFlex}>
          <img src={recipeObj.image} className={style.recipeImage} alt=""/>
          <div className={style.rightWrapper}>
            {recipeInfo ?
              <div className={style.titleInfo}>
                <div>
                  <h4>Ready In:</h4>
                  <p>{recipeInfo.readyInMinutes} mins</p>
                </div>
                <div>
                  <h4>Prep time:</h4>
                  <p>{recipeInfo.preparationMinutes} mins</p>
                </div>
                <div>
                  <h4>Cooking time:</h4>
                  <p>{recipeInfo.cookingMinutes} mins</p>
                </div>
              </div>
            :
              <></>
            }
            <div className={style.midFlex}>
              <div className={style.Diet}>
                <h4>Dietary information:</h4>
                {recipeInfo ?
                  recipeInfo.diets ?
                    recipeInfo.diets.map((diet, index) =>
                      <p key={index}>{diet}</p>
                    )
                  :
                    <></>
                  :
                    <></>
                }
              </div>
            </div>
          </div>
        </div>
        <div className={style.infoWrapper}>
          {recipeInfo ?
            <>
              <h4>Summary</h4>
              <p>{recipeInfo.summary}</p>
              <div>
                {recipeInfo.instructions ?
                  <></>
                  :
                  <>
                    <h4>Instructions</h4>
                    <p>{recipeInfo.instructions}</p>
                  </>
                }
              </div>
              <a 
                href={recipeInfo.sourceUrl} 
                target="_blank" 
                rel="noreferrer" 
                className={style.linkButton}>View full details</a>
            </>
          :
            <p>n/a</p>
          }
        </div>
      </div>
    </div>
  );
}

export default FavouriteModal;
