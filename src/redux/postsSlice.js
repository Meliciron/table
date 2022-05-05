import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('posts/getPosts', async function () {
  const response = await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.data);
  return response;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    searchResults: null,
    currentPage: 1,
    pagesAmount: null,
    postsPerPage: 10,
  },
  reducers: {
    showNextPosts(state) {
      if (state.currentPage + 1 <= state.pagesAmount) {
        state.currentPage += 1;
      }
    },
    showPreviousPosts(state) {
      if (state.currentPage - 1 >= 1) {
        state.currentPage -= 1;
      }
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    sortId(state) {
      if (state.searchResults) {
        if (state.searchResults[0].id < state.searchResults[1].id) {
          state.searchResults.sort((prev, next) => next.id - prev.id);
        } else {
          state.searchResults.sort((prev, next) => prev.id - next.id);
        }
      } else {
        if (state.posts[0].id < state.posts[1].id) {
          state.posts.sort((prev, next) => next.id - prev.id);
        } else {
          state.posts.sort((prev, next) => prev.id - next.id);
        }
      }
    },
    sortByAlphabet(state, action) {
      if (state.searchResults) {
        if (action.payload) {
          state.searchResults.sort((prev, next) =>
            prev[action.payload].localeCompare(next[action.payload])
          );
        }
      } else {
        if (action.payload) {
          state.posts.sort((prev, next) =>
            prev[action.payload].localeCompare(next[action.payload])
          );
        }
      }
    },
    search(state, action) {
      state.searchResults = state.posts.filter((item) => {
        if (
          String(item.id).indexOf(action.payload) !== -1 ||
          item.title.indexOf(action.payload) !== -1 ||
          item.body.indexOf(action.payload) !== -1
        ) {
          return item;
        }
      });
      state.currentPage = 1;
      state.pagesAmount = Math.ceil(
        state.searchResults.length / state.postsPerPage
      );
    },
    clearSearch(state) {
      state.searchResults = null;
      state.pagesAmount = Math.ceil(state.posts.length / state.postsPerPage);
    },
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.posts = [...action.payload];
      state.pagesAmount = Math.ceil(action.payload.length / state.postsPerPage);
    },
  },
});

export const {
  showNextPosts,
  showPreviousPosts,
  setCurrentPage,
  sortId,
  sortByAlphabet,
  search,
  clearSearch,
} = postsSlice.actions;
export default postsSlice.reducer;
