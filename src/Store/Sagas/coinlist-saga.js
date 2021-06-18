import {put,call,takeEvery} from 'redux-saga/effects'
import * as ActionType from '../Actions/ActionType'
import * as service from '../../API/Services'
import * as actions from '../Actions/Actions'

function*  getCoinList(action){
    try{
        const list=yield call(service.getAllCoinList,action.page)
        yield put(actions.getAllCoinListSuccess(list))
    }
    catch(e){
        console.error(e)
    }
    
}

export default function* coinListSaga() {
    yield takeEvery(ActionType.GET_ALL_DATA,getCoinList)
    
  }