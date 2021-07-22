import axios from 'axios'
import React,{useState,useEffect,useRef} from 'react'
import {Form,Row} from 'react-bootstrap'
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
import { useHistory } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";

const Autosuggest = (props) => {
  const history = useHistory();
  const [value,setValue]=useState('')
  const [coins,setCoins]=useState([])
  const [matchCoins,setMatchCoins]=useState([])
  const node = useRef();

  const handleClick = e => {
    console.log(node)

    // if (node && node.current.contains(e.target)) {
    //   return;
    // }
    const rows=document.getElementById("ListCoins");
    if(rows!=null || rows!=undefined){
      rows.style.height="0"
    }
   
    console.log(rows)
    setValue('')
  };

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
      const regex= new RegExp(`^${value}`,'i') 
      suggestion=coins.sort().filter(v=>regex.test(v))
    }
    setValue(value)
    setMatchCoins(suggestion)
  }

  useEffect(()=>{
    
    if(matchCoins.length>0){
      console.log("indide",matchCoins)
    }
  },[matchCoins])
  const suggestionSelectedValue=(value)=>{
      setValue(value)
      setMatchCoins([])
      history.push(`/coins/${value}`)
  }

  
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  
  
  
  const renderSuggestions=()=>{
    if(matchCoins.length<=0){
      console.log(matchCoins)
      return <div className="ListCoinsNoRecord" >
          <p>No record found</p>
        </div>
    }
    else{
      console.log(matchCoins.length)
      return  <div  className="ListCoins" id="ListCoins" ref={node}>
        {
          
          matchCoins.map((item)=>{
          return  <p className="autoSuggestValues" onClick={()=>suggestionSelectedValue(item)} style={{padding:'5px 10px',borderRadius: '15px',maxWidth: '100%',margin:' 5px 15px',cursor:'pointer'}}>
                       {item}
                    </p>
                  
            })
        }
      </div>
    }
  }
  
  return (
    <>
      <div  id="searchBar" >
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
