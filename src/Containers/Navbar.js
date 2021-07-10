import React,{useState} from 'react'
import Navbar from  'react-bootstrap/Navbar'
import {Button,Form,FormControl} from 'react-bootstrap'
import Autosuggest from '../Components/Autosuggest'
import '../CSS/Navbar.css'


const NavbarTitle = () => {
    

  
  const [search,setSearch]=useState("")
    const handleInput=(e)=>{
        setSearch(e.target.value)
        console.log(e.target.value)
      }
    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg" style={{justifyContent:"space-between"}}>
            <Navbar.Brand href="#home"> <img src="https://lh3.google.com/u/0/d/1i9DqfcP0c4TQMcrBeSy6J83nL5FiZDPe=w1904-h947-iv1" style={{width:'100%',filter:'invert(1)'}}/></Navbar.Brand>
            <Navbar aria-controls="basic-navbar-nav" />
           
                <Form inline style={{position:'relative'}}>
                <Autosuggest/>
                <Button style={{    "background": "#7666e4",
    "color": "white","border":0}}>Search</Button>
                </Form>
            
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
