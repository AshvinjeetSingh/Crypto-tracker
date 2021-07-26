import axios from "axios";

export default axios.create({
    baseURL:'https://api.coingecko.com/api/v3/coins/',
    responseType:JSON,
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})