import './App.css';
import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CoinsList from './Containers/CoinsList'
import NavbarTitle from './Containers/Navbar';
import {Switch,Route,Redirect} from 'react-router-dom'
import SingleCoin from './Containers/SingleCoin';





function App() {
  return (
    <>
    <NavbarTitle/>
    <Switch>
      <Route path='/' exact component={CoinsList}/>
      <Route path='/coins/:id' exact component={SingleCoin}/>
      <Redirect to = {'/'}/>
    </Switch>
    </>
  );
}

export default App;
