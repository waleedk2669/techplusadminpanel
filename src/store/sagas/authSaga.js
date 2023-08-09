// comfortKitSaga.js
// comfortKitSaga.js
import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from '../reducers/auth';

// API endpoint URLs (Replace with your actual API endpoints)
const baseUrl = 'https://project.devxtop.com/';
// Saga function to fetch comfortKits from the API
function* requestLogin(action){
    const {email, password} = action.payload;
    console.log(email, password);
    try{
        const response = yield call(axios.post, baseUrl + `api/auth/login?email=${email}&role_id=1&password=${password}`);
        yield put(loginSuccess(response.data))
    } catch(error){
      yield put(loginFailure(error))
    }
  }
  function* requestRegister(action){
      const {email, password} = action.payload;
      try{
        const response = yield call(axios.post, baseUrl + `api/auth/login?email=${email}&role_id=1&password=${password}`);
        yield put(loginSuccess(response.data));
    } catch(error){
      yield put(loginFailure(error));
    }
  }
        
// Saga watcher function to listen for fetch and search ComfortKit actions
function* authSaga() {
    yield takeLatest('auth/loginRequest', requestLogin);
    yield takeLatest('auth/registerRequest', requestRegister);
}

export default authSaga;
