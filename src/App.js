import Song from './components/Song';
import Player from './components/Player';
import data from './util';
import './styles/app.scss';

function App() {
  return (
    <div className="App">
      <Song  />
      <Player />
    </div>
  );
}

export default App;
