import './App.css';
import Rules from './containers/rules'
import Deck from './components/deck'
import Game from './containers/game'
import NewPlayerInput from './components/newPlayerInput'

function App() {
  return (
    <div className="App">
      hi
      <Deck />
      <Rules />
      <NewPlayerInput />
      <Game />

    </div>
  );
}

export default App;
