import './App.css';
import React, { useState, useEffect, Fragment } from 'react'

import {Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'
import allActions from './actions'

import Navbar from './components/navbar'
import Homepage from './containers/homepage'

import Rules from './containers/rules'
import Game from './containers/game'
import LobbyForm from './components/lobbyForm'

// import NewPlayerInput from './components/newPlayerInput'

function App() {

  // const [user, setUser] = useState("btt")
  // const [loggedIn, setLoggedIn] = useState(false)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const currentGame = useSelector(state => state.currentGame)
  const { username, loggedIn } = currentUser
  const { deckID, order, isInLobby } = currentGame

  // const [order, setOrder] = useState([])
  // const [deckID, setDeckID] = useState("") //useState("05win676scin")
  const [isInGame, setIsInGame] = useState(false)
  const [players, setPlayers] = useState({})
  const [isGameStarted, setIsGameStarted] = useState(false)

  useEffect(()=>{
    console.log(players)
  },[players])

  const startGame = () =>{
    let player_hash = {}
    for(let i of order){
      player_hash[i] = []
    }
    setPlayers(player_hash)
    setIsGameStarted(true)
  }

  useEffect(function updateTitle() {
    document.title = "Welcome " + username + ", ERS";
  },[username]);

  console.log(players, "players")
  return (
    <div className="App">

    {loggedIn ?
    <Fragment>
      <Navbar username={username} />
      <Rules />

      {!isInLobby ?
        <LobbyForm username={username} />
        : isGameStarted ?
      <div>
       <Game deckID={deckID} order={order} players={players} setPlayers={setPlayers} />
      </div>  :
      <div>
        <div>Players in the lobby:</div>
        <ul>
          {order.map(player=> <li>{player}</li>)}
        </ul>
        <button onClick={()=>startGame()}> start game </button>
      </div>
     }

    </Fragment>
    :
    <Homepage />
  }



    </div>
  );
}

export default App;
