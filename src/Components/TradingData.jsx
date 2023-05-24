import React from 'react';
import '../Styles/TradingData.css'
import { Row, Col } from 'antd'
import PriceChangeDistribution from '../Components/PriceChangeDistribution'

function TradingData(props) {
    return (
        <div class="trading-data-body">
            <Row>
                <Col span={16}>
                    <div class="header">Розподіл зміни ціни</div>
                    <PriceChangeDistribution data={props.data}/>
                </Col>
                <Col span={8}>
                </Col>
            </Row>
        </div>
    );
}

export default TradingData;