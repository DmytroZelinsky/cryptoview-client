import React, { useEffect, useState } from 'react';
import { Table } from 'antd'
import '../Styles/AbnormalCryptos.css'
import axios from 'axios'
import { getColorForPriceChange, formatPercent } from '../Helpers/priceHelper.js'

function AbnormalCryptos(props) {

    const [abnormalCryptos, setAbnormanlCryptos] = useState([])

    const columns = [
        {
            title: 'Назва',
            dataIndex: 'symbol',
            render: (value, record) => (
              <div className="name-column">
                {value} <span className="name"></span>
              </div>
            ),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            render: (value, record) => (
              <div className="name-column">
                {value} <span className="name"></span>
              </div>
            ),
        },
        {
          title: 'Зміна',
          dataIndex: 'value',
          render: (value, record) => (
            <div className={getColorForPriceChange(record.colorStatus)}>
              {value}
            </div>
          ),
          align: 'right'
      },
    ]

    const getRepresintationalAbnormalCrypto = (abnormalCrypto) => {
      switch (abnormalCrypto.noticeType) {
        case 'BLOCK_TRADE': 
          switch (abnormalCrypto.eventType) {
            case 'BLOCK_TRADES_BUY': return [abnormalCrypto.volume + ' ' + abnormalCrypto.baseAsset, 'Велика купівля', 1]
            case 'BLOCK_TRADES_SELL': return [abnormalCrypto.volume + ' ' + abnormalCrypto.baseAsset, 'Великий продаж', -1]
          }
        case 'PRICE_BREAKTHROUGH':
          switch (abnormalCrypto.eventType) {
            case 'UP_BREAKTHROUGH':
              switch (abnormalCrypto.period) {
                case 'DAY_1': return [formatPercent(abnormalCrypto.priceChange * 100), 'Новий макс. за 24год.', 1]
                case 'WEEK_1': return [formatPercent(abnormalCrypto.priceChange * 100), 'Новий макс. за 7дн.', 1]
                case 'MONTH_1': return [formatPercent(abnormalCrypto.priceChange * 100), 'Новий макс. за 30дн.', 1]
              }
            case 'DOWN_BREAKTHROUGH':
              switch (abnormalCrypto.period) {
                case 'DAY_1': return [formatPercent(abnormalCrypto.priceChange * 100), 'Новий мін. за 24год.', -1]
                case 'WEEK_1': return [formatPercent(abnormalCrypto.priceChange * 100), 'Новий мін. за 7дн.', -1]
                case 'MONTH_1': return [formatPercent(abnormalCrypto.priceChange * 100), 'Новий мін. за 30дн.', -1]
              }
          }
        case 'PRICE_CHANGE':
          switch (abnormalCrypto.eventType) {
            case 'UP_1':
              switch (abnormalCrypto.period) {
                case 'MINUTE_5': return [formatPercent(abnormalCrypto.priceChange * 100), 'Невеликий ріст за 5хв.', 1]
                case 'HOUR_2': return [formatPercent(abnormalCrypto.priceChange * 100), 'Невеликий ріст за 2год.', 1]
            }
            case 'UP_2':
              switch (abnormalCrypto.period) {
                case 'MINUTE_5': return [formatPercent(abnormalCrypto.priceChange * 100), 'Середній ріст за 5хв.', 1]
                case 'HOUR_2': return [formatPercent(abnormalCrypto.priceChange * 100), 'Середній ріст за 2год.', 1]
            }
            case 'UP_3':
              switch (abnormalCrypto.period) {
                case 'MINUTE_5': return [formatPercent(abnormalCrypto.priceChange * 100), 'Великий ріст за 5хв.', 1]
                case 'HOUR_2': return [formatPercent(abnormalCrypto.priceChange * 100), 'Великий ріст за 2год.', 1]
            }
            case 'DOWN_1':
              switch (abnormalCrypto.period) {
                case 'MINUTE_5': return [formatPercent(abnormalCrypto.priceChange * 100), 'Невелике падіння за 5хв.', -1]
                case 'HOUR_2': return [formatPercent(abnormalCrypto.priceChange * 100), 'Невелике падіння за 2год.', -1]
            }
            case 'DOWN_2':
              switch (abnormalCrypto.period) {
                case 'MINUTE_5': return [formatPercent(abnormalCrypto.priceChange * 100), 'Середнє падіння за 5хв.', -1]
                case 'HOUR_2': return [formatPercent(abnormalCrypto.priceChange * 100), 'Середнє падіння за 2год.', -1]
            }
            case 'DOWN_3':
              switch (abnormalCrypto.period) {
                case 'MINUTE_5': return [formatPercent(abnormalCrypto.priceChange * 100), 'Велике падіння за 5хв.', -1]
                case 'HOUR_2': return [formatPercent(abnormalCrypto.priceChange * 100), 'Велике падіння за 2год.', -1]
            }
          }
        case 'PRICE_FLUCTUATION':
          switch (abnormalCrypto.eventType) {
            case 'RISE_AGAIN' : return [formatPercent(abnormalCrypto.priceChange * 100), 'Раллі', 1]
            case 'DROP_BACK' : return [formatPercent(abnormalCrypto.priceChange * 100), 'Корекція', -1]
          }
        default: return [0, 'Зроби цю штуку ' + abnormalCrypto.eventType]
      }
    }

    const getAbnormalCryptos = () => {
      axios.get('https://www.binance.com/bapi/composite/v1/public/marketing/indicator/abnormal-trading-notice/pageList?pageSize=10')
        .then(response => {
          setAbnormanlCryptos(response?.data.data.map(x => {
            let [value, text, colorStatus] = getRepresintationalAbnormalCrypto(x)
            return {
              symbol: x.baseAsset + '/' + x.quotaAsset,
              status: text,
              value: value,
              colorStatus: colorStatus
            }
          }))
        })
    }

    useEffect(() => {
      getAbnormalCryptos()
    }, [])

    return (
        <div className="abnormal-cryptos-body">
            <div class="header">Найбільш волитальні криптовалюти</div>
            <Table dataSource={abnormalCryptos} columns={columns} pagination={{position: ['none', 'none']}} />
        </div>
    );
}

export default AbnormalCryptos;