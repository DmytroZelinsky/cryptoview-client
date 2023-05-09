import React, { useEffect, useState } from 'react';
import { Table, Divider, Input } from 'antd'
import { MonitorOutlined } from '@ant-design/icons'
import '../Styles/CryptoTable.css'
import { getColorForPriceChange, formatPriceShort, formatPercent } from '../Helpers/priceHelper.js'


const CryptoTable = (props) => {

  const columns = [
    {
      title: 'Назва',
      dataIndex: 'symbol',
      width: '225px',
      render: (value, record) => (
        <div className="name-column">
          {value} <span className="name">{record.name}</span>
        </div>
      ),
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
    },
    {
      title: 'Ціна',
      dataIndex: 'priceUsd',
      width: '175px',
      render: (value, record) => (
        <>
          <div className={'price-usd-column ' + getColorForPriceChange(record.priceChangeStatus)}>
             {formatPriceShort(value)}
          </div>
        </>
      ),
      sorter: (a, b) => a.priceUsd - b.priceUsd,
    },
    {
      title: 'Зміни',
      dataIndex: 'changePercent24Hr',
      width: '175px',
      render: (value, record) => (
        <div className={'change-percent-column ' + getColorForPriceChange(record.changePercent24HrStatus)}>  
            {formatPercent(value)}
        </div>
      ),
      sorter: (a, b) => a.changePercent24Hr - b.changePercent24Hr,
    },
    {
      title: 'Об\'єм за 24г.',
      dataIndex: 'volumeUsd24Hr',
      width: '175px',
      render: (value) => (
        <div className='volume-usd-column'>
             {formatPriceShort(value)}
        </div>
      ),
      sorter: (a, b) => a.volumeUsd24Hr - b.volumeUsd24Hr,
    },
    {
      title: 'Ринкова капіталізація',
      dataIndex: 'marketCapUsd',
      width: '175px',
      render: (value) => (
        <>{value !== 0 ?
          <div className='market-cap-usd-column'>
            {Intl.NumberFormat('en-US', {
              notation: "compact",
              maximumFractionDigits: 2,
              style: 'currency', 
              currency: 'USD'
            }).format(value)}
          </div> : 
          <div style={{textAlign:"center"}}>-</div>
          }
        </>
      ),
      sorter: (a, b) => a.marketCapUsd - b.marketCapUsd,
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
      align: 'center'
    },
  ];

  const [searchValue, setSearchValue] = useState(null)
  const [filteredCryptosUsdt, setFilteredCryptosUsdt] = useState()

  useEffect(() => {
    searchValue 
      ? setFilteredCryptosUsdt(props.data?.filter(x => 
        x.symbol.toLowerCase().includes(searchValue.toLowerCase()) || x.name.toLowerCase().includes(searchValue.toLowerCase())
      ))
      : setFilteredCryptosUsdt(props.data)
  }, [searchValue, props])

  useEffect(() => {

  }, [props])

  return (
      <div className="crypto-table-body">
        <div className="crypto-table-wrapper">
          <Input className="search-box" onChange={(e) => setSearchValue(e.target.value)} size="large" placeholder="Введіть назву монети" prefix={<MonitorOutlined />} />
          <Table className='crypto-table' dataSource={filteredCryptosUsdt} columns={columns}/>
        </div>
      </div>
  );
}

export default CryptoTable;