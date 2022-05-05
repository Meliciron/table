import React from 'react';
import './MainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/postsSlice';
import {
  showNextPosts,
  showPreviousPosts,
  setCurrentPage,
  sortId,
  sortByAlphabet,
  search,
  clearSearch,
} from '../../redux/postsSlice';

import Container from '../../components/common/Container/Container';
import SearchInput from '../../components/SearchInput/SearchInput';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';

const MainPage = () => {
  const dispatch = useDispatch();
  const headers = ['ID', 'Заголовок', 'Описание'];
  const postsPerPage = useSelector((state) => state.posts.postsPerPage);
  const currentPage = useSelector((state) => state.posts.currentPage);
  const pagesAmount = useSelector((state) => state.posts.pagesAmount);
  const searchResults = useSelector(
    (state) =>
      state.posts.searchResults &&
      (currentPage === 1
        ? state.posts.searchResults.slice(0, postsPerPage)
        : state.posts.searchResults.slice(
            (currentPage - 1) * postsPerPage,
            (currentPage - 1) * postsPerPage + postsPerPage
          ))
  );
  const posts = useSelector((state) =>
    currentPage === 1
      ? state.posts.posts.slice(0, postsPerPage)
      : state.posts.posts.slice(
          (currentPage - 1) * postsPerPage,
          (currentPage - 1) * postsPerPage + postsPerPage
        )
  );

  React.useEffect(() => {
    dispatch(getPosts(currentPage));
  }, []);

  const nextHandler = () => {
    dispatch(showNextPosts());
  };

  const prevHandler = () => {
    dispatch(showPreviousPosts());
  };

  const navigationHandler = (page) => {
    dispatch(setCurrentPage(page));
  };

  const searchAction = (value) => {
    dispatch(search(value));
  };

  const searchClear = () => {
    dispatch(clearSearch());
  };

  const headersSort = {
    ID: function () {
      dispatch(sortId());
    },
    Заголовок: function () {
      dispatch(sortByAlphabet('title'));
    },
    Описание: function () {
      dispatch(sortByAlphabet('body'));
    },
  };

  return (
    <div className="main-page">
      <Container className="main-page__container">
        <SearchInput search={searchAction} searchClear={searchClear} />
        <Table
          className="main-page__table"
          headers={headers}
          exeption="userId"
          headersHandler={headersSort}
        >
          {searchResults ? searchResults : posts}
        </Table>
        <Pagination
          pagesAmount={pagesAmount}
          nextHandler={nextHandler}
          prevHandler={prevHandler}
          navigationHandler={navigationHandler}
          currentPage={currentPage}
        />
      </Container>
    </div>
  );
};

export default MainPage;
