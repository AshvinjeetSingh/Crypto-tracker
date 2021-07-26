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

function* getCoin(action){
    try{    
        const data =yield call (service.getSingleCoinData,action.id)
        yield put(actions.getSingleCoinDataSuccess(data))
    }
    catch(e){
        console.error(e)
    }
}

function* getCoinChart(action){
    try{
        const data=yield call (service.getChartData,action.id,action.cur,action.time)
        yield put (actions.getCoinChartDataSuccess(data))
    }
    catch(e){
        console.error(e)
    }
}

function* getAllcoinDataAutoSuggest(action){
    try{
        const data=yield call (service.getListAll)
        console.log("called from saga",data)
        yield put(actions.getAllCoinDataForAutoSuggestSuccess(data))
    }
    catch(e){
        console.error(e)
    }
}

export default function* coinListSaga() {
    yield takeEvery(ActionType.GET_ALL_DATA,getCoinList)
    yield takeEvery(ActionType.GET_SINGLE_COIN_DATA,getCoin)
    yield takeEvery(ActionType.GET_SINGLE_COIN_CHART,getCoinChart)
    yield takeEvery(ActionType.GET_ALL_COIN_DATA_FOR_AUTOSUGGEST,getAllcoinDataAutoSuggest)
    
  }