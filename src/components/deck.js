import React, { useState, useEffect } from 'react'

function Deck(){

  const [deck, setDeck] = useState(["AC", "AD", "AH", "AS", "2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "0C", "0D", "0H", "0S", "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS"])
  const [deckID, setDeckID] = useState("05win676scin")
  const [players, setPlayers] = useState({"me": 0, "you": 0, "him": 0})
  const [order, setOrder] = useState(["me", "you", "him"])
  const [extra, setExtra] = useState(52%order.length)
  const [currentPlayer, setCurrentPlayer] = useState(0)

  useEffect(()=>{
    console.log(players, "players now")
  },[players])


  const distributeCards = () =>{
    const shuffledDeck = shuffle(deck)
    console.log(shuffledDeck)

    let temp = Object.assign({}, players)
    let index = 0
    let cardsPerPlayer = Math.floor(52/order.length)
    let bonus = extra
    let dealTo = currentPlayer

    while( index < 52 ){
      let player = order[dealTo]
        console.log(index,"current index", player, temp)
        if(bonus > 0){
          temp[player] = cardsPerPlayer + 1
          console.log(shuffledDeck.slice(index, index+cardsPerPlayer+1))
          index+= cardsPerPlayer+1
        }
        else{
          temp[player] = cardsPerPlayer
          console.log(player, temp[player], bonus)
          console.log(shuffledDeck.slice(index, index+cardsPerPlayer))
          index+= cardsPerPlayer
        }
       bonus -= 1
       dealTo += 1
       if(dealTo == order.length) dealTo = 0
    }
    setPlayers(temp)
  }

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

  const getCards = () =>{
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`)
      .then(data => data.json())
      .then(data => {
        console.log(data)
        console.log(data.cards.map(x=> x.code))
      })

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
