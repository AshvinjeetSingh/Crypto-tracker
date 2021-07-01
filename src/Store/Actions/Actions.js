import * as ACTION_TYPES from './ActionType'


export const getAllCoinList=(page)=>{
    return{
        type:ACTION_TYPES.GET_ALL_DATA,
        page:page
    }
}

export const getAllCoinListSuccess=(data)=>{
    return{
        type:ACTION_TYPES.GET_ALL_DATA_SUCCESS,
        coinList:data
    }
}

export const getCoinChartData=(id,cur,time)=>{
    return{
        type:ACTION_TYPES.GET_SINGLE_COIN_CHART,
        id:id,
        cur:cur,
        time:time
    }
}
export const getCoinChartDataSuccess=(data)=>{
    return{
        type:ACTION_TYPES.GET_SINGLE_COIN_CHART_SUCCESS,
        data:data
    }
}

export const getSingleCoinData=(id)=>{
    return{
        type:ACTION_TYPES.GET_SINGLE_COIN_DATA,
        id:id
    }
}

export const getSingleCoinDataSuccess=(data)=>{
    return{
        type:ACTION_TYPES.GET_SINGLE_COIN_DATA_SUCCESS,
        data:data,
    }
}