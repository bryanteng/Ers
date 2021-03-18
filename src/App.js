import './App.css';
import React, { useState, useEffect, Fragment } from 'react'

import Navbar from './components/navbar'
import Homepage from './containers/homepage'

import Rules from './containers/rules'
import Game from './containers/game'
import LobbyForm from './components/lobbyForm'


import {Switch, BrowserRouter as Router, Route } from 'react-router-dom'

// import NewPlayerInput from './components/newPlayerInput'

function App() {

  const [user, setUser] = useState("btt")
  const [order, setOrder] = useState([])
  const [deckID, setDeckID] = useState("") //useState("05win676scin")
  const [loggedIn, setLoggedIn] = useState(false)
  const [isInGame, setIsInGame] = useState(false)

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
      if( data === null || data.status === 404 ) alert("Lobby doesn't exist")
      else{
        if( data.users.length > 8 ) return alert("Lobby full!")
        let temp = data.users
        if(temp.includes(user)){
          alert("Lobby already contains a user with that name! Change your username to play in this lobby.")
          return setLoggedIn(false)
        }
        setIsInGame(true)
        setOrder(data.users)
        return data;
      }
    })
  }

  useEffect(function updateTitle() {
    document.title = "Welcome " + user + ", ERS";
  },[user]);

  return (
    <div className="App">
    {loggedIn ?
    <Fragment>
      <Navbar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Rules />

      {!isInGame ? <LobbyForm getDeck={getDeck} deckID={deckID} setDeckID={setDeckID}/> : <Game deckID={deckID} order={order}/> }

    </Fragment>
    :
    <Homepage loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
  }



    </div>
  );
}

export default App;
