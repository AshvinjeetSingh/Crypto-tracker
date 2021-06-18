import * as ActionType from '../Actions/ActionType'

const initState={
    orgcoinList:[],
    coinListSliced:[],
    loading:false,
    errMsg:'',
    count:1220
}

function CoinListReducers(state=initState,action){
    
    switch(action.type){
        case ActionType.SET_LOADING:
            return{
                ...state,
                loading:true,
                errMsg:''
            }
        
        case ActionType.GET_ALL_DATA:
            return {
                ...state,
                loading:true,
                errMsg:''
            }

        case ActionType.GET_ALL_DATA_SUCCESS:
            return{
                ...state,
                orgcoinList:action.coinList,
                coinListSliced:action.coinListdata,
            }

        default:
            return state
    }
} 

export default CoinListReducers