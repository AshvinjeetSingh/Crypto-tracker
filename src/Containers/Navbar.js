import React,{useState,useEffect} from 'react'
import Navbar from  'react-bootstrap/Navbar'
import {Button,Form,FormControl} from 'react-bootstrap'
import Autosuggest from '../Components/Autosuggest'
import { Icon, InlineIcon } from '@iconify/react';
import sunF from '@iconify/icons-jam/sun-f';
import moonSolid from '@iconify/icons-clarity/moon-solid';
import '../CSS/Navbar.css'
import '../CSS/toggle.css';
import image from '../Images/Logo.png'
import { useHistory,useLocation } from "react-router-dom";

import { setTheme   } from '../Components/Theme-context'

const NavbarTitle = (props) => {
    
  let history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;
  useEffect(()=>{
    console.log("props",pathName)
  },[])
  // const location=props && props.history && props.history.location.pathName
  const [search,setSearch]=useState("")
  const [isToggleOn,setIsToggleOn]=useState('dark')
  let theme = localStorage.getItem('theme');
  console.log(theme)
    const handleClick=()=>{
      if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        setIsToggleOn('light')
        console.log(isToggleOn)
    } else {
        setTheme('theme-dark');
        setIsToggleOn('dark')
    }
      }

      useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
          setIsToggleOn('dark')
        } else if (localStorage.getItem('theme') === 'theme-light') {
          setIsToggleOn('light')
        }
    }, [theme])
    return (
        <>
        <Navbar expand="lg" className="navbar align-items-center">
            <Navbar.Brand href="/"> 
              <img src={image} style={{width:'100%',filter:'invert(1)'}}/>
            </Navbar.Brand>
            
                <div style={{display:'flex'}} className="AutoSuggestandtoggle">
                  {
                    pathName=='/' && <Autosuggest coinId={props.coinId}/>
                  }
                
                <span>
                <div className={isToggleOn=='light' ? 'toggleSwitch' :'toggleSwitchDark'} onClick={handleClick} >
                <div className={isToggleOn=='light' ? 'knobDark' : 'knobLight'} />
                {
                isToggleOn=='light' ? <Icon icon={sunF} style={{color: '#DBCA2F', fontSize: '30px'}} hFlip={true} className="sunIcon"/> : <Icon icon={moonSolid} style={{color: '#DBCA2F', fontSize: '30px'}} className="moonIcon" />
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
