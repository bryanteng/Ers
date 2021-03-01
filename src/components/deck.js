import React, { useState, useEffect } from 'react'
import Player from './player'
// import { pileCheck, getCards, getCardsUrlMaker } from '../helpers'

function Deck(props){
  const deckID = props.deckID
  const order = props.order
  const [deck, setDeck] = useState([])
  const [players, setPlayers] = useState({"me": "", "you": "", "him": "", "they": "", "their": "", "them": ""})
  const [extra, setExtra] = useState(52%order.length)
  const [currentPlayer, setCurrentPlayer] = useState(0)

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

  const resetHand = () =>{
    let hash = {}
    for(let i of order){
      hash[i] = ""
    }
    setPlayers(hash)
    setDeck([])
  }

  return(
    <div>
    <button onClick={()=>{distributeCards()}}> distributeCards button </button>
    <button onClick={()=>{shuffleDeck()}}> new deck/shuffle button </button>
    <button onClick={()=>{resetHand()}}> reset button </button>

    {players[order[0]].length == 0 ? null : order.map(player => <Player player={player} deckID={deckID} hand={players[player]}/>)}

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
