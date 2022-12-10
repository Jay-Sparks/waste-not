import React from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import WeightNoEdit from '../WeightNoEdit/WeightNoEdit';

import style from './SavedFoodItem.module.css';

function SavedFoodItem({name, weight, index, useByDate, id})  {
    const ubd = useByDate.substring(0,16);
    return (
      <div className={style.Food}>
        <div className={style.FoodName}>
          { name }
        </div>
        <div className={style.DateWrapper}>
          <DatePicker
            readOnly={true}
            className={style.DatePicker}
            placeholderText={ubd}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <WeightNoEdit
          weight={weight}
          index={index}
        />
      </div>
    );
  }


export default SavedFoodItem;
