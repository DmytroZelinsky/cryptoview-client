import React, { useEffect, useState } from 'react';
import ws, { unsubscribeFromSocket, subscribeToSocket } from '../socket'
import TopCryptoHeader from '../Components/TopCryptoHeader'
import CryptoTable from '../Components/CryptoTable'
import axios from 'axios'
import TradingData from '../Components/TradingData'

const MarketsOverview = () => {

    const streamName = "!ticker@arr@3000ms"
    const streamId = 1

    const [cryptosUsdt, setCryptosUsdt] = useState([]);
    const [updatedCryptosUsdt, setUpdatedCryptosUsdt] = useState([]);


    const getCryptosUsdt = async () => {
        let availableCryptoUsdt = []
        await axios.get('https://api.binance.com/api/v3/exchangeInfo')
            .then(response => {
                availableCryptoUsdt = response.data.symbols.filter(x => 
                    x.quoteAsset === 'USDT' && x.status === "TRADING"
                )
            })   

        await axios.get('https://api.coincap.io/v2/assets?limit=500')
            .then(response => {
                let innitialCryptosUsdt = response.data.data

                setCryptosUsdt(innitialCryptosUsdt.filter(i => {
                    return !!availableCryptoUsdt.find(a => 
                        a.baseAsset === i.symbol
                    )
                }))
            })
    }

    const setOnMessage = () => {
        ws.onmessage = (message) => {
            let data = JSON.parse(message.data)
            if (data.stream === streamName) {
                setUpdatedCryptosUsdt(JSON.parse(message.data).data);
            }
        }
    }

    useEffect(() => {
        getCryptosUsdt()

        subscribeToSocket([streamName], streamId)
        
        setOnMessage()
        
        document.title = 'Огляд ринків'

        return async () => { await unsubscribeFromSocket([streamName], streamId) }
     }, [])

    useEffect(() => {
        cryptosUsdt?.forEach(c => {
            c.priceChangeStatus = 0
            c.changePercent24HrStatus = 0
            updatedCryptosUsdt?.forEach(u => {
                if (u.s === c.symbol + 'USDT') {
                    c.priceChangeStatus = +u.c >= +c.priceUsd 
                        ? +u.c === +c.priceUsd 
                            ? 0
                            : 1
                        : -1
                    c.changePercent24HrStatus = +u.P >= +c.changePercent24Hr 
                        ? +u.P === +c.changePercent24Hr 
                            ? 0
                            : 1
                        : -1
                    c.priceUsd = u.c // close price
                    c.changePercent24Hr = u.P
                    c.marketCapUsd = c.supply * u.c
                    return
                }
            })
        })

    }, [updatedCryptosUsdt])

    
    return (
        <div>
            <TopCryptoHeader data={cryptosUsdt}/>
            <CryptoTable data={cryptosUsdt}/>
            <TradingData data={cryptosUsdt}/>
        </div>
    );
};

export default MarketsOverview;