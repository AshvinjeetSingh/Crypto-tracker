import React,{useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table';
import { Container,Button } from 'react-bootstrap';
import Coin from './Coin'
import '../CSS/Paginate.css' 
import {connect} from 'react-redux'
import {getAllCoinList,getCoinChartData,getAllCoinDataForAutoSuggest} from '../Store/Actions/Actions'
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import Paginate from '../Components/Paginate'
import Autosuggest from '../Components/Autosuggest'
import { forEach } from 'lodash';
import { Icon, InlineIcon } from '@iconify/react';
import bxSort from '@iconify/icons-bx/bx-sort';
import '../CSS/Homepage.css'
const CoinsList = (props) => {
// URL:https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false
const {coinList,totalCount,loader}=props

const [offset,setOffset]=useState(0)
const [perPage,setPerPage]=useState(100)
const [currentPage,setCurrentPage]=useState(0)
const [pageCount,setPageCount]=useState(0)
const [tableData,setTableData]=useState([])
const [orgTableData,setOrgTableData]=useState([])
const [sortType,setSortType]=useState('asc')
const changeOrder=()=>{
  sortType==='asc'?setSortType('desc'):setSortType('asc')
}
const sorted=tableData.sort((a,b)=>{
  const isReversed=(sortType==='asc')?1:-1
  return isReversed*a.name.localeCompare(b.name)
})
const handlePageClick=(page)=>{
  props.getList(page)
  // alert("hello")
}
const getData=()=> {
  var tdata = coinList;
  var slice = tdata.slice(offset, offset + perPage)
  setPageCount(Math.ceil(tdata.length / perPage))
  setTableData(slice)
  setOrgTableData(tdata)
};

const getTableData=()=>{
return sorted.map((coinid,index)=>{


for(let i=0;i<sorted.length;i++) {
  console.log("length is",sorted.length,i)
return (<tr><Coin 
key={coinid.id} 
id={index+1}
name={coinid.name} 
image={coinid.image} 
symbol={coinid.symbol.toUpperCase()} 
volume={coinid.total_volume}
price={coinid.current_price.toLocaleString()}
priceChange={coinid.price_change_percentage_24h}
marketcap={coinid.market_cap.toLocaleString()}
realId={coinid.id}
// sparkline={coinid.market_cap_rank}
/></tr>)
}})};

useEffect(()=>{
  handlePageClick(1)
  // props.getAutoSuggestList()
  },[])

useEffect(()=>{
  if(coinList){
    getData()
  }
},[coinList])
useEffect(()=>{
  console.log(props.coinListData)
},[props.coinListData])
// useEffect(()=>{
//   var table = document.getElementsByTagName('table')
//   var rows = table.getElementByTagName('tr')
// console.log("table rows are",rows)
// },[tableData])

  
    return (
        <div className="coin-app" style={{overflow:'auto'}}>
            <div className="sortDiv">
                <span className="sortIcon"><Icon icon={bxSort} style={{color: '#7666E4', fontSize: '19px'}} /></span>
                <span className="sortText">Sort In</span>

                <select onChange={changeOrder} className="sortMenu" >
                  <option value="asc" style={{padding:'5px 5px'}}>Ascending</option>
                  <option value="desc" style={{padding:'5px 5px'}}>Descending</option>
                </select>
          </div>
         
        <Container fluid style={{margin:'35px 0px'}}>
        
        
{!loader ?
        <Table striped bordered hover variant="dark"id="coinTable" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume</th>
            <th>PriceChange</th>
            <th>Market Cap</th>
            <th>Action</th>
          </tr>
        </thead>
       <tbody>
      
        {getTableData()}
       </tbody>
            
  
  
          </Table>:
          <Loader type="Grid" color="#7666e4" height={80} width={80} style={{'justify-content':'center','display':'flex'}} />}
          
          <Paginate totalCount={totalCount} handlePageClick={(Data)=>handlePageClick(Data.selected+1)}/>
        </Container>
        
      </div>
    )
}
const mapStateToProps=(state)=>{
  // console.log("called from mapStatetoProps",state.CoinListReducers)
  return{
    coinList: state.CoinListReducers ? state.CoinListReducers.orgcoinList :null,
    totalCount: state.CoinListReducers ? state.CoinListReducers.count :null,
    loader:state.CoinListReducers? state.CoinListReducers.loading:null,
    coinListData:state.CoinListReducers?state.CoinListReducers.autoSuggestData:null
  }
}

const mapDispatchToProps=(dispatch)=>{
return{
  getList:(page)=>dispatch(getAllCoinList(page)),
  getAutoSuggestList:()=>dispatch(getAllCoinDataForAutoSuggest())
}
}

export default connect(mapStateToProps,mapDispatchToProps)(CoinsList)
