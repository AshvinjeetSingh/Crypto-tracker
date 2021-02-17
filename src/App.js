import './App.css';
import React,{useState,useEffect} from 'react' 
import axios from 'axios'
import Coin from './Coin'
import { Row,Container } from 'react-bootstrap';
import NavbarTitle from './Navbar';
import Col from 'react-bootstrap/Col';
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'
// import HeroSection from './HeroSection';
// URL:https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false



function App() {

  const [coins,setCoins] =useState([])
  const [search,setSearch]=useState("")

  useEffect(()=>
  {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>
      {
        setCoins(res.data);
        console.log(res.data)
      } )
  },[])



  

  const filteredCoins=coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())  
    );

    const handleInput=(e)=>{
    setSearch(e.target.value)
    console.log(e.target.value)
  }
  return (
    <>
    <NavbarTitle/>
    <div className="coin-app" >
      <Segment>
    <Grid columns={2} relaxed='very' style={{display:'flex',justifyContent:'space-between'}}>
      <Grid.Column style={{background:'#2e2195',width:'100%',position:'relative'}} >
        <div className="coin-search" style={{    position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)'}}>
        <h1 className="coin-text" style={{color:'white',fontFamily: 'Share Tech, sans-serif'}}>Search your Coin</h1>
          <form>
            <input type="text" placeholder="Search your cryptocurrency" className="coin-input" onChange={handleInput}/>
          </form>  
      </div>
      </Grid.Column>
      <Grid.Column>
        
          <Image src='https://cdn.dribbble.com/users/1314508/screenshots/6525918/artboard.jpg' style={{width:'100%',height:'100%'}} />
        
      </Grid.Column>
    </Grid>
  </Segment>
      <Container style={{margin:'35px 0px'}}>
        <Row style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly',alignItems:'center'}}>
      {filteredCoins?filteredCoins.map(coinid=>{
          return <Coin 
            key={coinid.id} 
            name={coinid.name} 
            image={coinid.image} 
            symbol={coinid.symbol} 
            volume={coinid.total_volume}
            price={coinid.current_price.toLocaleString()}
            priceChange={coinid.price_change_percentage_24h}
            marketcap={coinid.market_cap}
            />;

        }):<h1>No coins</h1>}
        </Row>
      </Container>
    </div>
    </>
  );
}

export default App;
