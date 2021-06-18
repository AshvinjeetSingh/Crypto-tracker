import {createStore,applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import "regenerator-runtime/runtime";
import rootReducer from './Reducers/RootReducer'
import rootSaga from './Sagas/index'
const sagaMiddleware = createSagaMiddleware()
const store=createStore(rootReducer,
    {},
    composeWithDevTools(applyMiddleware(sagaMiddleware)))

    sagaMiddleware.run(rootSaga)

export default store