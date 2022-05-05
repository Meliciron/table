import React from 'react';
import './Pagination.css';
import classNames from 'classnames';
import Button from '../common/Button/Button';
import { Link } from 'react-router-dom';

const Pagination = ({
  className,
  nextHandler,
  prevHandler,
  pagesAmount,
  navigationHandler,
  currentPage,
}) => {
  const classes = classNames('pagination', className);
  const navigationBtns = [];
  for (let i = 1; i <= pagesAmount; i++) {
    navigationBtns.push(
      <Button
        key={i}
        className={
          currentPage === i
            ? 'pagination__navigation-btn pagination__navigation-btn_active'
            : 'pagination__navigation-btn'
        }
        onClick={() => navigationHandler(i)}
      >
        <Link to={`/page:${i}`}>{i}</Link>
      </Button>
    );
  }

  return (
    <div className={classes}>
      <Button className="pagination__btn" onClick={prevHandler}>
        <Link to={`/page:${currentPage > 1 ? currentPage - 1 : currentPage}`}>
          Назад
        </Link>
      </Button>
      <div className="pagination__pages">{navigationBtns}</div>
      <Button className="pagination__btn" onClick={nextHandler}>
        <Link
          to={`/page:${
            currentPage < pagesAmount ? currentPage + 1 : pagesAmount
          }`}
        >
          Далее
        </Link>
      </Button>
    </div>
  );
};

export default Pagination;
