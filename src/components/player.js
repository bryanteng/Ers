import React, { useState, useEffect } from 'react'
// import { pileCheck, getCards, getCardsUrlMaker } from '../helpers'

function Player(props){

  const [ hand, setHand ] = useState([])

  useEffect(()=>{
    setHand(props.hand)
    // getCards(props.player, props.deckID)
    if( props.hand.length != 0) {
      let cards = props.hand.map(x=> x.code)
      pileCheck(props.deckID, props.player, cards )
    }else{
      setHand([])
    }
  },[props.hand])


  const pileCheck = (deckID, aPlayer, cards) =>{
    let pilesMade
    return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${aPlayer}/list/`)
    .then(data => data.json())
    .then(data => {
      pilesMade = data.piles
        if(!pilesMade[aPlayer] || !pilesMade[aPlayer]["remaining"]){
          getCards(aPlayer, deckID)
          pileCheck(deckID, aPlayer, cards)
      }
    })
  }

  const getCards = async ( player, deckID ) =>{
    let cards = props.hand.map(x=> x.code).join()
    return await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${player}/add/?cards=${cards}`)
  }

  return(
    <div className="player">
      {hand.length == 0 ? <div>{props.player}, no cards left</div> :
        <div>
        {props.player}, hand:{hand[0].code}
        <img src={hand[0].image} id={props.player} onClick={(event)=>props.playCard(event)}alt="new" />
        </div>
      }
    </div>
  )
}

export default Player

// const pileCheck = (deckID, order, player, cards) =>{
// const getCards = async ( url ) =>{
// const getCardsUrlMaker = ( player, deckID, cards ) => {
