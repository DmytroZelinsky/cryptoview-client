import React, { useState, useEffect } from 'react';
import { Input, Col, Row } from 'antd'
import '../Styles/PriceCalculator.css'
import { formatPrice } from '../Helpers/priceHelper.js'


function PriceCalculator(props) {

    const [qty, setQty] = useState('1')

    const handleChange = (e) => {
        const { value: inputValue } = e.target;
        const reg = /^\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '') {
            setQty(inputValue);
        }
    };

    const handleBlur = () => {
        let valueTemp = qty;
        if (qty?.charAt(qty.length - 1) === '.') {
            valueTemp = qty.slice(0, -1);
        }
        setQty(valueTemp.replace(/0*(\d+)/, '$1'));
    };

    return (
        <div className="price-calculator-body">
            <div className="header">{props.baseName} калькулятор</div>
            <Input
                value={qty}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0.00"
                suffix={
                    <div className="suffix">{props.baseName.toUpperCase()}</div>
                }
                maxLength={10}
            />
            <div className="calulations">
                <Row>
                    <Col className="qty"span={10}>{qty} {props.baseName} = </Col>
                    <Col span={14} className="total">{'USD ' + (qty && props.crypto ? formatPrice(qty * props.crypto?.c) : '$ 0.00')}</Col>
                </Row>
            </div>

        </div>
    );
}

export default PriceCalculator;