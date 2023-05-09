import './App.css';
import MarketsOverview from './Pages/MarketsOverview';
import { Routes, Route, Link } from 'react-router-dom';
import Trade from './Pages/Trade';

function App() {
  return (
    <>
      <Link to='/marketsoverview'>To marketsoverview</Link>
      <br></br>
      <Link to='/trade/btc_usdt'>To Trade</Link>
      <br></br>
      <Link to='/'>To home</Link>
      <Routes>
        <Route path="/" element={<div>Home</div>}/>
        <Route path="/marketsoverview" element={<MarketsOverview/>}/>
        <Route path="/trade/:symbol" element={<Trade/>}/>
        <Route path="*" element={<div>NOT FOUND</div>}/>
      </Routes>
    </>
  );
}

export default App;
