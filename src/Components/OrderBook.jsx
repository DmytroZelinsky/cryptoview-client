import { Table } from 'antd';
import React from 'react';
import { getColorForPriceChange, formatPriceShort, formatNumber } from '../Helpers/priceHelper'

function OrderBook(props) {

    const askPriceCol = {
        title: 'Ціна(' + props.quoteName.toUpperCase() + ')',
        dataIndex: 'price',
        key: 'price',
        render: (value, record) => (
            <div className="red">  
                {formatNumber(value)}
            </div>
        ),
        width: '100px'
    }

    const bidPriceCol = {
        title: 'Ціна(' + props.quoteName.toUpperCase() + ')',
        dataIndex: 'price',
        key: 'price',
        render: (value, record) => (
            <div className="green">  
                {formatNumber(value)}
            </div>
        ),
        width: '100px'
    }

    const columns = [
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
        title: 'Усього',
        dataIndex: 'total',
         key: 'total',
        render: (value, record) => (
            <div>  
                {formatNumber(value)}
            </div>
        ),
        align:'right',
        width: '100px'
    }];

    return (
        <div className="orderbook-body">
            <Table columns={[askPriceCol, ...columns]} dataSource={props.asks} pagination={{position: ['none', 'none']}} size='small'/>
            <div className="price">{formatNumber(props.crypto?.c)}</div>
            <Table 
                columns={[bidPriceCol, ...columns]}
                showHeader={false}
                dataSource={props.bids} 
                pagination={{position: ['none', 'none']}} 
                size='small'/>
        </div>
    );
}

export default OrderBook