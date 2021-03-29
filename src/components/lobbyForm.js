import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../actions'

function LobbyForm({username}){

  const currentGame = useSelector(state => state.currentGame)
  const { deckID, order, isInLobby } = currentGame
  const dispatch = useDispatch()

  async function getDeck(event, deck){
    event.preventDefault()
    return await fetch(`http://localhost:3000/gameroom/${deck}`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data, "data ")
      //data = {id: 1, discard: [], users: [], deck: "05win676scin"}
      if( data === null || data.status === 404 ) return alert("Lobby doesn't exist")
      else{
        if( data.users.length > 8 ) return alert("Lobby full!")
        let temp = data.users
        if(temp.includes(username)){
          alert("Lobby already contains a user with that name! Change your username to play in this lobby.")
          return dispatch(allActions.userActions.setLoggedIn(false))
        }
        temp.push(username)
        fetch(`http://localhost:3000/gameroom/${deck}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({users:temp}),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          dispatch(allActions.gameActions.setOrder(data.users))
          return data;
        })
      }
    })
  }

  async function getNewDeck(event){
    event.preventDefault()

    await fetch('https://deckofcardsapi.com/api/deck/new/')
    .then(response => response.json())
    .then(data =>{
      if( data === null || data.status === 404 ) return alert("Lobby doesn't exist")
      let temp_deck_id = data.deck_id
      dispatch(allActions.gameActions.setDeckID(temp_deck_id))
      fetch(`http://localhost:3000/gamerooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({users:[username], deck: temp_deck_id}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        dispatch(allActions.gameActions.setOrder(data.users))
        return data;
      })
    })
  }


  return(
    <div className="lobby">
    <h1> Find a lobby or create a new one </h1>

    <form onSubmit={(event)=>getDeck(event, deckID)}>
      <label> Enter lobby code </label>
      <input value={deckID} onChange={(event)=>dispatch(allActions.gameActions.setDeckID(event.target.value))} />
      <button onClick={(event)=>getDeck(event,deckID)}>find lobby </button>
    </form>

    <label> Create a new lobby </label>
    <button onClick={(event)=>getNewDeck(event)}> lol button </button>

    </div>
  )
}

export default LobbyForm
