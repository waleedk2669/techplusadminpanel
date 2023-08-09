// third-party
import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import rootSaga from './sagas/rootSaga';
// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const store = configureStore({
  reducer: reducers,
  middleware: middleware,
});
sagaMiddleware.run(rootSaga);
const { dispatch } = store;

export { store, dispatch };
