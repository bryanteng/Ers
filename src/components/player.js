import React, { Fragment, useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

// import { pileCheck, getCards, getCardsUrlMaker } from '../helpers'

function Player({index, player, deckID, playersCards}){

  const [ hand, setHand ] = useState([])
  const currentUser = useSelector(state => state.currentUser)
  const currentGame = useSelector(state => state.currentGame)
  const { currentPlayer, colors } = currentGame

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
      {hand.length == 0 ?
        <Fragment>
          <div className="avatar" id={player} style={{backgroundColor: colors[index] }}> </div>
          <div className="name">{player} </div>
          <div className="bank-value">no cards left</div>
        </Fragment>
          :
        <Fragment>
          <div className="avatar" id={player} style={{backgroundColor: colors[index] }}> </div>
          <div className="name">{player} </div>
          <div className="bank-value">{hand.length} </div>
        </Fragment>
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
