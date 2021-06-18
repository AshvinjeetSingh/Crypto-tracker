import React,{useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import Coin from './Coin'
import '../CSS/Paginate.css' 
import {connect} from 'react-redux'
import {GET_ALL_DATA} from '../Store/Actions/ActionType'
import {getAllCoinList} from '../Store/Actions/Actions'
import ReactPaginate from "react-paginate";
const CoinsList = (props) => {
// URL:https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false
const {coinList,totalCount}=props

const [offset,setOffset]=useState(0)
const [perPage,setPerPage]=useState(100)
const [currentPage,setCurrentPage]=useState(0)
const [pageCount,setPageCount]=useState(0)
const [tableData,setTableData]=useState([])
const [orgTableData,setOrgTableData]=useState([])

const handlePageClick=(page)=>{
  // const selectedPage = e.selected;
  // const offset = selectedPage * perPage;
  // setCurrentPage(selectedPage)
  // setOffset(offset)
  // loadMoreData()
  props.getList(page)
}

// const loadMoreData=()=>{
//   const data=coinList
//   const slice = data.slice(offset, offset + perPage)
//   setPageCount(Math.ceil(data.length / perPage))
//   setTableData(slice)
// }

useEffect(()=>{
  handlePageClick(1)
  },[])

useEffect(()=>{
  if(coinList){
    getData()
  }
},[coinList])

const getData=()=> {
          var tdata = coinList;
          console.log('data-->'+JSON.stringify(tdata))
          var slice = tdata.slice(offset, offset + perPage)
          setPageCount(Math.ceil(tdata.length / perPage))
          setTableData(slice)
          setOrgTableData(tdata)
      };


    
    return (
        <div className="coin-app" >
        <Container fluid style={{margin:'35px 0px'}}>
        <Table striped bordered hover variant="dark">
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
        {tableData.map(coinid=>{
            return <Coin 
              key={coinid.id} 
              id={coinid.market_cap_rank}
              name={coinid.name} 
              image={coinid.image} 
              symbol={coinid.symbol.toUpperCase()} 
              volume={coinid.total_volume}
              price={coinid.current_price.toLocaleString()}
              priceChange={coinid.price_change_percentage_24h}
              marketcap={coinid.market_cap.toLocaleString()}
              />
            
  
          })}
          </Table>
        </Container>
        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalCount/20}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                containerClassName={"pagination"}
                onPageChange={(Data)=>handlePageClick(Data.selected+1)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                />
      </div>
    )
}
const mapStateToProps=(state)=>{
  console.log("called from mapStatetoProps",state.CoinListReducers)
  return{
    coinList: state.CoinListReducers ? state.CoinListReducers.orgcoinList :null,
    totalCount: state.CoinListReducers ? state.CoinListReducers.count :null,
  }
}

const mapDispatchToProps=(dispatch)=>{
return{
  getList:(page)=>dispatch(getAllCoinList(page))
}
}

export default connect(mapStateToProps,mapDispatchToProps)(CoinsList)
