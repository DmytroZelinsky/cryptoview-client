import React, { useEffect } from 'react';
import '../Styles/TopCryptoItem.css';
import { Skeleton } from 'antd'

import { getColorForPriceChange, formatPriceShort, formatPercent } from '../Helpers/priceHelper.js'

function TopCryptoItem({name, data}) {

    useEffect(() => {

    }, [data])

    return (
        <div className='top-crypto-item'>
            <div className='title'><b>{name}</b></div>
            <div className='list'>
                {data?.map(item => (
                    <div className='list-column'>
                        <div className='list-row symbol' >
                            {item.symbol}
                        </div>
                        <div className={'list-row price ' + getColorForPriceChange(item.priceChangeStatus)}>
                            {formatPriceShort(item.priceUsd)}
                        </div>
                        <div className={'list-row price-change ' + getColorForPriceChange(item.changePercent24HrStatus)}>
                            {formatPercent(item.changePercent24Hr)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopCryptoItem;