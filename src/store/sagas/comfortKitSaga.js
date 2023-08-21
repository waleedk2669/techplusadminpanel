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

const baseUrl = 'https://project.devxtop.com';


// Saga function to fetch comfortKits from the API
function* fetchComfortKitsSaga(action) {
  let { rowsPerPage, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const apiCall = () => {
    return axios.post(
      baseUrl + '/api/comfort-kits/list',
      {
        "records": rowsPerPage
      },
      {
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
      return axios.get(baseUrl + `/api/comfort-kits/view/${id}`, {
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
  let body;
  if (id) {
    body = {
      "id": id,
      "hospice_id": "1",
      "name": name,
      "price": price?price:0,
      "is_enabled": is_enabled,
      "medicine_ids": medicines.length != 0 ? medicines : "",
    }
  }
  else {
    body = {
      "hospice_id": "1",
      "name": name,
      "price": price? price:0,
      "is_enabled": is_enabled,
      "medicine_ids": medicines.length != 0 ? medicines : [],
    }
  }

  const apiCall = () => {
    return axios.post(
      baseUrl + '/api/comfort-kits/set',
      body,
      {
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
    if (searchText.length == 0) {
      return axios.post(
        baseUrl + '/api/comfort-kits/list',
        {
          'records': rowsPerPage
        },
        {
          headers: {
            'accept': '*/*',
            'Authorization': authToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
    }
    return axios.post(
      baseUrl + '/api/comfort-kits/search',
      {
        'search': searchText,
        'records': rowsPerPage
      },
      {
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
  const { newPage, rowsPerPage } = action.payload;
  const authToken = localStorage.getItem('authToken');
  try {
    const apiCall = () => {
      return axios.post(baseUrl + `/api/comfort-kits/list?page=${newPage}`,
        {
          records: rowsPerPage,
        },
        {
          headers: {
            'accept': '*/*',
            'Authorization': authToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
    }
    const response = yield call(apiCall);
    yield put(fetchComfortKitsSuccess(response.data));
  } catch (error) {
    yield put(fetchComfortKitsFailure(error.message));
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
