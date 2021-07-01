import API from './Api'
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false

export const getAllCoinList=async(page)=>{
    try{
        const perpage=100
        const offset=(page*perpage)-perpage
        const list = await API.get(`markets?vs_currency=inr&per_page=${perpage}&page=`+page+'&sparkline=true')
        // console.log(list.data)
        return list.data
       
    }
    catch(e){
        console.error(e)
    }
}

export const getChartData=async(id,cur,time)=>{
    try{
        const data=await API.get(`/${id}/market_chart?vs_currency=${cur}&days=${time}`)
        console.log(data.data)
        return data
    }
    catch(e){
        console.error(e)
    }
}

export const getSingleCoinData=async(id)=>{
    try{
        const data= await API.get(`/${id}`)
        // console.log(data)
        return data
    }
    catch(e){
        console.error(e)
    }
}