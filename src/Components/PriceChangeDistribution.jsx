import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';

function PriceChangeDistribution(props) {

  const [chartData, setChartData] = useState([
    {
      type: '>10%',
      value: 0
    },
    {
      type: '7 to 10%',
      value: 0
    },
    {
      type: '5 to 7%',
      value: 0
    },
    {
      type: '3 to 5%',
      value: 0
    },
    {
      type: '0 to 3%',
      value: 0
    },
    {
      type: '0 to -3%',
      value: 0
    },
    {
      type: '-3 to -5%',
      value: 0
    },
    {
      type: '-5 to -7%',
      value: 0
    },
    {
      type: '-7 to -10%',
      value: 0
    },
    {
      type: '>-10%',
      value: 0
    }
  ])

    const getPriceChangeDistribution = () => {        
      const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});
      let groupedCryptoUsdt = groupBy(props.data, v => 
        {
          if (+v.changePercent24Hr > 10) {
            return '>10%'
          } else if (+v.changePercent24Hr > 7 && +v.changePercent24Hr <= 10) {
            return '7 to 10%'
          } else if (+v.changePercent24Hr > 5 && +v.changePercent24Hr <= 7) {
            return '5 to 7%'
          } else if (+v.changePercent24Hr > 3 && +v.changePercent24Hr <= 5) {
            return '3 to 5%'
          } else if (+v.changePercent24Hr > 0 && +v.changePercent24Hr <= 3) {
            return '0 to 3%'
          } else if (+v.changePercent24Hr > -3 && +v.changePercent24Hr <= 0) {
            return '0 to -3%'
          } else if (+v.changePercent24Hr > -5 && +v.changePercent24Hr <= -3) {
            return '-3 to -5%'
          } else if (+v.changePercent24Hr > -7 && +v.changePercent24Hr <= -5) {
            return '-5 to -7%'
          } else if (+v.changePercent24Hr > -10 && +v.changePercent24Hr <= -7) {
            return '-7 to -10%'
          } else if (+v.changePercent24Hr <= -10) {
            return '>-10%'
          }
        })

        let newChartData = [...chartData]

        Object.keys(groupedCryptoUsdt).forEach(function(key, index) {
          newChartData.filter(x => x.type === key)[0].value = groupedCryptoUsdt[key].length
        });

        setChartData(newChartData)
      }

    useEffect(() => {
      getPriceChangeDistribution();
    }, [props])
    
    const paletteSemanticRed = '#F4664A';
    const brandColor = '#5B8FF9';
    const config = {
      data: chartData,
      xField: 'type',
      yField: 'value',
      seriesField: '',
      color: ({ type }) => {
        if (type === '0 to -3%' || type === '-3 to -5%' || type === '-5 to -7%' || type === '-7 to -10%' || type === '>-10%') {
          return paletteSemanticRed;
        }
  
        return brandColor;
      },
      legend: false,
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      animation: false,
      tooltip: false,
      label: true
    };

    return (
        <div>
            <Column {...config}/>
        </div>
    );
}

export default PriceChangeDistribution;