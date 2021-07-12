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
import arrowSort24Filled from '@iconify/icons-fluent/arrow-sort-24-filled';
import '../CSS/Homepage.css'
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
const options = ["Ascending", "Descending"];
const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

const DropDownContainer = styled("div")`
  
  width:95px;
  height:28px;
  // padding: 0.4em 2em 0.4em 1em;

`;

const DropDownHeader = styled("div")`
  padding: 5px 5px 5px 10px;
  font-size: 16px;
  color: #7666e4;
  background: #ebe4e4;
  border:1px solid #7666e4;
  border-radius:25px;
  height:28px;
  width:105px;
  display:flex;
  justify-content:space-between;
  align-items:center;
`;

const DropDownListContainer = styled("div")``

;

const DropDownList = styled("ul")`
  padding: 0;
  margin-top: 2.5px;
  // border:1px solid #7666e4;
  background: #C4C4C4;
  width:105px;
  box-sizing: border-box;
  color: #7666e4;
  font-size: 16px;
  font-weight: 500;
  height:70px;
  border-radius:11px;
  &:first-child {
    padding-top: 0.5em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin: 2.5px auto; 
  background: #E8E8E8;
  text-align:center;
  width:90px;
  border-radius:25px;
  color:#b1afaf;
  &:hover{
    color:#7666e4;
    cursor:pointer;
  }

`;
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
const [count,setCount]=useState(0)
const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
const location = useLocation()

const toggling = () => {
  setIsOpen(!isOpen)
  // changeOrder()
};

const onOptionClicked = value => () => {
  setSelectedOption(value);
  setIsOpen(false);
  console.log(selectedOption);
 changeOrder()
};
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
  setCount((prevState)=>prevState+1)
  console.log(count
    )
}

const history = useHistory();
const handleClick=()=> {
        // history.push(`/coins/${tableData.id}`);
        
      }
const getData=()=> {
  var tdata = coinList;
  var slice = tdata.slice(offset, offset + perPage)
  setPageCount(Math.ceil(tdata.length / perPage))
  setTableData(slice)
  setOrgTableData(tdata)
};
// const renderList=()=>{
//   return <>
//     <optio  style={{padding:'5px',margin:'0'}}>Ascending</optio>
//     <p  style={{padding:'5px',margin:'0'}}>Descending</p>
//   </>
// }
const getTableData=()=>{
return sorted.map((coinid,index)=>{

const idkey=(count*100)-100+index+1
for(let i=0;i<sorted.length;i++) {
 
return (<tr onClick={()=>{
  history.push(`/coins/${coinid.id}`)
}}><Coin 
key={coinid.id} 
id={idkey}
name={coinid.name} 
image={coinid.image} 
symbol={coinid.symbol.toUpperCase()} 
volume={coinid.total_volume.toLocaleString()}
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


// useEffect(()=>{
//   console.log(props.coinListData)
// },[props.coinListData])
// useEffect(()=>{
//   var table = document.getElementsByTagName('table')
//   var rows = table.getElementByTagName('tr')
// console.log("table rows are",rows)
// },[tableData])

  
    return (
        <div className="coin-app" style={{overflow:'auto'}}>
            <div className="sortDiv">
                {/* <span className="sortIcon"><Icon icon={bxSort} style={{color: '#7666E4', fontSize: '19px'}} /></span> */}
                <span className="sortText">Sort In</span>
                <DropDownContainer>
        <DropDownHeader onClick={toggling} >
          {selectedOption || "Ascending"}
          <span><Icon icon={arrowSort24Filled} style={{color: '#7666E4', fontSize: '17px'}} /></span>
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
                {/* <select onChange={changeOrder} className="sortMenu" > */}
                  {/* <option value="asc" style={{padding:'5px 5px'}}>Ascending</option>
                  <option value="desc" style={{padding:'5px 5px'}}>Descending</option> */}
                {/* </select> */}
          </div>
         
        <Container fluid style={{margin:'35px 0px'}}>
        
        
{!loader ?
        <Table striped bordered hover id="coinTable" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Market Cap</th>
            <th>PriceChange</th>
            {/* <th>Action</th> */}
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
