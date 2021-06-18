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