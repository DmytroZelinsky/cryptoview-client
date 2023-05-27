import './App.css';
import MarketsOverview from './Pages/MarketsOverview';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Trade from './Pages/Trade';
import {Menu} from 'antd'
import { BarChartOutlined,  HomeOutlined } from '@ant-design/icons'


function App() {

  let naviage = useNavigate();

  return (
    <div className="app-body">
      <Menu className="header" mode="horizontal" defaultSelectedKeys={['home']} inlineIndent={100}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Головна
        </Menu.Item>
        <Menu.Item key="mail" icon={<BarChartOutlined />} onClick={() => naviage('/marketsoverview')}>
          Огляд ринків
        </Menu.Item>
      </Menu>
      {/* <Link to='/'>To home</Link> */}
      <Routes>
        <Route path="/" element={<div>Home</div>}/>
        <Route path="/marketsoverview" element={<MarketsOverview/>}/>
        <Route path="/trade/:symbol/:id" element={<Trade/>}/>
        <Route path="*" element={<div>NOT FOUND</div>}/>
      </Routes>
    </div>
  );
}

export default App;
