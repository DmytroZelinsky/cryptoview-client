import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'antd' 
import '../Styles/Trade.css'
import { useParams } from 'react-router-dom';
import ws, { unsubscribeFromSocket, subscribeToSocket } from '../socket'
import OrderBook from '../Components/OrderBook';
import '../Styles/Orderbook.css'
import TradeHeader from '../Components/TradeHeader';
import TradingView from '../Components/TradingView';
import MarketTrades from '../Components/MarketTrades';
import axios from 'axios'
import ForecastPrices from '../Components/ForecastPrices';
import PriceCalculator from '../Components/PriceCalculator';
import { formatNumber } from '../Helpers/priceHelper.js'

function Trade(props) {

    let { symbol, id } = useParams()

    const [crypto, setCrypto] = useState()
    const [asks, setAsks] = useState([])
    const [bids, setBids] = useState([])
    const [trades, setTrades] = useState([])
    const [forecastPrices, setForecastPrices] = useState([])
    const [price, setPrice] = useState()

    const [baseName, quoteName] = symbol.split('_')

    const streamSymbol = [baseName.toLocaleLowerCase(), quoteName.toLowerCase()].join('')

    let displaySymbolName = [baseName, quoteName].join('/').toUpperCase()
    let symbolStreamName = streamSymbol + '@ticker'
    let tradeStreamName = streamSymbol + '@trade'
    let orderBooksStreamName = streamSymbol + '@depth10'
    const streamId = 2
    const tradesCount = 20

    const getTrades = async () => {
        await axios.get('https://api.binance.com/api/v3/trades?symbol=' + [baseName, quoteName].join('') + '&limit=' + tradesCount)
        .then(response => {
            console.log(response.data)
            setTrades(response.data.reverse().map(x => {
                let dateTime = new Date(x.time).toLocaleString('en-GB').substring(12,21).toString()
                return {
                    price: x.price,
                    qty: x.qty,
                    time: dateTime
            }}))
        })  
    }

    const setOnMessage = () => {
        ws.onmessage = (message) => {
            let data = JSON.parse(message.data)

            if (data.stream === symbolStreamName) {
                let newCrypto = data.data

                setCrypto(prev => {
                    newCrypto.priceStatus = +newCrypto.c > +prev?.c ? 1 : -1
                    newCrypto.priceChangeStatus = +newCrypto.P > 0 ? 1 : -1
                    return newCrypto
                })
            }
            else if(data.stream === orderBooksStreamName) {
                setAsks(data.data.asks.map(a => {
                    return {
                        price: a[0],
                        qty: a[1],
                        total: a[0] * a[1]
                    }
                }).reverse())

                setBids(data.data.bids.map(b => {
                    return {
                        price: b[0],
                        qty: b[1],
                        total: b[0] * b[1]
                    }
                }))
            } 
            else if(data.stream === tradeStreamName) {
                let dateTime = new Date(data.data.T).toLocaleString('en-GB').substring(12,21).toString()

                setTrades(prev => 
                {
                    let trade = {
                        price: data.data.p,
                        qty: data.data.q,
                        time: dateTime,
                        priceStatus: +data.data.p >= +prev[0].price 
                            ? +data.data.p === +prev[0].price 
                                ? prev[0].priceStatus
                                : 1
                           : -1
                    }

                    setPrice({
                        value: trade.price,
                        status: trade.priceStatus
                    })
                    document.title = formatNumber(trade.price) + ' | ' + displaySymbolName
                    return [trade,...prev].slice(0,tradesCount)
                })
            }
        }
    }

    const getPriceForecast = async (id) => {
        await axios.get('https://localhost:7272/api/PriceChanges?id=' + id)
            .then(response => {
                setForecastPrices(response.data.map((x, i) => { 
                    let date = new Date()
                    date.setDate(date.getDate() + i)
                    
                    return {
                        date: i === 0 
                            ? 'Сьогодні'
                            : date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}),
                        priceUsd: x
                    }
                }))
            })
    }


    useEffect(() => {

        subscribeToSocket([symbolStreamName, orderBooksStreamName, tradeStreamName], streamId)
        
        getPriceForecast(id)

        getTrades()

        setOnMessage()
        
        return async () => { await unsubscribeFromSocket([symbolStreamName, orderBooksStreamName, tradeStreamName], streamId) }
     }, [])


    return (
        <div className="trade-body">
            <Row gutter={[16,24]}>
                <Col span={18}>
                    <TradeHeader baseName={baseName} quoteName={quoteName} crypto={crypto} symbolName={displaySymbolName} price={price}/>
                    <Row gutter={[16,24]} style={{marginTop:"16px"}}>
                        <Col span={8}>
                            <OrderBook bids={bids} asks={asks} crypto={crypto} baseName={baseName} quoteName={quoteName}/>
                        </Col>
                        <Col span={16}>
                            <Row>
                                <TradingView symbol={[baseName, quoteName].join('')} />
                            </Row>
                            <Row>
                                <ForecastPrices data={forecastPrices} />
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col span={6}>
                    <Row>
                        <MarketTrades trades={trades} baseName={baseName} quoteName={quoteName}/>
                    </Row>
                    <Row>
                        <PriceCalculator crypto={crypto} baseName={baseName}/>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Trade;