import './App.css';
import TopCryptoHeader from './Components/TopCryptoHeader';
import MarketsOverview from './Pages/MarketsOverview';

// var ws = new WebSocket("wss://stream.binance.com/stream");

function App() {


  return (
    <MarketsOverview/>
  );
}

export default App;
