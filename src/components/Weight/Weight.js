import React from 'react';
import PropTypes from 'prop-types';

import style from './Weight.module.css';

function Weight ({ index, weight, changeWeight }) {
  return (
    <div className={style.Weight}>
      <button
        className={[style.WeightAction, style.Decrement].join(' ')}
        onClick={() => {if(weight === 0){
          return null
        }
          else {changeWeight(index, -10)}}
        }
        > -
      </button>

      <div className={style.WeightAmount}>{ weight + 'g' }</div>
      
      <button
        className={[style.WeightAction, style.Increment].join(' ')}
        onClick={() => changeWeight(index, +20)}> +
      </button>
    </div>
  );
}

Weight.propTypes = {
  index: PropTypes.number,
  score: PropTypes.number,
  changeWeight: PropTypes.func
};

export default Weight;
