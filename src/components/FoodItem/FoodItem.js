import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Weight from '../Weight/Weight';

import style from './FoodItem.module.css';


function FoodItem({name, weight, index, useByDate, id, removeFood, changeWeight})  {
  const [ ubd, setUbd ] = useState({ubd: useByDate});
  
  const handleChange = date => {
    setUbd({ ubd: date });
  };
    console.log(ubd);
    // let currentUbd = new Date(useByDate);
    const ubdPlaceHolder = useByDate.substring(0,16);
    return (
      <div className={style.Food}>
        <div className={style.FoodName}>
          <button className={style.RemoveFood} onClick={ () => removeFood(id) }>✖</button>
          { name }
        </div>
        <div className={style.datePickWidth}>
          <DatePicker
            className={style.DatePicker}
            placeholderText={ubdPlaceHolder}

            disabledKeyboardNavigation
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <Weight
          weight={weight}
          index={index}
          changeWeight={changeWeight}
        />
      </div>
    );
  }

export default FoodItem;
