import './App.css';
import React,{useState,useEffect} from 'react' 
import axios from 'axios'
import Coin from './Coin'

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


  const handleInput=(e)=>{
    setSearch(e.target.value)
    console.log(e.target.value)
  }

  const filteredCoins=coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())  
    );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search your Coin</h1>
          <form>
            <input type="text" placeholder="Search your cryptocurrency" className="coin-input" onChange={handleInput}/>
          </form>  
      </div>
      {filteredCoins.map(coinid=>{
          return <Coin 
            key={coinid.id} 
            name={coinid.name} 
            image={coinid.image} 
            symbol={coinid.symbol} 
            volume={coinid.total_volume.toLocaleString()}
            price={coinid.current_price.toLocaleString()}
            priceChange={coinid.price_change_percentage_24h}
            marketcap={coinid.market_cap}
            />;

        })}
    </div>
  );
}

export default App;
