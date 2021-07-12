import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Form} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getAllCoinDataForAutoSuggest} from '../Store/Actions/Actions'
import { Link } from 'react-router-dom'
import { Icon} from '@iconify/react';
import searchAlt from '@iconify/icons-el/search-alt';
import {ListGroup} from 'react-bootstrap'
import API from '../API/Api'
import { set } from 'lodash'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Scrollbar from "react-scrollbars-custom";

const Autosuggest = (props) => {

  const [value,setValue]=useState('')
  const [coins,setCoins]=useState([])
  const [matchCoins,setMatchCoins]=useState([])
  

  useEffect(()=>{
    props.getAutoSuggestList()
  },[])
  useEffect(()=>{
    const data = props.coinListData.map((item)=>item.id.replace(/\s+/g, '-').replace(/\./g,'-').trim())
    // data = data 
    setCoins(data)
    console.log("data",coins)
  },[props.coinListData])

  const onTextChanged=(e)=>{
    const value=e.target.value
    let suggestion=[]
    if(value.length>0){
      console.log("inside value lenght")
      const regex= new RegExp(`^${value}`,'i')
      console.log("regex is",regex)
      suggestion=coins.sort().filter(v=>regex.test(v))
      console.log("suugestion are",suggestion )
    }
    setValue(value)
    setMatchCoins(suggestion)
  }

  useEffect(()=>{
    console.log("outside",matchCoins)
    if(matchCoins.length>0){
      console.log("indide",matchCoins)
    }
  },[matchCoins])
  const suggestionSelectedValue=(value)=>{
      setValue(value)
      setMatchCoins([])
  }

  
  
  
  const renderSuggestions=()=>{
    if(matchCoins.length<0){
      return <h1>No record found</h1>
    }
    else{
      return <ul  className="ListCoins">
        {
          matchCoins.map((item)=>{
          return  <ListGroup>
                    <ListGroup.Item action onClick={()=>suggestionSelectedValue(item)}>
                        <Link to={`/coins/${item.toString().toLowerCase()}`}>{item}</Link>
                    </ListGroup.Item>
                  </ListGroup>
            })
        }
      </ul>
    }
  }
  
  return (
    <>
      <div  id="searchBar">
      <input value={value} type="text" placeholder="Search Your Coin" onChange={onTextChanged} className="searchCoinInput"/>
      {value.length>0 && 
        
          
          renderSuggestions()
        
      }
        <span id="searchIcon">
          <Icon icon={searchAlt} style={{color: '#7666E4',fontSize: '30px'}} hFlip={true} />
        </span>
      </div>
    </>
  )
}
const mapStateToProps=(state)=>{
  console.log("called from mapStatetoProps",state.CoinListReducers)
  return{
    coinListData:state.CoinListReducers?state.CoinListReducers.autoSuggestData:null
  }
}

const mapDispatchToProps=(dispatch)=>{
return{
  getAutoSuggestList:()=>dispatch(getAllCoinDataForAutoSuggest())
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Autosuggest)
