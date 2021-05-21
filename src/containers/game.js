import React, { Fragment, useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Deck from '../components/deck'
import Player from '../components/player'
import Card from '../components/card'

import { isSlappable } from '../helpers'
import allActions from '../actions'
import { setGameState, setCurrentPlayer } from '../actions/gameActions'

import cardback from '../cardback.png'

function Game(){
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const { username, isHost } = currentUser
  const currentGame = useSelector(state => state.currentGame)
  const { deckID, users, players, discardPile, currentPlayer, isGameStarted, roundWinner } = currentGame

  const [deck, setDeck] = useState([])
  const [winner, setWinner] = useState("")
  const [aceOrFace, setAceOrFace] = useState(false)
  const [slappable, setSlappable] = useState(false)

  useEffect(()=>{
    setSlappable(isSlappable(discardPile))
    console.log(isSlappable(discardPile), slappable, aceOrFace, winner, discardPile[discardPile.length-1], discardPile, currentPlayer, roundWinner)
  },[currentPlayer])

  const claimPile = () => {
    // if()
    let temp = players
    temp[username] = temp[username].concat(discardPile)
    dispatch(setGameState({players: temp, discardPile: [],roundWinner:""}))

    // dispatch(allActions.gameActions.setPlayers(temp))
    // dispatch(allActions.gameActions.setDiscardPile([]))
    console.log(players,username)
  }

  const drawCards = () =>{
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`)
      .then(data => data.json())
      .then(data => {
        setDeck(data.cards)
      })
    }

  const distributeCards = () => {

    let temp = Object.assign({}, players)
    let index = 0
    let cardsPerPlayer = Math.floor(52/users.length)
    let bonus = 52%users.length // extra cards players receive when deck doesnt divide evenly
    let dealTo = currentPlayer
    let numAdded
    let cards

    while( index < 52 ){
      let player = users[dealTo]
      numAdded = cardsPerPlayer + (bonus > 0)
      cards = deck.slice(index, index+numAdded)
      temp[player] = cards
      bonus -= 1
      dealTo += 1
      index+= numAdded
      if(dealTo == users.length) dealTo = 0
    }
    dispatch(setGameState({players: temp}))
  }

  const shuffleDeck = () =>{
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
      .then( data => data.json())
      .then( data =>{
        return drawCards()
      })
  }

  const resetHands = () =>{
    let hash = {}
    for(let i of users){
      hash[i] = []
    }
    dispatch(setGameState({players: hash}))
    setDeck([])
  }

  const playCard = (event) =>{
    setSlappable(false)
    setAceOrFace(false)

    let player = event.target.id
    // if(user == event.target.id && event.target.id == users[currentPlayer]){
    if(event.target.id == users[currentPlayer]){
      //takes the random card out of the players hand and puts it into the discard pile, then sets the players hands. AOF rules to determine next turn
      let index = Math.floor(Math.random()*players[player].length)
      let card = players[player][index]
      let cardCode = card.code
      let cardValue =  cardCode[0]
      let currentAOF = "JQKA".includes(cardValue)
      let temp = players
      let turn
      temp[username].splice(index,1)
      // dispatch(setGameState({discardPile: [...discardPile, card], players: temp }))
      // dispatch(allActions.gameActions.setDiscardPile([...discardPile, card]))
      // dispatch(allActions.gameActions.setPlayers(temp))

      // if the card just played is an AOF - go to next player
      if( currentAOF ){
        setAceOrFace(true)
        turn = currentPlayer+1 == users.length ? 0 : currentPlayer + 1
      }
      // if the previous card was not AOF and the current is not AOF - go to next player
      else if(!aceOrFace && !currentAOF){
        turn = currentPlayer+1 == users.length ? 0 : currentPlayer + 1
      }
      // if the previous card was AOF and the card just played is not AOF - the person that went before the current player is set to be the winner and then the winner is set to play again. They could also play a card again and risk losing the pile. If the pile is slappable, they could also lose said pile to the slapper
      else if(aceOrFace && !currentAOF){
        turn = currentPlayer - 1 < 0 ? users.length - 1 : currentPlayer - 1
        // setWinner(users[winner])
        return dispatch(setGameState({discardPile: [...discardPile, card], players: temp, currentPlayer: turn, roundWinner: users[winner] }))
      }
      return dispatch(setGameState({discardPile: [...discardPile, card], players: temp, currentPlayer: turn, roundWinner: "" }))
    }
  }

  const checkState = () =>{
    console.log(isSlappable(discardPile), slappable, aceOrFace, winner, discardPile[discardPile.length-1], discardPile, currentPlayer, roundWinner)
  }

  return(
    <div className="GameDiv">
      <div className="lobbyCodeDiv">Lobby code: {deckID}</div>

      <button className="gamebuttons" onClick={()=>claimPile()}>claim pile </button>
      {isHost ?
      <Fragment>
        <button className="gamebuttons" onClick={()=>{distributeCards()}}> distributeCards button </button>
        <button className="gamebuttons" onClick={()=>{shuffleDeck()}}> new deck/shuffle button </button>
        <button className="gamebuttons" onClick={()=>{resetHands()}}> reset button </button>
        <button className="gamebuttons" onClick={()=>{checkState()}}> check state button </button>
      </Fragment>
      :
      null}
      <div className="game">
        <div className="table">
          <div className="players">
            {users.map((player,index) => <Player index={index} player={player} deckID={deckID} playersCards={players[player]} playCard={playCard}/>)}
          </div>
          <div className="card-place">
            {discardPile.length > 3 ?
              discardPile.slice(discardPile.length-4,discardPile.length).map((card,index)=> <Card className="card" index={index} src={card ? card.image: cardback}/> )
            :
              [...new Array(4 - discardPile.length), ...discardPile].map((card,index)=> <Card className="card" index={index} src={card ? card.image: cardback}/>)
            }
            <div className="card-count">{discardPile.length}</div>
          </div>
        </div>
      </div>
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
