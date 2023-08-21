// medicineSaga.js
import { put, takeLatest, all, call, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchMedicinesSuccess,
  viewMedicineSuccess,
  deleteMedicineSuccess,
  viewMedicineFailure,
  deleteMedicineFailure,
  createMedicineSuccess,
  fetchMedicinesFailure,
  createMedicineFailure,
  searchMedicinesSuccess,
  searchMedicinesFailure,
} from '../reducers/medicines';


const baseUrl = 'https://project.devxtop.com';


function* fetchMedicinesSaga(action) {
  let { rowsPerPage, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const newPage = yield select((state) => state.medicines.currentPage)
  console.log(rowsPerPage)
  const apiCall = () => {
    if (newPage) {
      return axios.post(baseUrl + `/api/medicines/list?page=${newPage}`,
        {
          records: rowsPerPage,
        },
        {
          headers: {
            'accept': '*/*',
            'Authorization': authToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
    }

    return (
      axios.post(baseUrl + `/api/medicines/list`,
        {
          records: rowsPerPage
        },
        {
          headers: {
            'accept': '*/*',
            'Authorization': authToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
    );
  }
  try {
    const response = yield call(apiCall);
    yield put(fetchMedicinesSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchMedicinesFailure(error.message));
  }
}

function* createMedicineSaga(action) {
  const { id, name, discription, mode, price, is_enabled } = action.payload;
  let { authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  let params = {
    'name': name,
    'description': discription,
    'price': price? price: 0,
    'is_enabled': is_enabled,
  };
  if (id) {
    params = {
      id: id,
      'name': name,
      'description': discription,
      'price': price? price: 0,
      'is_enabled': is_enabled,
    }
  }
  console.log(authToken)
  const apiCall = () => {
    return axios.post(
      baseUrl + '/api/medicines/set',
      params,
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
    yield put(createMedicineSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    console.log(error);
    yield put(createMedicineFailure(error.message));
  }
}

function* deleteMedicineSaga(action) {
  let { id, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  console.log(authToken);
  const apiCall = () => {
    return (
      axios.delete(MEDICINES_API_URL + `/api/medicines/delete/${id}`,
        {
          // params: {
          //   'name': name,
          //   'description': discription,
          //   'price': price,
          //   'is_enabled': enabled=='on'? 1 : 0,
          // },
          headers: {
            'accept': '*/*',
            'Authorization': authToken,
          }
        })

    );
  }
  try {
    const response = yield call(apiCall);
    console.log(response.data);
    yield put(deleteMedicineSuccess(response.data));
  } catch (error) {
    yield put(deleteMedicineFailure(error.message));
  }
}

function* viewMedicineSaga(action) {
  let { id, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  console.log(authToken)
  const apiCall = () => {
    return (
      axios.get(baseUrl + `/api/medicines/view/${id}`,
        {
          headers: {
            'accept': '*/*',
            'Authorization': authToken,
          }
        })
    );
  }
  try {
    const response = yield call(apiCall);
    yield put(viewMedicineSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(viewMedicineFailure(error.message));
  }
}

// Saga function to search Medicines from the API
function* searchMedicinesSaga(action) {
  let { searchText, rowsPerPage, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const newPage = yield select((state) => state.medicines.currentPage);
  function apiCall() {
    if (searchText == '') {
      return axios.post(baseUrl + `/api/medicines/list?page=${newPage}`,
        {
          records: rowsPerPage
        },
        {
          headers: {
            'accept': '*/*',
            'Authorization': authToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
    }
    return (
      axios.post(baseUrl + `/api/medicines/search`,
        {
          search: searchText,
          records: rowsPerPage,
        },
        {
          headers: {
            'accept': '*/*',
            'Authorization': authToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
    );
  }

  try {
    const response = yield call(apiCall);
    console.log(response.data)
    yield put(searchMedicinesSuccess(response.data));
  } catch (error) {
    yield put(searchMedicinesFailure(error.message));
  }
}

function* newPageSaga(action) {
  const { newPage, rowsPerPage } = action.payload;
  const authToken = localStorage.getItem('authToken');
  try {
    const apiCall = () => {
      return axios.post(PAGE_API_URL + `/api/medicines/list?page=${newPage}`,
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
      );
    }
    const response = yield call(apiCall);
    yield put(fetchMedicinesSuccess(response.data));
  } catch (error) {
    yield put(fetchMedicinesFailure(error.message));
  }
}

// Saga watcher function to listen for fetch and search Medicine actions
function* medicineSaga() {
  yield takeLatest('medicines/fetchMedicinesRequest', fetchMedicinesSaga);
  yield takeLatest('medicines/createMedicineRequest', createMedicineSaga);
  yield takeLatest('medicines/deleteMedicineRequest', deleteMedicineSaga);
  yield takeLatest('medicines/viewMedicineRequest', viewMedicineSaga);
  yield takeLatest('medicines/newPageRequest', newPageSaga);
  yield takeLatest('medicines/searchMedicinesRequest', searchMedicinesSaga);
}

export default medicineSaga;
