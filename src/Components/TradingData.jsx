import React from 'react';
import '../Styles/TradingData.css'
import { Row, Col } from 'antd'
import PriceChangeDistribution from '../Components/PriceChangeDistribution'
import AbnormalCryptos from '../Components/AbnormalCryptos'

function TradingData(props) {
    return (
        <div class="trading-data-body">
            <Row>
                <Col span={14}>
                    <div class="header">Розподіл зміни ціни</div>
                    <PriceChangeDistribution data={props.data}/>
                </Col>
                <Col span={10}>
                    <AbnormalCryptos/>
                </Col>
            </Row>
        </div>
    );
}

export default TradingData;