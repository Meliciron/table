import React from 'react';
import './Input.css';

import classNames from 'classnames';

const Input = ({ className, id, label, img, ...rest }) => {
  const classes = classNames('input', className);

  return (
    <div className="input__wrapper">
      {label && (
        <label className="input__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} name={id} className={classes} {...rest} />
      {img && <img className="input__img" src={img} alt="input" />}
    </div>
  );
};

export default Input;
