import './App.css';
import React,{useEffect} from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CoinsList from './Containers/CoinsList'
import NavbarTitle from './Containers/Navbar';
import {Switch,Route,Redirect} from 'react-router-dom'
import SingleCoin from './Containers/SingleCoin';
import { keepTheme  } from './Components/Theme-context'
import { useHistory } from 'react-router-dom'
import Footer from  './Containers/Footer'



const  App=() =>{

  const useTracking = (trackingId) => {
    const { listen } = useHistory()
  
    useEffect(() => {
      const unlisten = listen((location) => {
        // if you pasted the google snippet on your index.html
        // you've declared this function in the global
        if (!window.gtag) return
  
        window.gtag('config', trackingId, { page_path: location.pathname })
      })
  
      // remember, hooks that add listeners
      // should have cleanup to remove them
      return unlisten
    }, [trackingId, listen])
  }
 useEffect(()=>{
  keepTheme();
 })
 useTracking('UA-USE-YOURS-HERE')
 const style={
  "min-height": "calc(100vh - 54px)"
 }
  return (
    <>
    <div style={style}>
    <NavbarTitle/>
    <Switch >
      <Route path='/' exact component={CoinsList}/>
      <Route path='/coins/:id' exact component={SingleCoin}/>
      <Redirect to = {'/'}/>
    </Switch>
    </div>
    
    <Footer/>
    </>
  );
}

export default App;
