import React, { useState, useEffect } from 'react'
// import { pileCheck, getCards, getCardsUrlMaker } from '../helpers'

function Player({player, deckID, playersCards, playCard}){

  const [ hand, setHand ] = useState([])

  useEffect(()=>{
    setHand(playersCards)
    // getCards(player, deckID)
    if(playersCards.length > 0){
      let cards = playersCards.map(x=> x.code).join()
      pileCheck(deckID, player, cards)
    }

  },[playersCards])


  const pileCheck = (deckID, aPlayer, cardsString) =>{
    let pilesMade
    return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${aPlayer}/list/`)
    .then(data => data.json())
    .then(data => {
      pilesMade = data.piles
        if(!pilesMade[aPlayer] || !pilesMade[aPlayer]["remaining"]){
          getCards(aPlayer, deckID, cardsString)
          pileCheck(deckID, aPlayer, cardsString)
      }
    })
  }

  const getCards = async ( player, deckID, cardsString ) =>{
    return await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${player}/add/?cards=${cardsString}`)
  }

  return(
    <div className="player">
      {hand.length == 0 ? <div>{player}, no cards left</div> :
        <div>
        {player}, hand:{hand[0].code}
        <img src={hand[0].image} id={player} onClick={(event)=>playCard(event)}alt="new" />
        </div>
      }
    </div>
  )
}

export default Player
Player.defaultProps = {
  playersCards: []
}

// const pileCheck = (deckID, order, player, cards) =>{
// const getCards = async ( url ) =>{
// const getCardsUrlMaker = ( player, deckID, cards ) => {
