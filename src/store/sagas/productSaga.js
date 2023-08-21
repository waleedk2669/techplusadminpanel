// productSaga.js
// productSaga.js
import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  searchProductsSuccess,
  searchProductsFailure,
} from '../reducers/products';


const baseUrl = 'https://project.devxtop.com';

// API endpoint URLs (Replace with your actual API endpoints)
// Saga function to fetch products from the API
function* fetchProductsSaga() {
  try {
    const response = yield call(axios.get, baseUrl);
    yield put(fetchProductsSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

// Saga function to search products from the API
function* searchProductsSaga(action) {
    const { searchText } = action.payload;
    try {
      //const response = yield call(axios.get, `${SEARCH_API_URL}?search=${searchText}`);
      const response = yield call(axios.get, baseUrl);
      yield put(searchProductsSuccess(response.data));
    } catch (error) {
      yield put(searchProductsFailure(error.message));
    }
  }

  function* newPageSaga(action) {
    const {newPage}= action.payload;
    try {
      const response = yield call(axios.get, baseUrl);
      yield put(searchProductsSuccess(response.data));
    } catch (error) {
      yield put(searchProductsFailure(error.message));
    }
  }
    
// Saga watcher function to listen for fetch and search product actions
function* productSaga() {
    yield takeLatest('products/fetchProductsRequest', fetchProductsSaga);
    yield takeLatest('products/newPageRequest', newPageSaga);
    yield takeLatest('products/searchProductsRequest', searchProductsSaga);
}

export default productSaga;
