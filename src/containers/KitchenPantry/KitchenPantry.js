import React, { useEffect } from 'react';
import {  useContext, useState } from 'react';
import { Provider } from '../../providers/index';
import { UserContext } from "../../providers/UserProvider";

import style from './KitchenPantry.module.css';

import FoodItem from '../../components/FoodItem/FoodItem';
import SavedFoodItem from '../../components/SavedFoodItem/SavedFoodItem';
import NewFoodItem from '../../components/NewFoodItem/NewFoodItem';
import GetRecipes from '../../components/GetRecipes/GetRecipes';


function KitchenPantry()  {

  // Get User
  const userContext = useContext(UserContext);

  //States
  const [ user, setUser ] = useState(userContext);
  const [foodItems, setFoodItems] = useState([]);
  const [newFoodItems, setNewFoodItems] = useState([{
    id: 0,
    name: "",
    ubd: new Date(),
    weight: 0
  }]);
  const [editBool, setEditBool] = useState(false);

  
  let utcFoodList = user.foodItems;

  useEffect(() => {
    // console.log(utcFoodList);
    if (typeof utcFoodList === 'undefined') {
      console.log("UTC IS UNDEFINED!!!");
      return;
    } else {
      utcFoodList.forEach((item, index) => {
        let utcSeconds = user.foodItems[index].ubd;
        let date = new Date(utcSeconds);
        date = date.toString();
        utcFoodList[index].ubd = date;
      });
      setFoodItems(utcFoodList);
    }
  }, [user.foodItems]);
  
  const handleWeightChange = (index, delta) => {
    setNewFoodItems( 
      foodItems[index].weight += delta
    );
  }

  const handleRemoveFood = (id) => {
    setFoodItems(
      foodItems.filter( item => foodItems.indexOf(item) !== id )
    );
  }


  return (
    <Provider value={foodItems}>
      <div className={style.KitchenPantry}>
        <section className={style.LeftWrapper}>
          <h3>Your Pantry</h3>
          <div className={style.ListWrapper}>
          {editBool ? 
            <>
              {foodItems.map( (food, index) =>
                <FoodItem
                  name={ food.name }
                  weight={ food.weight }
                  id={ index }
                  useByDate= { food.ubd }
                  key={ index }
                  index={ index }
                  changeWeight={ handleWeightChange }
                  removeFood={ handleRemoveFood }
                />
              )}
            </>
          :
            <>
              {foodItems.map( (food, index) =>
                <SavedFoodItem
                  name={ food.name }
                  weight={ food.weight }
                  id={ index }
                  useByDate= { food.ubd }
                  key={ index }
                  index={index}
                />
              )}
            </>
          }
          </div>
        </section>
        <section className={style.RightWrapper}>
          <h3>Add Item</h3>
          {/* New items list */}
          <NewFoodItem
            setFoodList={setFoodItems}
            currFoodList={foodItems}
            setEditState={setEditBool}
            currEditState={editBool}
          />
          <div className={style.buttonBottom}>
            <GetRecipes foodItems={foodItems} />
          </div>
        </section>
      </div>
    </Provider>
  );
}

export default KitchenPantry;
