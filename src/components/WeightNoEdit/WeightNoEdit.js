import React from 'react';
import PropTypes from 'prop-types';

import style from './WeightNoEdit.module.css';

const Weight = ({ index, weight, changeWeight }) => {

  return (
    <div className={style.Weight}>
      <button
        className={[style.WeightAction, style.Decrement].join(' ')}
        > -
      </button>
      <div className={style.WeightAmount}>{ weight + 'g' }</div>
      <button
        className={[style.WeightAction, style.Increment].join(' ')}
        > +
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
