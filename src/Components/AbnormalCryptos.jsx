import React from 'react';
import { Table } from 'antd'

function AbnormalCryptos(props) {
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
          dataIndex: 'change',
          render: (value, record) => (
            <div className="name-column">
              {value} <span className="name"></span>
            </div>
          ),
      },
    ]

    return (
        <div>
            <Table dataSource={[]}/>
        </div>
    );
}

export default AbnormalCryptos;