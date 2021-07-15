import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import Loader from "react-loader-spinner";
import {Breadcrumb,Row,Col,Container,Card,Button,Badge,Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';
import  {getSingleCoinData,getCoinChartData} from '../Store/Actions/Actions'
import {withGetScreen} from 'react-getscreen'
import '../CSS/singlecoin.css'
const SingleCoin = (props) => {

const id=props.match.params.id
const options = {style: 'currency', currency: 'USD'};
const numberFormat = new Intl.NumberFormat('en-US', options);
const [percentageChange,setPercentageChange] =useState('')
// useEffect(() => {
//   window.addEventListener('resize', () => {
//     const myWidth  = window.innerWidth;
    
//     document.getElementsByClassName('highcharts-container').style.width=myWidth
//     console.log('my width :::', myWidth)
//  })
// },[window])

// useEffect(()=>{
// const x = props.ChartDataPrice ? document.getElementById('highcharts-3ub2489-0').style.width="30%" : "hello there"
// console.log(x)
// },[window.innerWidth])
useEffect(()=>{
  props.getSingleCoinData(id) 
},[])
// useEffect(()=>{
//   configPrice.setSize(600, 300);
// },[])
useEffect(()=>{
  props.getCoinChartData(id,'usd','max')

},[])

const initValues={
  coinName:props.singlecoinData ? props.singlecoinData.name: "hello" 
}
const [values,setValues]=useState(initValues)
// const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
const {coinName}=values
useEffect(()=>{
  console.log(values)
},[id])
const configPrice = props.ChartDataPrice ? {    
  yAxis: [{
    offset: 20,
    labels: {
      formatter: function () {
        return numberFormat.format(this.value) 
      },
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
    width:800
    
  },
  containerProps:{ className: "test-class" },
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
  ],
  responsive: {
    rules: [{
        condition: {
         
            maxWidth: 550
        },
        chartOptions: {
            chart: {
                height: 600,
               
            },
            subtitle: {
                text: null
            },
            navigator: {
                enabled: false
            }
        }
    }]
}
}:"loading..."

 
  const style=props.singlecoinData && props.singlecoinData.market_data.price_change_percentage_24h<0?'red':'green'
  const style7=props.singlecoinData && props.singlecoinData.market_data.price_change_percentage_7d<0?'red':'green'
  const style14=props.singlecoinData && props.singlecoinData.market_data.price_change_percentage_14d<0?'red':'green'
  const style30=props.singlecoinData && props.singlecoinData.market_data.price_change_percentage_30d<0?'red':'green'
  const style1y=props.singlecoinData && props.singlecoinData.market_data.price_change_percentage_1y<0?'red':'green'
  const style2=props.singlecoinData && props.singlecoinData.market_data.ath_change_percentage.usd<0?'red':'green'
  const style3=props.singlecoinData && props.singlecoinData.market_data.atl_change_percentage.usd<0?'red':'green'
  
    return (
      
      <div>
        
        {/* bread crumbds started */}
        <Breadcrumb>
        <Breadcrumb.Item ><Link to="/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item >
            {id}
        </Breadcrumb.Item>       
      </Breadcrumb>
      {/* breadcrumb ended */}
  

      {!props.loader && props.singlecoinData && props.ChartDataPrice?
      <div className="grid-container">
        <div className="space"> </div>
        <Card className="card1">
          <Card.Body >
            <Row style={{alignItems:'center'}}>
              <Col className="d-flex" xs={12}>
              <Card.Title style={{padding:'0px 10px'}}><img src={props.singlecoinData.image.thumb}/></Card.Title>
              <Card.Title>{props.singlecoinData.name}({props.singlecoinData.symbol})</Card.Title>  
              </Col>
              
            </Row>
            
            <Card.Text>

              <Row>
                <Col md={3}auto className="d-flex">
                  <p>{props.singlecoinData.market_data.current_price.usd}</p>
                </Col>
                <Col md={9}>
                  <p style={{color:style}}>{props.singlecoinData.market_data.price_change_percentage_24h}%</p>
                </Col>
              </Row>

              <Row>
                <Col md={3}className="left-wrapper">
                  <p >Homepage</p>
                </Col>
                <Col md={9} className="right-wrapper">
               
                  {props.singlecoinData.links.homepage.map((item)=>{             
                    const val=item!='' && item.split('/')[2].split('.')
                    
                    return(
                      item!=''&& <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}}  ><a style={{color:'white'}} href={item}>{val.length=='2'?val[0]:val[1]}</a></Badge></p>
                      )
                    })}
                  
                </Col>
              </Row>
              <Row className="flex-nowrap">
                <Col md={3} className="left-wrapper">
                  <p >Websites</p>
                </Col>
                <Col md={9} className="d-flex right-wrapper">
                  
                    {props.singlecoinData.links.blockchain_site.map((item)=>{  
                      const val=item!='' && item.split('/')[2].split('.')[0]     
                      return(
                        item!=''&& <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}}  ><a style={{color:'white'}} href={item}>{val}</a></Badge></p>
                        )
                      })}
                   
                </Col>
              </Row>

              <Row className="flex-nowrap">
                <Col md={3} className="left-wrapper ">
                  <p>Community</p>
                </Col>
                <Col md={9} className="d-flex right-wrapper">
                  
                    <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}} ><a style={{color:'white'}} href={`https://twitter.com/${props.singlecoinData.links.twitter_screen_name}`}>Twitter</a></Badge></p>

                    <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}}  ><a style={{color:'white'}} href={props.singlecoinData.links.subreddit_url}>Reddit</a></Badge></p>

                    <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}}  ><a style={{color:'white'}} href={`https://www.facebook.com/${props.singlecoinData.links.facebook_username}/`}>Facebook</a></Badge></p>

                    <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}}  ><a style={{color:'white'}} href={props.singlecoinData.links.official_forum_url[0]}>bitcointalk.org</a></Badge></p>
                 
                </Col>
                  

              </Row>

              <Row>
                <Col md={3} className="left-wrapper">
                  <p>Github</p>
                </Col>
                <Col md={9}className="right-wrapper">
                  <p><Badge style={{padding:'5px 10px',margin:'0px 5px'}}  ><a style={{color:'white'}} href={props.singlecoinData.links.repos_url.github[0]}>Github</a></Badge></p>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card  className="card2">
              <Card.Body>
                <Card.Title style={{textTransform:'capitalize'}}> {id} Market Stats</Card.Title>
                <Card.Text id="market_data">
                  <p>Market Cap<span>{props.singlecoinData.market_data.market_cap.usd}</span></p> 	
                  <p>Trading Volume<span>{props.singlecoinData.market_data.total_volume.usd.toLocaleString()}</span></p>
                  <p>Volume / Market Cap<span>{
                    (Number(props.singlecoinData.market_data.total_volume.usd)/
                    Number(props.singlecoinData.market_data.market_cap.usd)).toFixed(3)
                  }</span></p>
                  <p>24h Low / 24h High<span>{props.singlecoinData.market_data.low_24h.usd}/{props.singlecoinData.market_data.high_24h.usd}</span></p>
                  <p>Market Cap Rank<span>{props.singlecoinData.market_cap_rank}</span></p>
                  <p>All-Time High	<span><span>{props.singlecoinData.market_data.ath.usd}</span><span style={{color:style2}}>({props.singlecoinData.market_data.ath_change_percentage.usd}%)</span></span></p>
                  <p>All-Time Low<span><span>{props.singlecoinData.market_data.atl.usd}</span><span style={{color:style3}}>
                  ({props.singlecoinData.market_data.atl_change_percentage.usd}%)</span></span></p>
                </Card.Text>
              </Card.Body>
            </Card>

                  <div className="graph">
            <ReactHighcharts config = {configPrice} id="lesgoo" />

                  </div>

            
            <Table bordered responsive className="Datatable">
           <thead>
             <tr>
             
             <th>24h</th>
             <th>7d</th>
             <th>14d</th>
             <th>30d</th>
             <th>1y</th>
             </tr>
           </thead>
           <tbody>
             <tr>
                 <td style={{color:style}}>{props.singlecoinData.market_data.price_change_percentage_24h}%</td>
                 <td style={{color:style7}}>{props.singlecoinData.market_data.price_change_percentage_7d}%</td>
                 <td style={{color:style14}}>{props.singlecoinData.market_data.price_change_percentage_14d}%</td>
                 <td style={{color:style30}}>{props.singlecoinData.market_data.price_change_percentage_30d}%</td>
                 <td style={{color:style1y}}>{props.singlecoinData.market_data.price_change_percentage_1y}%</td>
             </tr>
           </tbody>
         </Table>
            <div className="space"> </div>
      </div>
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
