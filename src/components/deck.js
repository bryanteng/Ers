import React, { useState, useEffect } from 'react'
import Player from './player'
import { isSlappable } from '../helpers'

function Deck({order, deckID, players, setPlayers, discardPile, setDiscardPile, user}){
  const [deck, setDeck] = useState([])
  const [extra, setExtra] = useState(52%order.length)
  const [currentPlayer, setCurrentPlayer] = useState(0)
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

  const distributeCards = () =>{

    let temp = Object.assign({}, players)
    let index = 0
    let cardsPerPlayer = Math.floor(52/order.length)
    let bonus = extra
    let dealTo = currentPlayer
    let numAdded
    let promises = []
    let cards

    while( index < 52 ){
      let player = order[dealTo]
      numAdded = cardsPerPlayer + (bonus > 0)
      cards = deck.slice(index, index+numAdded)
      temp[player] = cards
      bonus -= 1
      dealTo += 1
      index+= numAdded
      if(dealTo == order.length) dealTo = 0
    }
    setPlayers(temp)
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
    for(let i of order){
      hash[i] = []
    }
    setPlayers(hash)
    setDeck([])
  }

  const playCard = (event) =>{
    setSlappable(false)
    setWinner("")
    setAceOrFace(false)

    let player = event.target.id
    // if(user == event.target.id && event.target.id == order[currentPlayer]){

    if(event.target.id == order[currentPlayer]){
      let index = Math.floor(Math.random()*players[player].length)
      let card = players[player][index]
      let cardCode = card.code
      let cardValue =  cardCode[0]
      let currentAOF = "JQKA".includes(cardValue)
      let temp = players
      temp[user].splice(index,1)
      //takes the random card out of the players hand and puts it into the discard pile, then sets the players hands.
      setDiscardPile([...discardPile, card])
      setPlayers(temp)

      // if the card just played is an AOF - go to next player
      if( currentAOF ){
        setCurrentPlayer(currentPlayer+1 == order.length ? 0 : currentPlayer + 1)
      }
      // if the previous card was not AOF and the current is not AOF - go to next player
      else if(!aceOrFace && !currentAOF){
        setCurrentPlayer(currentPlayer+1 == order.length ? 0 : currentPlayer + 1)

      }
      // if the previous card was AOF and the card just played is not AOF - the person that went before the current player is set to be the winner and then the winner is set to play again. They could also play a card again and risk losing the pile. If the pile is slappable, they could also lose said pile to the slapper
      else if(aceOrFace && !currentAOF){
        let winner = currentPlayer - 1 < 0 ? order.length - 1 : currentPlayer - 1
        setWinner(order[winner])
        setCurrentPlayer(winner)
      }

      if(currentAOF){
        setAceOrFace(true)
        setCurrentPlayer(currentPlayer+1 == order.length ? 0 : currentPlayer + 1)
      }

      // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/discard/add/?cards=${cardCode}`)
      // .then(data => data.json())
      // .then(data=>{
      //
      // })
    }
  }

  const checkState = () =>{
    console.log(isSlappable(discardPile), slappable, aceOrFace, winner, discardPile[discardPile.length-1], discardPile, currentPlayer)
  }

  return(
    <div>
    <button onClick={()=>{distributeCards()}}> distributeCards button </button>
    <button onClick={()=>{shuffleDeck()}}> new deck/shuffle button </button>
    <button onClick={()=>{resetHands()}}> reset button </button>
    <button onClick={()=>{checkState()}}> check state button </button>

    {order.map(player => <Player player={player} deckID={deckID} playersCards={players[player]} playCard={playCard}/>)}

    </div>
  )
}

export default Deck
// <button onClick={()=>{getCards()}}> getCards button </button>
// <button onClick={()=>{pileCheck()}}> pileCheck button </button>
// <button onClick={()=>{drawCards()}}> draw button </button>

// useEffect(()=>{
//   console.log(players, order)
//   if(order.length > 0 && players[order[0]].length != 0 ){
//     let aPlayer = order[0]
//     let cards = players[aPlayer].map(x=> x.code)
//     pileCheck(deckID, order, players[aPlayer], cards )
//   }
//
// },[players])
//
// const pileCheck = (deckID, order, aPlayer, cards) =>{
//   let pilesMade
//   return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${aPlayer}/list/`)
//   .then(data => data.json())
//   .then(data => {
//     pilesMade = data.piles
//     for(let player of order){
//       if(!pilesMade[player] || !pilesMade[player]["remaining"]){
//         getCards(getCardsUrlMaker(player, deckID, cards))
//         pileCheck(deckID, order, aPlayer, cards)
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
