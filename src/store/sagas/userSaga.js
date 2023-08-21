// UserSaga.js
import { put, takeLatest, all, select, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchUsersSuccess,
  fetchUsersFailure,
  searchUsersSuccess,
  searchUsersFailure,
  viewUsersFailure,
  viewUsersSuccess,
  changeStatusSuccess,
  changeStatusFailure,
  roleIdFailure,
  roleIdSuccess,
  createUserSuccess,
  createUserFailure
} from '../reducers/users';

const baseUrl = 'https://project.devxtop.com';


// Saga function to fetch Users from the API
function* fetchUsersSaga(action) {
  let { rowsPerPage, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const newPage = yield select((state) => state.medicines.currentPage)
  console.log(rowsPerPage)
  const apiCall = () => {
    if (newPage) {
      return axios.post(
        baseUrl + `/api/auth/list?page=${newPage}`,
        {
          'records': `${rowsPerPage}`,
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
    return axios.post(
      baseUrl + '/api/auth/list',
      {
        'records': `${rowsPerPage}`,
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
    yield put(fetchUsersSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}


function* changeStatusSaga(action) {
  let { id, status, authToken } = action.payload;
  status = status == 1 ? 0 : 1;
  console.log(id, status)
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const apiCall = () => {
    return axios.post(
      baseUrl + '/api/auth/change-status',
      {
        'id': id,
        'status': status,
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
    yield put(changeStatusSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(changeStatusFailure(error.message));
  }
}

function* createUserSaga(action) {
  let { email, phone_number, first_name, last_name, dob, address, role_id, password } = action.payload;
  console.log('role_id', role_id)
  const apiCall = () => {
    return axios.post(
      baseUrl + '/api/auth/register',
      {
        'email': `${email}`,
        'phone_number': `${phone_number}`,
        'first_name': `${first_name}`,
        'last_name': `${last_name}`,
        'dob': `${dob}`,
        'address': `${address}`,
        'role_id': `${role_id}`,
        'password': `${password}`
      },
      {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }
  try {
    const response = yield call(apiCall);
    yield put(createUserSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(createUserFailure(error.message));
  }
}


function* viewUsersSaga(action) {
  let { id, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const apiCall = () => {
    return axios.get(baseUrl + `/api/auth/view/${id}`, {
      headers: {
        'accept': '*/*',
        'Authorization': authToken
      }
    });
  }
  try {
    const response = yield call(apiCall);
    yield put(viewUsersSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(viewUsersFailure(error.message));
  }
}

function* roleIdSaga(action) {
  let authToken;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  const apiCall = () => {
    return axios.get(baseUrl + '/api/auth/roles', {
      headers: {
        'accept': '*/*'
      }
    });
  }
  try {
    const response = yield call(apiCall);
    yield put(roleIdSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(roleIdFailure(error.message));
  }
}

// Saga function to search Users from the API
function* searchUsersSaga(action) {
  let { searchText, rowsPerPage, authToken } = action.payload;
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }

  const apiCall = () => {
    if (searchText == '') {
      return axios.post(
        baseUrl + '/api/auth/list',
        {
          'records': `${rowsPerPage}`,
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
    return axios.post(
      baseUrl + '/api/auth/search',
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
    )
  }

  try {
    const response = yield call(apiCall);
    console.log(response.data)
    yield put(searchUsersSuccess(response.data));
  } catch (error) {
    yield put(searchUsersFailure(error.message));
  }
}

function* newPageSaga(action) {
  const { newPage, rowsPerPage } = action.payload;
  const authToken = localStorage.getItem('authToken');
  try {
    const apiCall = () => {
      return axios.post(baseUrl + `/api/auth/list?page=${newPage}`,
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
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

// Saga watcher function to listen for fetch and search User actions
function* userSaga() {
  yield takeLatest('users/fetchUsersRequest', fetchUsersSaga);
  yield takeLatest('users/viewUsersRequest', viewUsersSaga);
  yield takeLatest('users/changeStatusRequest', changeStatusSaga);
  yield takeLatest('users/createUserRequest', createUserSaga);
  yield takeLatest('users/roleIdRequest', roleIdSaga);
  yield takeLatest('users/newPageRequest', newPageSaga);
  yield takeLatest('users/searchUsersRequest', searchUsersSaga);
}

export default userSaga;
