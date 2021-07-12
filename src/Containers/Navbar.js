import React,{useState} from 'react'
import Navbar from  'react-bootstrap/Navbar'
import {Button,Form,FormControl} from 'react-bootstrap'
import Autosuggest from '../Components/Autosuggest'
import { Icon, InlineIcon } from '@iconify/react';
import sunF from '@iconify/icons-jam/sun-f';
import moonSolid from '@iconify/icons-clarity/moon-solid';
import '../CSS/Navbar.css'
import image from '../Images/Logo.png'

const NavbarTitle = () => {
    

  
  const [search,setSearch]=useState("")
  const [isToggleOn,setIsToggleOn]=useState(true)
    const handleClick=()=>{
        setIsToggleOn(!isToggleOn)
        console.log(isToggleOn)
      }
    return (
        <>
        <Navbar expand="lg" className="navbar align-items-center">
            <Navbar.Brand href="#home"> 
              <img src={image} style={{width:'100%',filter:'invert(1)'}}/>
            </Navbar.Brand>
            
                <div style={{display:'flex'}}>
                <Autosuggest/>
                
                <span>
                <div className={isToggleOn ? 'toggleSwitch' :'toggleSwitchDark'} onClick={handleClick} >
                <div className={isToggleOn ? 'knobDark' : 'knobLight'} />
                {
                isToggleOn ? <Icon icon={sunF} style={{color: '#DBCA2F', fontSize: '30px'}} hFlip={true} className="sunIcon"/> : <Icon icon={moonSolid} style={{color: '#DBCA2F', fontSize: '30px'}} className="moonIcon" />
                }
                </div>
                </span>
                </div>

                
                
                
            
        </Navbar>




        {/* <nav style={{background:'#2c1f95'}}>
            <img src="https://lh3.google.com/u/0/d/1i9DqfcP0c4TQMcrBeSy6J83nL5FiZDPe=w1904-h947-iv1" style={{maxWidth:"10%",width:'100%',filter:'invert(1)'}}/>
            <form>
            <input type="text" placeholder="Search your cryptocurrency" className="coin-input" onChange={handleInput}/>
          </form>

        </nav> */}
        </>
    )
}

export default NavbarTitle
