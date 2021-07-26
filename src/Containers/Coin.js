import React from 'react'
import '../CSS/Coin.css'
import {Button}  from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const Coin = ({id,name,image,symbol,price,volume,priceChange,marketcap}) => {
    const style=priceChange<0?'red':'#1bb31b'
    return (
    <>
        <td >{id}</td>
        <td>
          <span>
            <img src={image} alt="" style={{width:"100%",maxWidth:"35px",marginRight:"2em"}}/>   
                {name}
            </span>
        </td>
        <td>
            {symbol}
        </td>
        <td>${price}</td>
        <td>${volume}</td>
        <td>${marketcap}</td>
        <td style={{color:style}}>{priceChange}%</td>
        </>)
  

        
               
    
}

export default Coin
