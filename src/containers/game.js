import React, { useState, useEffect } from 'react'
import Deck from '../components/deck'
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../actions'

function Game(){
  // const [gameStarted, setGameStarted] = useState(false)
  // const [discardPile, setDiscardPile] = useState([])
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const currentGame = useSelector(state => state.currentGame)
  const { username } = currentUser
  const { deckID, players, discardPile, isGameStarted } = currentGame

  const claimPile = () => {
    let temp = players
    temp[username] = temp[username].concat(discardPile)
    dispatch(allActions.gameActions.setPlayers(temp))
    dispatch(allActions.gameActions.setDiscardPile([]))
    console.log(players,username)
  }

  console.log(currentGame, "in game")
  return(
    <div className="game">
      <div className="lobbyCodeDiv">Lobby code: {deckID}</div>
      {isGameStarted ? <Deck /> : null }

      <button onClick={()=>claimPile()}>claim pile </button>
    </div>
  )
}

export default Game

// function shuffle(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;
//
//   while (0 !== currentIndex) {
//
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }
//   return array;
// }
