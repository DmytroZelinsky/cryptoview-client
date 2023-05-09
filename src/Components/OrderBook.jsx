import { Table } from 'antd';
import React from 'react';
import { getColorForPriceChange, formatPriceShort, formatNumber } from '../Helpers/priceHelper'

function OrderBook(props) {

    const columns = [
        {
            title: 'Ціна(' + props.baseName.toUpperCase() + ')',
            dataIndex: 'price',
            key: 'price',
            render: (value, record) => (
                <div>  
                    {formatNumber(value)}
                </div>
            ),
            width: '100px'
        },
        {
            title: 'Кількість(' + props.quoteName.toUpperCase() + ')',
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
        },
      ];

    return (
        <div className="orderbook-body">
            <Table columns={columns} dataSource={props.bids} pagination={{position: ['none', 'none']}} size='small'/>
            Sometgins
            <Table 
                columns={columns}
                showHeader={false}
                dataSource={props.asks} 
                pagination={{position: ['none', 'none']}} 
                size='small'/>
        </div>
    );
}

export default OrderBook