// UserSaga.js
// UserSaga.js
import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchUsersSuccess,
  fetchUsersFailure,
  searchUsersSuccess,
  searchUsersFailure,
} from '../reducers/users';

// API endpoint URLs (Replace with your actual API endpoints)
const USERS_API_URL = 'https://project.devxtop.com';
const SEARCH_API_URL = 'https://fakestoreapi.com/products';
const PAGE_API_URL = 'https://fakestoreapi.com/products';

// Saga function to fetch Users from the API
function* fetchUsersSaga(action) {
  const rowsPerPage = action.payload;
  console.log(rowsPerPage)
  try {
    const response = yield call(axios.post, USERS_API_URL + `/api/users/list?records=${rowsPerPage}`);
    yield put(fetchUsersSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

// Saga function to search Users from the API
function* searchUsersSaga(action) {
    const { searchText } = action.payload;
    try {
      //const response = yield call(axios.get, `${SEARCH_API_URL}?search=${searchText}`);
      const response = yield call(axios.get, SEARCH_API_URL);
      yield put(searchUsersSuccess(response.data));
    } catch (error) {
      yield put(searchUsersFailure(error.message));
    }
  }

  function* newPageSaga(action) {
    const {newPage}= action.payload;
    try {
      //const response = yield call(axios.get, `${SEARCH_API_URL}?search=${searchText}`);
      const response = yield call(axios.get, PAGE_API_URL);
      yield put(searchUsersSuccess(response.data));
    } catch (error) {
      yield put(searchUsersFailure(error.message));
    }
  }
    
// Saga watcher function to listen for fetch and search User actions
function* userSaga() {
    yield takeLatest('users/fetchUsersRequest', fetchUsersSaga);
    yield takeLatest('users/newPageRequest', newPageSaga);
    yield takeLatest('users/searchUsersRequest', searchUsersSaga);
}

export default userSaga;
