// comfortKitSaga.js
// comfortKitSaga.js
import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchComfortKitsSuccess,
  fetchComfortKitsFailure,
  searchComfortKitsSuccess,
  searchComfortKitsFailure,
  deleteComfortKitSuccess,
  deleteComfortKitFailure,
  viewComfortKitSuccess,
  viewComfortKitFailure,
  createComfortKitSuccess,
  createComfortKitFailure,

} from '../reducers/comfortKits';

// API endpoint URLs (Replace with your actual API endpoints)
const COMFORTKITS_API_URL = 'https://project.devxtop.com';
const SEARCH_API_URL = 'https://fakestoreapi.com/products';
const PAGE_API_URL = 'https://fakestoreapi.com/products';

// Saga function to fetch comfortKits from the API
function* fetchComfortKitsSaga(action) {
  let { rowsPerPage, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const apiCall = () => {
    return axios.post(
      COMFORTKITS_API_URL + '/api/comfort-kits/list',
      '',
      {
        params: {
          'records': rowsPerPage
        },
        headers: {
          'accept': '*/*',
          'Authorization': authToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }
  try {
    const response = yield call(apiCall);
    yield put(fetchComfortKitsSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchComfortKitsFailure(error.message));
  }
}

function* deleteComfortKitSaga(action) {
  let { id, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const apiCall = () => {
    return axios.delete(
      COMFORTKITS_API_URL + `/api/comfort-kits/delete/${id}`,
      {
        headers: {
          'accept': '*/*',
          'Authorization': authToken,
        }
      }
    );
  }
  try {
    const response = yield call(apiCall);
    yield put(deleteComfortKitSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(deleteComfortKitFailure(error.message));
  }
}

function* viewComfortKitSaga(action) {
  try {
    let { id, authToken } = action.payload;
    if (!authToken) {
      authToken = localStorage.getItem('authToken');
    }
    const apiCall = () => {
      return axios.get(COMFORTKITS_API_URL + `/api/comfort-kits/view/${id}`, {
        headers: {
          'accept': '*/*',
          'Authorization': authToken,
        }
      });
    }
    const response = yield call(apiCall);
    yield put(viewComfortKitSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(viewComfortKitFailure(error.message));
  }
}

function* createComfortKitSaga(action) {
  let { id, name, price, is_enabled, medicines, authToken } = action.payload;
  console.log(name, price, is_enabled, medicines)
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const params = new URLSearchParams();
  // params.append('hospice_id', '1');
  // params.append('name', 'a');
  // params.append('price', '10');
  // params.append('is_enabled', '1');
  // params.append('medicine_ids[]', '2');
  // params.append('medicine_ids[]', '3');
  // params.append('medicine_ids[]', '4');
  if (id) {
    params.append('id', id);
    params.append('hospice_id', '1');
    params.append('name', name);
    params.append('price', price);
    params.append('is_enabled', is_enabled == 'on' ? 1 : 0);
    medicines.map((medicine) => {
      params.append('medicine_ids[]', medicine);
    });
  }
  else {
    params.append('hospice_id', '1');
    params.append('name', name);
    params.append('price', price);
    params.append('is_enabled', is_enabled == 'on' ? 1 : 0);
    medicines.map((medicine) => {
      params.append('medicine_ids[]', medicine);

    });

  }
  const apiCall = () => {
    return axios.post(
      'https://project.devxtop.com/api/comfort-kits/set',
      '',
      {
        params: params,
        headers: {
          'accept': '*/*',
          'Authorization': authToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }
  try {
    const response = yield call(apiCall);
    yield put(createComfortKitSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(createComfortKitFailure(error.message));
  }
}


// Saga function to search ComfortKits from the API
function* searchComfortKitsSaga(action) {
  let { searchText, rowsPerPage, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const apiCall = () => {
    if(searchText.length == 0) {
      return axios.post(
        COMFORTKITS_API_URL + '/api/comfort-kits/list',
        '',
        {
          params: {
            'records': rowsPerPage
          },
          headers: {
            'accept': '*/*',
            'Authorization': authToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
    }
    return axios.post(
      'https://project.devxtop.com/api/comfort-kits/search',
      '',
      {
        params: {
          'search': searchText,
          'records': rowsPerPage
        },
        headers: {
          'accept': '*/*',
          'Authorization': authToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }
  try {
    const response = yield call(apiCall);
    console.log(response.data)
    yield put(searchComfortKitsSuccess(response.data));
  } catch (error) {
    yield put(searchComfortKitsFailure(error.message));
  }
}

function* newPageSaga(action) {
  const { newPage } = action.payload;
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
  yield takeLatest('comfortKits/deleteComfortKitRequest', deleteComfortKitSaga);
  yield takeLatest('comfortKits/viewComfortKitRequest', viewComfortKitSaga);
  yield takeLatest('comfortKits/createComfortKitRequest', createComfortKitSaga);
}

export default ComfortKitSaga;
