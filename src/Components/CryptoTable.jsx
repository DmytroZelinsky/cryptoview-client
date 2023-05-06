import React, { useEffect } from 'react';
import axios from 'axios';
import { Table, Divider } from 'antd'
import '../Styles/CryptoTable.css'

const CryptoTable = ({data}) => {
  const columns = [
    {
      title: 'Назва',
      dataIndex: 'name',
      width: '300px',
      render: (value, record) => (
        <div className="name-column">
          {value}
        </div>
      )
    },
    {
      title: 'Ціна',
      dataIndex: 'priceUsd',
      width: '200px',
      render: (value, record) => (
        <>
          {Number(value) < 0 
          ?
            <div className={'price-usd-column ' + getColorForPriceChange(record.priceChangeStaus)}>
                {Intl.NumberFormat('en-US', {
                  notation: "compact",
                  maximumFractionDigits: 2,
                  style: 'currency', 
                  currency: 'USD'
                }).format(value)}
            </div>
          :
            <div className={'price-usd-column ' + getColorForPriceChange(record.priceChangeStaus)}>
              {Intl.NumberFormat('en-US', {
                notation: "compact",
                maximumSignificantDigits: 4,
                maximumFractionDigits: 2,
                style: 'currency', 
                currency: 'USD'
              }).format(value)}
            </div>
          }
        </>
      )
    },
    {
      title: 'Зміни',
      dataIndex: 'changePercent24Hr',
      width: '225px',
      render: (value, record) => (
        <div className={'change-percent-column ' + getColorForPriceChange(record.priceChangeStaus)}>  
            {(+value).toFixed(2) + '%'}
        </div>
      )
    },
    {
      title: 'Об\'єм за 24г.',
      dataIndex: 'volumeUsd24Hr',
      width: '275px',
      render: (value) => (
        <div className='volume-usd-column'>
             {Intl.NumberFormat('en-US', {
              notation: "compact",
              maximumFractionDigits: 2,
              style: 'currency', 
              currency: 'USD'
            }).format(value)}
        </div>
      )
    },
    {
      title: 'Ринкова капіталізація',
      dataIndex: 'marketCapUsd',
      width: '275px',
      render: (value) => (
        <div className='market-cap-usd-column'>
            {Intl.NumberFormat('en-US', {
              notation: "compact",
              maximumFractionDigits: 2,
              style: 'currency', 
              currency: 'USD'
            }).format(value)}
        </div>
      )
    },
    {
        title: '',
        dataIndex: '',
        key: 'x',
        render: () =>                   
        <div>
            <a>Деталі</a>
            <Divider type="vertical" />
            <a>Торгувати</a>
        </div>,
      },
  ];

  const getColorForPriceChange = (priceStatus) => {
    switch(priceStatus) {
      case 1: return 'green'
      case -1: return 'red'
      case 0: return ''
    }
  }


  useEffect(() => { }, [data])

    return (
        <div>
            <Table className='crypto-table' fontSize='40px' dataSource={data} columns={columns}/>
        </div>
    );
}

export default CryptoTable;