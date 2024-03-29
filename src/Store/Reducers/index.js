import * as ActionType from '../Actions/ActionType'

const initState={
    orgcoinList:[],
    coinListSliced:[],
    loading:false,
    errMsg:'',
    count:1220,
    singlecoinData:[],
    chartData:[],
    autoSuggestData:[]
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
                loading:false
            }

        case ActionType.GET_SINGLE_COIN_DATA:
            return{
                ...state,
                loading:true,
                errMsg:''
            }
        case ActionType.GET_SINGLE_COIN_DATA_SUCCESS:
            return{
                ...state,
                loading:false,
                singlecoinData:action.data
            }
        case ActionType.GET_SINGLE_COIN_CHART:
            return{
                
                ...state,
                loading:true,
                errMsg:''
            }
        case ActionType.GET_SINGLE_COIN_CHART_SUCCESS:
            return{
                ...state,
                loading:false,
                chartData:action.data
            }
        case ActionType.GET_ALL_COIN_DATA_FOR_AUTOSUGGEST:{
                return{
                    ...state,
                    loading:true
                }
            } 
        case ActionType.GET_ALL_COIN_DATA_FOR_AUTOSUGGEST_SUCCESS:{
            console.log("called from reducer",action.data.data)
            return{
                ...state,
                loading:false,
                autoSuggestData:action.data.data
            }
        } 

        default:
            return state
    }
} 

export default CoinListReducers