import React, { Fragment, useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

// import { pileCheck, getCards, getCardsUrlMaker } from '../helpers'

function Player({index, player, deckID, playersCards, playCard}){

  const [ hand, setHand ] = useState([])
  const currentGame = useSelector(state => state.currentGame)
  const { currentPlayer } = currentGame

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
    <Fragment>
      <div className={`player player-${index+1}${index==currentPlayer? ' playing' : ''}`}>
      <div className="avatar" id={player} onClick={(event)=>playCard(event)} style={{backgroundColor:`#${Math.floor(Math.random()*16777215).toString(16)}`}}> </div>
      <div className="name">{player} </div>
      {hand.length == 0 ?
        <div>no cards left</div>
          :
        <div className="bank-value">{hand.length} </div>
      }
    </div>
    </Fragment>
  )
}

export default Player
Player.defaultProps = {
  playersCards: []
}

// <div>
//   {player}, hand:{hand[0].code}
//   <img src={hand[0].image} id={player} onClick={(event)=>playCard(event)}alt="new" />
// </div>

// const pileCheck = (deckID, order, player, cards) =>{
// const getCards = async ( url ) =>{
// const getCardsUrlMaker = ( player, deckID, cards ) => {
