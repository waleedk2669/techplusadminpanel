// comfortKitSaga.js
// comfortKitSaga.js
import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchComfortKitsSuccess,
  fetchComfortKitsFailure,
  searchComfortKitsSuccess,
  searchComfortKitsFailure,
} from '../reducers/comfortKits';

// API endpoint URLs (Replace with your actual API endpoints)
const COMFORTKITS_API_URL = 'https://fakestoreapi.com/products';
const SEARCH_API_URL = 'https://fakestoreapi.com/products';
const PAGE_API_URL = 'https://fakestoreapi.com/products';

// Saga function to fetch comfortKits from the API
function* fetchComfortKitsSaga() {
  try {
    const response = yield call(axios.get, COMFORTKITS_API_URL);
    yield put(fetchComfortKitsSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchComfortKitsFailure(error.message));
  }
}

// Saga function to search ComfortKits from the API
function* searchComfortKitsSaga(action) {
    const { searchText } = action.payload;
    try {
      //const response = yield call(axios.get, `${SEARCH_API_URL}?search=${searchText}`);
      const response = yield call(axios.get, SEARCH_API_URL);
      yield put(searchComfortKitsSuccess(response.data));
    } catch (error) {
      yield put(searchComfortKitsFailure(error.message));
    }
  }

  function* newPageSaga(action) {
    const {newPage}= action.payload;
    try {
      //const response = yield call(axios.get, `${SEARCH_API_URL}?search=${searchText}`);
      const response = yield call(axios.get, PAGE_API_URL);
      yield put(searchComfortKitsSuccess(response.data));
    } catch (error) {
      yield put(searchComfortKitsFailure(error.message));
    }
  }
    
// Saga watcher function to listen for fetch and search ComfortKit actions
function* ComfortKitSaga() {
    yield takeLatest('comfortKits/fetchComfortKitsRequest', fetchComfortKitsSaga);
    yield takeLatest('comfortKits/newPageRequest', newPageSaga);
    yield takeLatest('comfortKits/searchComfortKitsRequest', searchComfortKitsSaga);
}

export default ComfortKitSaga;
