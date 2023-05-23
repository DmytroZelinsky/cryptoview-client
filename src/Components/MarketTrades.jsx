import React from 'react';
import { Table, Divider, Input } from 'antd'
import { getColorForPriceChange, formatPriceShort, formatNumber } from '../Helpers/priceHelper.js'
import '../Styles/MarketTrades.css'

function MarketTrades(props) {

    const columns = [
        {
            title: 'Ціна(' + props.quoteName.toUpperCase() + ')',
            dataIndex: 'price',
            key: 'price',
            render: (value, record) => (
                <div className={getColorForPriceChange(record.priceStatus)}>  
                    {formatNumber(value)}
                </div>
            ),
            width: '100px'
        },
        {
            title: 'Кількість(' + props.baseName.toUpperCase() + ')',
            dataIndex: 'qty',
            key: 'qty',
            render: (value, record) => (
            <div>  
                {formatNumber(value)}
            </div>
            ),
            align:'right',
            width: '100px'
        },
        {
            title: 'Час',
            dataIndex: 'time',
            key: 'time',
            align:'right',
            width: '100px'
        }];

    return (
        <div className="market-trades-body">
            <div class="header">Угоди на ринку</div>
            <Table columns={columns} dataSource={props.trades} pagination={{pageSize: 20, position: ['none', 'none']}} />
        </div>
    );
}

export default MarketTrades;