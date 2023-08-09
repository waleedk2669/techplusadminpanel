import medicineSaga from "./medicineSaga";
import productSaga from "./productSaga";
import comfortKitSaga from "./comfortKitSaga";
import authSaga from "./authSaga";
import {all} from 'redux-saga/effects'
import userSaga from "./userSaga";

export default function* rootSaga() {
    yield all([
      productSaga(),
      medicineSaga(), // Add the medicine saga here
      comfortKitSaga(),
      authSaga(),
      userSaga(),
      // Add other sagas if needed
    ]);
  }