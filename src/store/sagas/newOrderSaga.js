// newOrderSaga.js
import { put, takeLatest, all, call, select } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchNewOrdersSuccess,
    viewNewOrderSuccess,
    deleteNewOrderSuccess,
    viewNewOrderFailure,
    deleteNewOrderFailure,
    createNewOrderSuccess,
    fetchNewOrdersFailure,
    createNewOrderFailure,
    searchNewOrdersSuccess,
    searchNewOrdersFailure,
    patientSuccess,
    patientFailure,
    hospiceSuccess,
    hospiceFailure,
    pharmacySuccess,
    pharmacyFailure,
    nurseSuccess,
    nurseFailure,
    changeStatusSuccess,
    changeStatusFailure,
    driverSuccess,
    driverFailure,
} from '../reducers/newOrders';


const baseUrl = 'https://project.devxtop.com';

function* fetchNewOrdersSaga(action) {
    let { id, rowsPerPage, authToken } = action.payload;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    const newPage = yield select((state) => state.newOrders.currentPage)
    console.log(rowsPerPage)
    const apiCall = () => {
        if (newPage) {
            return axios.post(baseUrl + `/api/orders/list/${id}?page=${newPage}`,
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
            axios.post(baseUrl + `/api/orders/list/${id}`,
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
        yield put(fetchNewOrdersSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        yield put(fetchNewOrdersFailure(error.message));
    }
}

function* createNewOrderSaga(action) {
    const { id, hospice_id, pharmacy_id, nurse_id, patient_id, tax_price, shipping_price, orderProducts } = action.payload;
    let { authToken } = action.payload;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    let params = {
        'hospice_id': 1,
        'pharmacy_id': 1,
        'nurse_id': 1,
        'patient_id': 1,
        'tax_price': tax_price ? tax_price : 0,
        'shipping_price': shipping_price ? shipping_price : 0,
        'orderProducts': orderProducts
    };
    if (id) {
        params = {
            id: id,
            'hospice_id': 1,
            'pharmacy_id': 1,
            'nurse_id': 1,
            'patient_id': 1,
            'tax_price': tax_price ? tax_price : 0,
            'shipping_price': shipping_price ? shipping_price : 0,
            'orderProducts': orderProducts
        }
    }
    console.log(authToken)
    const apiCall = () => {
        return axios.post(
            baseUrl + '/api/orders/create',
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
        yield put(createNewOrderSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        console.log(error);
        yield put(createNewOrderFailure(error.message));
    }
}

function* deleteNewOrderSaga(action) {
    let { id, authToken } = action.payload;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    console.log(authToken);
    const apiCall = () => {
        return (
            axios.delete(baseUrl + `/api/orders/delete/${id}`,
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
        console.log(response.data);
        yield put(deleteNewOrderSuccess(response.data));
    } catch (error) {
        yield put(deleteNewOrderFailure(error.message));
    }
}

function* viewNewOrderSaga(action) {
    let { id, authToken } = action.payload;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    console.log(authToken)
    const apiCall = () => {
        return (
            axios.get(baseUrl + `/api/orders/view/${id}`,
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
        yield put(viewNewOrderSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        yield put(viewNewOrderFailure(error.message));
    }
}

// Saga function to search NewOrders from the API
function* searchNewOrdersSaga(action) {
    let { searchText, rowsPerPage, authToken } = action.payload;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    const newPage = yield select((state) => state.newOrders.currentPage);
    function apiCall() {
        if (searchText == '') {
            return axios.post(baseUrl + `/api/orders/list/?page=${newPage}`,
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
            axios.post(baseUrl + `/api/orders/search`,
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
        yield put(searchNewOrdersSuccess(response.data));
    } catch (error) {
        yield put(searchNewOrdersFailure(error.message));
    }
}

function* newPageSaga(action) {
    const { newPage, rowsPerPage } = action.payload;
    const authToken = localStorage.getItem('authToken');
    try {
        const apiCall = () => {
            return axios.post(baseUrl + `/api/orders/list?page=${newPage}`,
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
        yield put(fetchNewOrdersSuccess(response.data));
    } catch (error) {
        yield put(fetchNewOrdersFailure(error.message));
    }
}

function* hospiceSaga(action) {
    let authToken;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    const apiCall = () => {
        return axios.get(baseUrl + '/api/auth/user-by-role/3', {
            headers: {
                'accept': '*/*',
                'Authorization': authToken,
            }
        });
    }
    try {
        const response = yield call(apiCall);
        yield put(hospiceSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        yield put(hospiceFailure(error.message));
    }
}
function* patientSaga(action) {
    let authToken;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    const apiCall = () => {
        return axios.get(baseUrl + '/api/auth/user-by-role/6', {
            headers: {
                'accept': '*/*',
                'Authorization': authToken,
            }
        });
    }
    try {
        const response = yield call(apiCall);
        yield put(patientSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        yield put(patientFailure(error.message));
    }
}
function* nurseSaga(action) {
    let authToken;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    const apiCall = () => {
        return axios.get(baseUrl + '/api/auth/user-by-role/4', {
            headers: {
                'accept': '*/*',
                'Authorization': authToken,
            }
        });
    }
    try {
        const response = yield call(apiCall);
        yield put(nurseSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        yield put(nurseFailure(error.message));
    }
}
function* pharmacySaga(action) {
    let authToken;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    const apiCall = () => {
        return axios.get(baseUrl + '/api/auth/user-by-role/2', {
            headers: {
                'accept': '*/*',
                'Authorization': authToken,
            }
        });
    }
    try {
        const response = yield call(apiCall);
        yield put(pharmacySuccess(response.data));
        console.log(response.data);
    } catch (error) {
        yield put(pharmacyFailure(error.message));
    }
}

function* changeStatusSaga(action) {
    const { tab_id, status, medicine_ids, driver_id } = action.payload;

    let body = {
        medicine_ids: medicine_ids,
    }
    if(status){
        body = {
            ...body,
            status: status,
        }
    }
    if(driver_id){
        body = {
            ...body,
            driver_id: driver_id
        }
    }
    let authToken;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    console.log({status: 1, tab_id: 4, medicine_ids: medicine_ids})
    const apiCall = () => {
        return axios.post(baseUrl + `/api/orders/change-status/${tab_id}`,
        body
        , {
            headers: {
                'accept': '*/*',
                'Authorization': authToken,
            }
        });
    }
    console.log(body)

    try {
        const response = yield call(apiCall);
        yield put(changeStatusSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        yield put(changeStatusFailure(error.message));
    }

}

function* driverSaga(action) {
    let authToken;
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    const apiCall = () => {
        return axios.get(baseUrl + '/api/auth/user-by-role/7', {
            headers: {
                'accept': '*/*',
                'Authorization': authToken,
            }
        });
    }
    try {
        const response = yield call(apiCall);
        yield put(driverSuccess(response.data));
        console.log(response.data);
    } catch (error) {
        yield put(driverFailure(error.message));
    }
}


// Saga watcher function to listen for fetch and search NewOrder actions
function* newOrderSaga() {
    yield takeLatest('newOrders/fetchNewOrdersRequest', fetchNewOrdersSaga);
    yield takeLatest('newOrders/createNewOrderRequest', createNewOrderSaga);
    yield takeLatest('newOrders/deleteNewOrderRequest', deleteNewOrderSaga);
    yield takeLatest('newOrders/viewNewOrderRequest', viewNewOrderSaga);
    yield takeLatest('newOrders/newPageRequest', newPageSaga);
    yield takeLatest('newOrders/searchNewOrdersRequest', searchNewOrdersSaga);
    yield takeLatest('newOrders/hospiceRequest', hospiceSaga);
    yield takeLatest('newOrders/pharmacyRequest', pharmacySaga);
    yield takeLatest('newOrders/driverRequest', driverSaga);
    yield takeLatest('newOrders/patientRequest', patientSaga);
    yield takeLatest('newOrders/nurseRequest', nurseSaga);
    yield takeLatest('newOrders/changeStatusRequest', changeStatusSaga);
}

export default newOrderSaga;
