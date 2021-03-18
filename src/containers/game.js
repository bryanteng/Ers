import React, { useState } from 'react'
import Deck from '../components/deck'

function Game({deckID, order}){

  const [gameStarted, setGameStarted] = useState(false)

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  return(
    <div className="game">
      <div className="lobbyCodeDiv">Lobby code: {deckID}</div>
      <Deck order={order} deckID={deckID}/>
    </div>
  )
}

export default Game
