import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import Loader from "react-loader-spinner";
import {Breadcrumb,Row,Col,Container,Card,Button,Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';
import  {getSingleCoinData,getCoinChartData} from '../Store/Actions/Actions'
import '../CSS/singlecoin.css'
const SingleCoin = (props) => {

const id=props.match.params.id
const options = {style: 'currency', currency: 'USD'};
const numberFormat = new Intl.NumberFormat('en-US', options);
const [percentageChange,setPercentageChange] =useState('')
// const website={
//   'http://www.bitcoin.org':'Bitcoin.org',
//   'https://blockchair.com/bitcoin/':'BlockChair',
//   'https://btc.com/':'btc',
//   'https://btc.tokenview.com/':'TokenView',

// }

const configPrice = props.ChartDataPrice ? {
      
  yAxis: [{
    offset: 20,

    labels: {
      formatter: function () {
        return numberFormat.format(this.value) 
      }
      ,
      x: -15,
      style: {
        "color": "#000", "position": "absolute"

      },
      align: 'left'
    },
  },
    
  ],
  tooltip: {
    shared: true,
    formatter: function () {
      return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
    }
  },
  plotOptions: {
    series: {
      showInNavigator: true,
      gapSize: 6,

    }
  },
  rangeSelector: {
    selected: 1
  },
  
  chart: {
    height: 600,
    width:1000
  },

  credits: {
    enabled: false
  },

  legend: {
    enabled: true
  },
  xAxis: {
    type: 'date',
  },
  rangeSelector: {
    buttons: [{
      type: 'day',
      count: 1,
      text: '1d',
    }, {
      type: 'day',
      count: 7,
      text: '7d'
    }, {
      type: 'month',
      count: 1,
      text: '1m'
    }, {
      type: 'month',
      count: 3,
      text: '3m'
    },
      {
      type: 'all',
      text: 'All'
    }],
    selected: 4
  },
  series: [{
    name: 'Price',
    type: 'spline',

    data: props.ChartDataPrice.prices,
    tooltip: {
      valueDecimals: 2
    },

  }
  ]
}:"loading..."

  useEffect(()=>{
    props.getSingleCoinData(id) 
  },[])

  useEffect(()=>{
    props.getCoinChartData(id,'usd','max')
  },[])
  const style=props.singlecoinData && props.singlecoinData.market_data.price_change_percentage_24h<0?'red':'green'
  const style2=props.singlecoinData && props.singlecoinData.market_data.ath_change_percentage.usd<0?'red':'green'
  const style3=props.singlecoinData && props.singlecoinData.market_data.atl_change_percentage.usd<0?'red':'green'
  // useEffect(()=>{
  //   const totalVolume=Number(props.singlecoinData.market_data.total_volume.usd)
  //   const marketCap=Number(props.singlecoinData.market_data.market_cap.usd)
  //   const percentageValue=(totalVolume/marketCap).toFixed(3)
  //   setPercentageChange(percentageValue)
  //   // console.log(percentageValue)
  // },[props.singlecoinData])
    return (
      <div>
        {/* bread crumbds started */}
        <Breadcrumb>
        <Breadcrumb.Item href='/coins'>Home</Breadcrumb.Item>
        <Breadcrumb.Item >
            {id}
        </Breadcrumb.Item>       
      </Breadcrumb>
      {/* breadcrumb ended */}
  

      {!props.loader && props.singlecoinData && props.ChartDataPrice?
      <Container fluid>
      <h1 style={{textAlign:'center',textTransform:'uppercase'}}>{id} stock price</h1>
      <Row>
        <Col>
        <Card style={{ width: '20rem' }}>
        <Card.Body >
          <Row style={{alignItems:'center'}}>
            <Card.Title style={{padding:'0px 10px'}}><img src={props.singlecoinData.image.thumb}/></Card.Title>
            <Card.Title>{props.singlecoinData.name}({props.singlecoinData.symbol})</Card.Title>  
          </Row>
          <Card.Title>${props.singlecoinData.market_data.current_price.usd}<span style={{color:style,'padding':'0px 15px '}}>{props.singlecoinData.market_data.price_change_percentage_24h}%</span></Card.Title>
          <Card.Text>
            <Row>
              <p style={{padding:'0px 10px'}}>Homepage</p>
              {props.singlecoinData.links.homepage.map((item)=>{             
                // window.alert(JSON.stringify(item,null,2))
                const val=item!='' && item.split('/')[2].split('.')
               console.log(val)
                  return(
                  item!=''&& <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}} variant="secondary" ><a style={{color:'white'}} href={item}>{val.length=='2'?val[0]:val[1]}</a></Badge></p>
                  )
              })}
            </Row>
            <Row>
              <p style={{padding:'0px 10px'}}>Websites</p>
              {props.singlecoinData.links.blockchain_site.map((item)=>{  
                      // console.log(item.split('/'))  
                      const val=item!='' && item.split('/')[2].split('.')[0]     
                  return(
                  item!=''&& <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}} variant="secondary" ><a style={{color:'white'}} href={item}>{val}</a></Badge></p>
                  )
              })}
              
            </Row>
            <Row>
              <p>Community</p>
              <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}} variant="secondary" ><a style={{color:'white'}} href={`https://twitter.com/${props.singlecoinData.links.twitter_screen_name}`}>Twitter</a></Badge></p>

              <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}} variant="secondary" ><a style={{color:'white'}} href={props.singlecoinData.links.subreddit_url}>Reddit</a></Badge></p>

              <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}} variant="secondary" ><a style={{color:'white'}} href={`https://www.facebook.com/${props.singlecoinData.links.facebook_username}/`}>Facebook</a></Badge></p>

              <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}} variant="secondary" ><a style={{color:'white'}} href={props.singlecoinData.links.official_forum_url[0]}>bitcointalk.org</a></Badge></p>

            </Row>
            <Row>
              <p>Github</p>
              <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}} variant="secondary" ><a style={{color:'white'}} href={props.singlecoinData.links.repos_url.github[0]}>Github</a></Badge></p>
            </Row>
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>
        {/* <coingecko-coin-convertor-widget currency="usd" coin-id="bitcoin" locale="en" height="300"></coingecko-coin-convertor-widget> */}
          {/* <div>
            <h1>{props.singlecoinData.name}<span>({props.singlecoinData.symbol})</span></h1>
          </div>
        </Col>
        <Col>
        <div>
          <h1>${props.singlecoinData.market_data.current_price.usd}</h1>
        </div> */}
        </Col>
        <Col>
        <Row>
            <Card style={{ width: '20rem' }}>
            
            <Card.Body>
              <Card.Title style={{textTransform:'capitalize'}}> {id} Price and Market Stats</Card.Title>
              <Card.Text id="market_data">
               <p>Market Cap<span>{props.singlecoinData.market_data.market_cap.usd}</span></p> 	
               <p>Trading Volume<span>{props.singlecoinData.market_data.total_volume.usd.toLocaleString()}</span></p>
               <p>Volume / Market Cap<span>{
                 (Number(props.singlecoinData.market_data.total_volume.usd)/
                Number(props.singlecoinData.market_data.market_cap.usd)).toFixed(3)
                 }</span></p>
               <p>24h Low / 24h High<span>{props.singlecoinData.market_data.low_24h.usd}/{props.singlecoinData.market_data.high_24h.usd}</span></p>
               <p>Market Cap Rank<span>{props.singlecoinData.market_cap_rank}</span></p>
               <p>All-Time High	<span><span>{props.singlecoinData.market_data.ath.usd}</span><span style={{color:style2}}>{props.singlecoinData.market_data.ath_change_percentage.usd}</span></span></p>
               <p>All-Time Low<span><span>{props.singlecoinData.market_data.atl.usd}</span><span style={{color:style3}}>
               {props.singlecoinData.market_data.atl_change_percentage.usd}</span></span></p>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Row>
        </Col>
     <Col>
        {/* Stock price chart started */}
        <ReactHighcharts config = {configPrice}></ReactHighcharts>
        </Col>
        </Row>
        {/* stock price chart ended */}
      </Container>
        :
        <Loader type="Grid" color="#7666e4" height={80} width={80} style={{'justify-content':'center','display':'flex'}} />
      }
      </div>
    )
}
const mapStateToProps=(state)=>{
  return{
    singlecoinData: state.CoinListReducers ? state.CoinListReducers.singlecoinData.data :null,
    ChartDataPrice: state.CoinListReducers ? state.CoinListReducers.chartData.data :null,
    loader:state.CoinListReducers? state.CoinListReducers.loading:null
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    getSingleCoinData:(id)=>dispatch(getSingleCoinData(id)),
    getCoinChartData:(id,cur,time)=>dispatch(getCoinChartData(id,cur,time))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SingleCoin)
