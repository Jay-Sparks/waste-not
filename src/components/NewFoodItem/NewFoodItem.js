import React, { useState, useContext } from 'react';
import { UserContext } from "../../providers/UserProvider";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import WeightNew from '../WeightNew/WeightNew';
import style from './NewFoodItem.module.css';

import { db } from "../../firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore"; 

function NewFoodItem(props) {
  
  const [ newItem, setNewItem ] = useState(
    {
      name: "",
      ubd: new Date(),
      weight: 0
    }
  );

  const userContext = useContext(UserContext);
  const uid = userContext.uid;
  const foodRef = doc(db, 'users', uid);

  const addNewFoodItem = async (event) => {
    event.preventDefault();
    let item = newItem;
    item.ubd = item.ubd.getTime();
    setDoc(foodRef, 
      { foodItems: arrayUnion(item) }, 
      { merge: true }
    );
    let newDate = new Date(item.ubd);
    item.ubd = newDate.toString();
    props.setFoodList([
      ...props.currFoodList,
      item
    ]);
    setNewItem({
      name: "",
      ubd: new Date(),
      weight: 0
    });
  };

  const handleChange = date => {
    setNewItem({
      ...newItem,
      ubd: date
    });
  }

  const handleNameChange = event => {
    const foodName = event.target.value;
    setNewItem({
      ...newItem,
      name: foodName.toString()
    });
  }

  const handleWeightChange = delta => {
    setNewItem(prevState => ({
      ...newItem,
      weight: prevState.weight + delta
    }));
  }

  const handleSaveFoodList = async (event) => {
    event.preventDefault();
    props.currEditState ? 
      props.setEditState(false) 
      : 
      props.setEditState(true);
    await setDoc(foodRef, 
      { foodItems: props.currFoodList }, 
      { merge: true }
    );
  }

  return (
    <>
      <div className={style.Food}>
        <input
          type="text"
          placeholder="Food name"
          value={newItem.name}
          className={style.foodInput}
          onChange={handleNameChange}
        />
        <div className={style.dateWrapper}>
          <DatePicker
            className={style.DatePicker}
            selected={newItem.ubd}
            disabledKeyboardNavigation
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <WeightNew
          weight={newItem.weight}
          changeWeight={handleWeightChange}
        />
      </div>
      <div className={style.ButtonWrapper}>
        {props.currEditState ? 
          <button 
            onClick={handleSaveFoodList}
            className={style.SaveButton}
          >Save</button>
            : 
          <button 
            onClick={() => props.currEditState ? props.setEditState(false) : props.setEditState(true)}
            className={style.EditButton}
          >Edit</button>
        } 
        <button
          className={style.addFoodButton}
          onClick={addNewFoodItem}
        >Add</button>
      </div>
    </>
  );
}

export default NewFoodItem;
