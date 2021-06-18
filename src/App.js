import './App.css';
import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinsList from './Containers/CoinsList'
import NavbarTitle from './Containers/Navbar';
import {Switch,Route} from 'react-router-dom'
import SingleCoin from './Containers/SingleCoin';





function App() {
  return (
    <>
    <NavbarTitle/>
    <Switch>
      <Route path='/' exact component={CoinsList}/>
      <Route path='/:id' exact component={SingleCoin}/>
    </Switch>
    </>
  );
}

export default App;
