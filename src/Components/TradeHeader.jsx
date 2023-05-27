import React from 'react';
import { getColorForPriceChange, formatPriceShort, formatPercent, formatNumber } from '../Helpers/priceHelper'

import { Row, Col } from 'antd'
import '../Styles/TradeHeader.css'

function TradeHeader(props) {
    return (
        <Row className="trade-header-body">
            <div className="symbol">
                {props.symbolName}
            </div>
            <Col>
                <Row gutter={24}>
                    <Col className={"col price " + getColorForPriceChange(props.crypto?.priceStatus)}>
                        {formatNumber(props.crypto?.c)}
                    </Col>
                    <Col className="col price-change-col">
                        <Row>
                            Зміна за 24г
                        </Row>
                        <Row gutter={8}>
                            <Col className={getColorForPriceChange(props.crypto?.priceChangeStatus)}>{formatNumber(props.crypto?.p)}</Col>
                            <Col className={getColorForPriceChange(props.crypto?.priceChangeStatus)}>{formatPercent(props.crypto?.P)}</Col>
                        </Row>
                    </Col>
                    <Col className="col">
                        <Row>
                            24г Макс
                        </Row>
                        <Row>
                            <Col>{formatNumber(props.crypto?.h)}</Col>
                        </Row>
                    </Col>
                    <Col className="col">
                        <Row>
                            24г Мін
                        </Row>
                        <Row>
                            <Col>{formatNumber(props.crypto?.l)}</Col>
                        </Row>
                    </Col>
                    <Col className="col">
                        <Row>
                            {"Об'єм за 24г (" + props.baseName.toUpperCase() + ")"}
                        </Row>
                        <Row>
                            {formatNumber(props.crypto?.v)}
                        </Row>
                    </Col>
                    <Col className="col">
                        <Row>
                            {"Об'єм за 24г (" + props.quoteName.toUpperCase() + ")"}
                        </Row>
                        <Row>
                            {formatNumber(props.crypto?.q)}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default TradeHeader;