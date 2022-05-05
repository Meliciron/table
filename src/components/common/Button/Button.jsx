import React from 'react';
import './Button.css';

import classNames from 'classnames';

const Button = ({ children, className, ...rest }) => {
  const classes = classNames('btn', className);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
