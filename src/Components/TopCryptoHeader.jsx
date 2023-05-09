import React, { useState, useEffect } from 'react';
import '../Styles/TopCryptoHeader.css';
import TopCryptoItem from './TopCryptoItem';
import axios from 'axios';

const TopCryptoHeader = (props) => {

    const highligtCoinHeader = 'У центрі уваги'
    const topLossCoinHeader = 'Монети, що показують спад'
    const topGainerCoinHeader = 'Монети, що показують ріст'
    const topVolumeCoinHeader =  'Топ монети за об\'ємом'

    const [highligtCoins, setHighligtCoins] = useState([]);
    const [topLossCoins, setTopLossCoins] = useState([]);
    const [topGainerCoins, setTopGainerCoins] = useState([]);
    const [topVolumeCoins, setTopVolumeCoins] = useState([]);

    useEffect(() => {
        setHighligtCoins([...props.data].sort((x, y) => 
            +y.marketCapUsd - +x.marketCapUsd
        ).slice(0, 3))

        setTopLossCoins([...props.data].sort((x, y) => 
            +x.changePercent24Hr - +y.changePercent24Hr
        ).slice(0, 3))

        setTopGainerCoins([...props.data].sort((x, y) => 
            +y.changePercent24Hr - +x.changePercent24Hr
        ).slice(0, 3))

        setTopVolumeCoins([...props.data].sort((x, y) => 
            +y.volumeUsd24Hr - +x.volumeUsd24Hr
        ).slice(0, 3))

    }, [props])

    return (
        <div className="top-crypto-header-body">
             <div className='top-crypto-header'>
                <TopCryptoItem data={highligtCoins} name={highligtCoinHeader}/>
                <TopCryptoItem data={topLossCoins} name={topLossCoinHeader}/>
                <TopCryptoItem data={topGainerCoins} name={topGainerCoinHeader}/>
                <TopCryptoItem data={topVolumeCoins} name={topVolumeCoinHeader}/>
            </div>
        </div>
    );
};


export default TopCryptoHeader;