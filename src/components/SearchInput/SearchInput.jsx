import React, { Fragment } from 'react';
import './SearchInput.css';

import Input from '../common/Input/Input';
import SearchImg from '../../img/search.svg';

const SearchInput = ({ search, searchClear }) => {
  const [inputValue, setInputValue] = React.useState('');

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      search(inputValue);
    } else if (e.key === 'Escape') {
      searchClear();
      setInputValue('');
    }
  };

  return (
    <Fragment>
      <Input
        placeholder="Поиск"
        className="search-input"
        img={SearchImg}
        value={inputValue}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
    </Fragment>
  );
};

export default SearchInput;
