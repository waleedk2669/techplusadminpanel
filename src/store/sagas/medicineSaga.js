// medicineSaga.js
// medicineSaga.js
import { put, takeLatest, all, call } from 'redux-saga/effects';
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


// API endpoint URLs (Replace with your actual API endpoints)
const MEDICINES_API_URL = 'https://project.devxtop.com';
const SEARCH_API_URL = 'https://project.devxtop.com';
const PAGE_API_URL = 'https://fakestoreapi.com/products';
// Saga function to fetch Medicines from the API

function* fetchMedicinesSaga(action) {
  let {rowsPerPage, authToken} = action.payload;
  if(!authToken){
    authToken = localStorage.getItem('authToken');
  }
  console.log(rowsPerPage)
  const apiCall = () => {
    return (
      axios.post(MEDICINES_API_URL + `/api/medicines/list?records=${rowsPerPage}`,
      '',
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

function* createMedicineSaga(action){
  const {id, name, discription, mode, price, is_enabled} = action.payload.data;
  let {authToken} = action.payload;
  if(!authToken){
    authToken = localStorage.getItem('authToken');
  }
  let params = {
    'name': name,
    'description': discription,
    'price': price,
    'is_enabled': is_enabled=='on'? 1 : 0,
  };
  if(id){
    params = {
      id: id,
      'name': name,
      'description': discription,
      'price': price,
      'is_enabled': is_enabled=='on'? 1 : 0,
    }
  }
  console.log(authToken)
  const apiCall = ()=>{
    return axios.post(
      'https://project.devxtop.com/api/medicines/set',
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
    yield put(createMedicineSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    console.log(error);
    yield put(createMedicineFailure(error.message));
  }
}

function* deleteMedicineSaga(action){
  let {id, authToken} = action.payload;
  if(!authToken){
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

function* viewMedicineSaga(action){
  let {id, authToken} = action.payload;
  if(!authToken){
    authToken = localStorage.getItem('authToken');
  }
  console.log(authToken)
  const apiCall = () => {
    return (
      axios.post(MEDICINES_API_URL + `/api/medicines/view/${id}`,
      '',
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
          'Content-Type': 'application/x-www-form-urlencoded'
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
    if(!authToken){
      authToken = localStorage.getItem('authToken');
    }
    
    const apiCall = () => {
      if(searchText == ''){
        return axios.post(MEDICINES_API_URL + `/api/medicines/list?records=${rowsPerPage}`,
      '',
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
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })}
      return (
        axios.post(MEDICINES_API_URL + `/api/medicines/search?search=${searchText}&records=${rowsPerPage}`,
        '',
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
    const {newPage}= action.payload;
    try {
      //const response = yield call(axios.get, `${SEARCH_API_URL}?search=${searchText}`);
      const response = yield call(axios.get, PAGE_API_URL);
      yield put(searchMedicinesSuccess(response.data));
    } catch (error) {
      yield put(searchMedicinesFailure(error.message));
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
