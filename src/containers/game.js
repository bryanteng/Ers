import React, { useState, useEffect } from 'react'
import Deck from '../components/deck'

function Game({deckID, order, players, setPlayers, user}){

  const [gameStarted, setGameStarted] = useState(false)
  const [discardPile, setDiscardPile] = useState([])

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

  const claimPile = () => {
    let temp = players
    temp[user] = temp[user].concat(discardPile)
    setPlayers(temp)
    setDiscardPile([])
    console.log(players,user)
  }

  return(
    <div className="game">
      <div className="lobbyCodeDiv">Lobby code: {deckID}</div>
      {order.length > 0 ? <Deck order={order} deckID={deckID} players={players} setPlayers={setPlayers} discardPile={discardPile} setDiscardPile={setDiscardPile} user={user}/>
    : null }

    <button onClick={()=>claimPile()}>claim pile </button>
    </div>
  )
}

export default Game
