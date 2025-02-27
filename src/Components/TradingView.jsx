// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

import '../Styles/TradingView.css'

let tvScriptLoadingPromise;

export default function TradingView(props) {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_3a54d') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BINANCE:" + props.symbol,
            interval: "D",
            timezone: "Europe/Riga",
            theme: "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            hide_legend: true,
            withdateranges: true,
            hide_side_toolbar: false,
            container_id: "tradingview_3a54d"
          });
        }
      }
    },
    []
  );

  return (
    <div className='trading-view-body'>
      <div id='tradingview_3a54d' style={{height: "100%"}}/>
    </div>
  );
}
