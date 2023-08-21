// comfortKitSaga.js
import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  loginSuccess,
  loginFailure,
} from '../reducers/auth';

const baseUrl = 'https://project.devxtop.com';

function* requestLogin(action) {
  const { email, password } = action.payload;
  console.log(email, password);
  try {
    const apiCall = () => {
      return axios.post(
        baseUrl + `/api/auth/login`,
        {
          "email": email,
          "role_id": 1,
          "password": password
        }
      )
    }
    const response = yield call(apiCall);
    yield put(loginSuccess(response.data))
  } catch (error) {
    yield put(loginFailure(error))
  }
}
// Saga watcher function to listen for fetch and search ComfortKit actions
function* authSaga() {
  yield takeLatest('auth/loginRequest', requestLogin);
}

export default authSaga;
