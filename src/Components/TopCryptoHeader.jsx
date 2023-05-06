import React, { useState, useEffect } from 'react';
import '../Styles/TopCryptoHeader.css';
import axios from 'axios';

const TopCryptoHeader = props => {

    const [highligtCoinHeader, setHighligthCoinHeader] =  useState('У центрі уваги');
    const [newListingHeader, setNewListingHeader] =  useState('Нові лістигни');
    const [topGainerCoinHeader, setTopGainerCoinHeader] =  useState('Монети, що показують ріст');
    const [topVolumeCoinHeader, setTopVolumeCoinHeader] =  useState('Топ монети за об\'ємом');


    const [highligtCoinList, sethighligtCoinList] = useState(
        [
            { s: 'BTC', c: 30000, p: 67 },
            { s: 'BNC', c: 2567, p: 23 },
            { s: 'ETH', c: 10, p: 10 }
        ]);
    const [newListingList, setNewListingList] = useState([]);
    const [topGainerCoinList, setTopGainerCoinList] = useState([]);
    const [topVolumeCoinList, setTopVolumeCoinList] = useState([]);

    useEffect(() => {
        
    },[])


    return (
        <div className='body'>
            <div className='top-crypto-header'>
                <div className='item'>
                    <div className='title'>{highligtCoinHeader}</div>
                    <div className='list'>
                        {highligtCoinList.map(item => (
                            <div className='list-column'>
                                <div className='list-row symbol'>
                                    {'img ' + item.s}
                                </div>
                                <div className='list-row price'>
                                    {item.c}
                                </div>
                                <div className='list-row price-change'>
                                    {item.p}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='item'>
                    <div className='header'>{newListingHeader}</div>
                </div>
                <div className='item'>
                    <div className='header'>{topGainerCoinHeader}</div>
                </div>
                <div className='item'>
                    <div className='header'>{topVolumeCoinHeader}</div>
                </div>
      
            </div>
        </div>
    );
};


export default TopCryptoHeader;