import React, { useEffect } from 'react';
import { Line } from '@ant-design/plots';
import '../Styles/ForecastPrices.css'

function ForecastPrices(props) {

    const config = {
        data: props.data,
        padding: 'auto',
        xField: 'date',
        yField: 'priceUsd',
        point: { size: 5, shape: 'diamon' },
        color: 'blue',
        animation: false,
      };
    
    return (
        <div class="forecast-prices-body">
            <div class="header"> Прогноз цін на 7 днів вперед </div>
            <Line {...config} />
        </div>
    );
}

export default ForecastPrices;