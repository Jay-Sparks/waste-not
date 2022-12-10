import React from 'react';
import PropTypes from 'prop-types';

import style from './WeightNew.module.css';

function WeightNew ({ index, weight, changeWeight }) {
  return (
    <div className={style.Weight}>
      <button
        className={[style.WeightAction, style.Decrement].join(' ')}
        onClick={() => {if(weight === 0){
          return null
        }
          else {changeWeight(-10)}}
        }
        > -
      </button>

      <div className={style.WeightAmount}>{ weight + 'g' }</div>
      
      <button
        className={[style.WeightAction, style.Increment].join(' ')}
        onClick={() => changeWeight(+20)}> +
      </button>
    </div>
  );
}

WeightNew.propTypes = {
  index: PropTypes.number,
  score: PropTypes.number,
  changeWeight: PropTypes.func
};

export default WeightNew;
