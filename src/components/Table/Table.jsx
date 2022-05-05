import React from 'react';
import './Table.css';

import classNames from 'classnames';
import ArrowImg from '../../img/arrow.svg';

const Table = ({ children, className, headers, exeption, headersHandler }) => {
  const classes = classNames('table', className);

  return (
    <table className={classes}>
      <thead>
        <tr className="table__row">
          {headers.map((item, index) => {
            return (
              <th
                key={index}
                className="table__cell table__header-cell"
                onClick={headersHandler[item]}
              >
                {item}
                <img className="table__header-img" src={ArrowImg} alt="arrow" />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {children.length !== 0 ? (
          children.map((child, index) => {
            return (
              <tr key={index} className="table__row">
                {Object.values(child).map((value, index) => {
                  return (
                    Object.keys(child)[index] !== exeption && (
                      <td key={index} className="table__cell">
                        <div className="table__cell-content">{value}</div>
                      </td>
                    )
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr className="table__row table__row_empty">
            <td
              className="table__cell table__cell_empty"
              colSpan={headers.length}
            >
              <div className="table__cell-content">Ничего не найдено...</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
