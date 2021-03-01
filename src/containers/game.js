import React, { useState } from 'react'
import Deck from '../components/deck'

function Game(){

  const [order, setOrder] = useState(["me", "you", "him", "they", "their", "them"])
  const [gameStarted, setGameStarted] = useState(false)
  const [deckID, setDeckID] = useState("05win676scin")



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
    <div>
      <div>Game</div>
      <Deck order={order} deckID={deckID}/>
    </div>
  )
}

export default Game
