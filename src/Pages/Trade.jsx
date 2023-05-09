import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'antd' 
import '../Styles/Trade.css'
import { useParams } from 'react-router-dom';
import ws, { unsubscribeFromSocket, subscribeToSocket } from '../socket'
import { getColorForPriceChange, formatPriceShort, formatPercent, formatNumber } from '../Helpers/priceHelper'
import OrderBook from '../Components/OrderBook';
import '../Styles/Orderbook.css'


function Trade(props) {

    let { symbol } = useParams()

    const [cryptoUsdt, setCryptoUsdt] = useState()
    const [asks, setAsks] = useState([])
    const [bids, setBids] = useState([])

    const [baseName, quoteName] = symbol.split('_')

    symbol = [baseName, quoteName].join('')

    let symbolName = [baseName, quoteName].join('/').toUpperCase()
    let symbolStreamName = symbol + '@ticker'
    let klineStreamName = symbol + '@kline_15m'
    let orderBooksStreamName = symbol + '@depth10'
    const streamId = 2

    const setOnMessage = () => {
        ws.onmessage = (message) => {
            let data = JSON.parse(message.data)

            if (data.stream === symbolStreamName) {
                setCryptoUsdt(data.data)
            }
            else if(data.stream === orderBooksStreamName) {
                setAsks(data.data.asks.map(a => {
                    return {
                        price: a[0],
                        qty: a[1],
                        total: a[0] * a[1]
                    }
                }))

                setBids(data.data.bids.map(b => {
                    return {
                        price: b[0],
                        qty: b[1],
                        total: b[0] * b[1]
                    }
                }))
            }
        }
    }

    useEffect(() => {

        subscribeToSocket([symbolStreamName, orderBooksStreamName], streamId)
        
        setOnMessage()
        
        return async () => { await unsubscribeFromSocket([symbolStreamName, orderBooksStreamName], streamId) }
     }, [])


    return (
        <div className="trade-body">
            <Row gutter={[16,24]}>
                <Col span={20}>
                    <Row className="header">
                        <div className="symbol">
                            {symbolName}
                        </div>
                        <Col>
                            <Row gutter={24}>
                                <Col className="col price">
                                    {formatNumber(cryptoUsdt?.c)}
                                </Col>
                                <Col className="col price-change-col">
                                    <Row>
                                        Зміна за 24г
                                    </Row>
                                    <Row gutter={8}>
                                        <Col>{formatNumber(cryptoUsdt?.p)}</Col>
                                        <Col>{formatPercent(cryptoUsdt?.P)}</Col>
                                    </Row>
                                </Col>
                                <Col className="col">
                                    <Row>
                                        24г Макс
                                    </Row>
                                    <Row>
                                        <Col>{formatNumber(cryptoUsdt?.h)}</Col>
                                    </Row>
                                </Col>
                                <Col className="col">
                                    <Row>
                                        24г Макс
                                    </Row>
                                    <Row>
                                        <Col>{formatNumber(cryptoUsdt?.l)}</Col>
                                    </Row>
                                </Col>
                                <Col className="col">
                                    <Row>
                                        {"Об'єм за 24г(" + baseName.toUpperCase() + ")"}
                                    </Row>
                                    <Row>
                                        {formatNumber(cryptoUsdt?.v)}
                                    </Row>
                                </Col>
                                <Col className="col">
                                    <Row>
                                        {"Об'єм за 24г(" + quoteName.toUpperCase() + ")"}
                                    </Row>
                                    <Row>
                                        {formatNumber(cryptoUsdt?.q)}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                       
                    </Row>
                    <Row gutter={[16,24]} style={{marginTop:"16px"}}>
                        <Col>
                            <OrderBook bids={bids} asks={asks} baseName={baseName} quoteName={quoteName}/>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Col>

                <Col span={4}>
                    Market trades
                </Col>
            </Row>
        </div>
    );
}

export default Trade;