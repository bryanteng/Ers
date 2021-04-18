import React, { useState, useEffect } from 'react'
import Player from './player'
import { isSlappable } from '../helpers'
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../actions'
import { setGameState, setCurrentPlayer } from '../actions/gameActions'

function Deck(){
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const { username } = currentUser
  const currentGame = useSelector(state => state.currentGame)
  const { deckID, users, players, discardPile, currentPlayer, isGameStarted } = currentGame
  // const [extra, setExtra] = useState(52%users.length)
  // const [currentPlayer, setCurrentPlayer] = useState(0)
  const [deck, setDeck] = useState([])
  const [winner, setWinner] = useState("")
  const [aceOrFace, setAceOrFace] = useState(false)
  const [slappable, setSlappable] = useState(false)


  useEffect(()=>{
    setSlappable(isSlappable(discardPile))
    console.log(isSlappable(discardPile), slappable, aceOrFace, winner, discardPile[discardPile.length-1], discardPile, currentPlayer)
  },[currentPlayer])

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
    console.log(isSlappable(discardPile), slappable, aceOrFace, winner, discardPile[discardPile.length-1], discardPile, currentPlayer)
  }

  return(
    <div className="deck">
    <button className="gamebuttons" onClick={()=>{distributeCards()}}> distributeCards button </button>
    <button className="gamebuttons" onClick={()=>{shuffleDeck()}}> new deck/shuffle button </button>
    <button className="gamebuttons" onClick={()=>{resetHands()}}> reset button </button>
    <button className="gamebuttons" onClick={()=>{checkState()}}> check state button </button>

    {users.map(player => <Player player={player} deckID={deckID} playersCards={players[player]} playCard={playCard}/>)}

    </div>
  )
}

export default Deck

// <button onClick={()=>{getCards()}}> getCards button </button>
// <button onClick={()=>{pileCheck()}}> pileCheck button </button>
// <button onClick={()=>{drawCards()}}> draw button </button>

// useEffect(()=>{
//   console.log(players, users)
//   if(users.length > 0 && players[users[0]].length != 0 ){
//     let aPlayer = users[0]
//     let cards = players[aPlayer].map(x=> x.code)
//     pileCheck(deckID, users, players[aPlayer], cards )
//   }
//
// },[players])
//
// const pileCheck = (deckID, users, aPlayer, cards) =>{
//   let pilesMade
//   return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${aPlayer}/list/`)
//   .then(data => data.json())
//   .then(data => {
//     pilesMade = data.piles
//     for(let player of users){
//       if(!pilesMade[player] || !pilesMade[player]["remaining"]){
//         getCards(getCardsUrlMaker(player, deckID, cards))
//         pileCheck(deckID, users, aPlayer, cards)
//       }
//     }
//   })
// }
//
// const getCards = async ( url ) =>{
//     return await fetch(url)
// }
//
// const getCardsUrlMaker = ( player, deckID, cards ) => {
//   return `https://deckofcardsapi.com/api/deck/${deckID}/pile/${player}/add/?cards=${cards}`
// }
