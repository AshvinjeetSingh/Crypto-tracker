import React from 'react'
import './Coin.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
const Coin = ({name,image,symbol,price,volume,priceChange,marketcap}) => {
    return (
        
                <Col md={3}>
                    <Card style={{ width: '250px',background:'#2e219514',padding:'20px 40px',boxShadow: '0 0 0 #cccccc, 0 0 0 #ffffff, 10px 10px 10px #cccccc , -10px -10px 10px #ffffff ',
    minWidth: '320px',
    minHeight: '493px',
    maxWidth: '320px',
    maxHeight: '520px',marginBottom:'50px'}}>
                    <Card.Img variant="top" src={image} alt="crypto-image" style={{width:'100%'}} />
                    <Card.Body>
                        <Card.Title><h1>{name}<span className="name-span">({symbol})</span></h1></Card.Title>
                        <Card.Text>
                        <p className="coin-price">
                            <span className="asdf"><h1 className="name-span">Current Price:</h1></span>
                            Rs {price}</p>
                   <p className="coin-volume">
                       <span className="asdf"><h1 className="name-span">Total Volume:</h1></span>
                       Rs {volume}</p>

                   {priceChange<0 ? (<p className="coin-percent red">
                       <span className="asdf"><h1 className="name-span">Price change:</h1></span>
                       {priceChange.toFixed(2)}%</p>) : (<p className="coin-percent green">
                           <span className="asdf"><h1 className="name-span">Price change:</h1></span>
                           {priceChange}%</p>)}

                     <p className="market-cap">
                     <span className="asdf"><h1 className="name-span">Market Cap:</h1></span>
                        Rs {marketcap.toLocaleString()}
                   </p>.
                        </Card.Text>
                        
                    </Card.Body>
                    </Card>
                </Col>
               
            
    )
    //     <div className="coin-container">
    //         <div className="coin-row">
    //             <Col xs lg="2">
    //             <div className="coin">
    //                 <img src={image} alt="crypto-image"/>
    //                 <h1>{name}<span className="name-span">({symbol})</span></h1>
    //                 {/* <p className="coin-symbol">{symbol}</p> */}
    //             </div>
                
    //             <div className="coin-data">
    //                 <p className="coin-price">Rs {price}</p>
    //                 <p className="coin-volume">Rs {volume}</p>

    //                 {priceChange<0 ? (<p className="coin-percent red">{priceChange.toFixed(2)}%</p>) : (<p className="coin-percent green">{priceChange}%</p>)}

    //                 <p className="market-cap">
    //                     MKT CAP: Rs {marketcap.toLocaleString()}
    //                 </p>
    //             </div>

    //         </div>
            
    //     </div>
    // )
}

export default Coin
