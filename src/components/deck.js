import React, { useState } from 'react'

function Deck(){

  const [deck, setDeck] = useState({})
  const [deckID, setDeckID] = useState("05win676scin")
  const [players, setPlayers] = useState(["me","you","him",])
  const [extra, setExtra] = useState(52%players.length)
  const [currentPlayer, setCurrentPlayer] = useState(0)


  const distributeCards = () =>{
    let cardsPerPlayer = Math.floor(52/players.length)
    let bonus = extra
    for(let player of players){
      if(bonus > 0) console.log(player, cardsPerPlayer + 1, bonus)
      else  console.log(player, cardsPerPlayer, bonus)
       bonus -= 1
    }
  }

  const getCards = () =>{
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=18`)
      .then(data => data.json())
      .then(data => console.log(data))

  }

  const shuffleDeck = () =>{
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
      .then(data=> data.json())
      .then(data => console.log(data))

  }


  return(
    <div>
    <button onClick={()=>{distributeCards()}}> distributeCards buttons </button>
    <button onClick={()=>{getCards()}}> getCards buttons </button>
    <button onClick={()=>{shuffleDeck()}}> shuffleDeck buttons </button>
      Deck
    </div>
  )
}

export default Deck
