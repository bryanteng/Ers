import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../actions'
import { API_ROOT } from '../helpers'
import { setGameState, setDeckID, setUsers } from '../actions/gameActions'

function LobbyForm({username}){

  const dispatch = useDispatch()
  const currentGame = useSelector(state => state.currentGame)
  const { deckID, users, isInLobby, colors } = currentGame

  async function getDeck(event, deck){
    event.preventDefault()
    return await fetch(`http://localhost:3000/gameroom/${deck}`, {
      method: 'GET',
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
        if( data.isGameStarted ) return alert("Game already started!")

        let temp = data.users
        if(temp.includes(username)){
          alert("Lobby already contains a user with that name! Change your username to play in this lobby.")
          return dispatch(allActions.userActions.setLoggedIn(false))
        }
        temp.push(username)
        let tempColors = data.colors
        tempColors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
        let player_hash = {}
        for(let i of temp){
          player_hash[i] = []
        }
        dispatch(setGameState({ users:temp, players: player_hash, colors: tempColors }))
        dispatch(setUsers(temp))
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
      dispatch(setDeckID(temp_deck_id))
      fetch(`${API_ROOT}/gamerooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({users:[username], deckID: temp_deck_id, colors:["#f7f4f2"]}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        dispatch(setUsers(data.users))
        dispatch(allActions.userActions.setHost(true))
        return data;
      })
    })
  }


  return(
    <div className="lobby">
    <h1> Find a lobby or create a new one </h1>

    <form onSubmit={(event)=>getDeck(event, deckID)}>
      <label> Enter lobby code </label>
      <input value={deckID} onChange={(event)=>dispatch(setDeckID(event.target.value))} />
      <button onClick={(event)=>getDeck(event,deckID)}>find lobby </button>
    </form>


    <label> Create a new lobby </label>
    <button onClick={(event)=>getNewDeck(event)}> create </button>

    </div>
  )
}

export default LobbyForm
