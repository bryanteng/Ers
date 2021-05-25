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
  const { deckID, users, players, discardPile, currentPlayer, aceOrFace, slappable, isGameStarted, roundWinner, penaltyPile } = currentGame

  const [winner, setWinner] = useState("")
  // const [aceOrFace, setAceOrFace] = useState(false)
  // const [slappable, setSlappable] = useState("")

  useEffect(()=>{
    console.log(penaltyPile)
    // setSlappable(isSlappable(discardPile))
    // console.log(isSlappable(discardPile), slappable, aceOrFace, roundWinner, discardPile[discardPile.length-1], discardPile, currentPlayer, roundWinner)
  },[players])

  const claimPile = () => {
    if(slappable != "" || roundWinner == username){
      let temp = players
      temp[username] = temp[username].concat(discardPile).concat(penaltyPile)
      dispatch(setGameState({players: temp, discardPile: [], penaltyPile: [], roundWinner:""}))
    } else{
      //user slapped the pile when it was not slappable, grab a random card and add it to the penalty cards pile
      let index = Math.floor(Math.random()*players[username].length) // random card index in players hand
      let card = players[username][index] //random card picked
      let temp = players // copies the players object from state
      temp[username].splice(index,1) //takes the card out of the players hand

      // CHANGE THE USER'S PILE AND ADDS THE CARD TO THE PENALTY PILE
      let pile = [...penaltyPile, card]
      dispatch(setGameState({players: temp, penaltyPile: pile}))
    }


    // dispatch(allActions.gameActions.setPlayers(temp))
    // dispatch(allActions.gameActions.setDiscardPile([]))
  }

  const drawCards = () =>{
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`)
      .then(data => data.json())
      .then(data => {
        distributeCards(data.cards)
      })
    }

  const distributeCards = (deck) => {

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
  }

  const playCard = (event) =>{

    let player = event.target.id
    if(username == event.target.id && event.target.id == users[currentPlayer]){
    // if(event.target.id == users[currentPlayer]){
      //takes the random card out of the players hand and puts it into the discard pile, then sets the players hands. AOF rules to determine next turn
      let index = Math.floor(Math.random()*players[player].length) // random card index in players hand
      let card = players[player][index] //random card picked
      let cardCode = card.code // the random card's code
      let cardValue =  cardCode[0] // the random card's value
      let currentAOF = "JQKA".includes(cardValue) // checks to see if card is an Ace or Face card
      let temp = players // copies the players object from state
      temp[username].splice(index,1) //takes the card out of the players hand

      let pile = [...discardPile, card] // adds the card to the discard pile
      let slappableState = isSlappable(pile) // sets the slappable state
      let turn // this is determined by the AOF logic below; normally it just goes to next player

      // if the card just played is an AOF - go to next player
      if( currentAOF ){
        turn = currentPlayer+1 == users.length ? 0 : currentPlayer + 1
      }
      // if the previous card was not AOF and the current is not AOF - go to next player
      else if(!aceOrFace && !currentAOF){
        turn = currentPlayer+1 == users.length ? 0 : currentPlayer + 1
      }
      // if the previous card was AOF and the card just played is not AOF - the person that went before the current player is the round winner and then the winner is set to play again (currentPlayer value). They could also play a card again and risk losing the pile. If the pile is slappable, they could also lose said pile to the slapper
      else if(aceOrFace && !currentAOF){
        turn = currentPlayer - 1 < 0 ? users.length - 1 : currentPlayer - 1

        return dispatch(setGameState({discardPile: pile, players: temp, currentPlayer: turn, roundWinner: users[turn], aceOrFace: currentAOF, slappable: slappableState}))
      }
      return dispatch(setGameState({discardPile: pile, players: temp, currentPlayer: turn, roundWinner: "", aceOrFace: currentAOF, slappable: slappableState }))
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
        <button className="gamebuttons" onClick={()=>{shuffleDeck()}}> start new game </button>
        <button className="gamebuttons" onClick={()=>{resetHands()}}> reset hands </button>
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
// <button className="gamebuttons" onClick={()=>{distributeCards()}}> distribute cards </button>

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
