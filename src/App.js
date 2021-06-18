import './App.css';
import React, { useState, useEffect, Fragment } from 'react'
import {Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider';

import {useSelector, useDispatch} from 'react-redux'
import allActions from './actions'
import { setGameState, setCurrentState } from './actions/gameActions'

import Navbar from './components/navbar'
import Homepage from './containers/homepage'
import Game from './containers/game'
import Lobby from './containers/lobby'
import MessageBoard from './containers/messageBoard'
import Settings from './containers/settings'


import LobbyForm from './components/lobbyForm'

function App({cableApp}) {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const currentGame = useSelector(state => state.currentGame)
  const { username, loggedIn, isHost } = currentUser
  const { id, deckID, users, isInLobby, players, isGameStarted } = currentGame

  // const [user, setUser] = useState("btt")
  // const [loggedIn, setLoggedIn] = useState(false)
  // const [order, setOrder] = useState([])
  // const [deckID, setDeckID] = useState("") //useState("05win676scin")
  // const [isInGame, setIsInGame] = useState(false)
  // const [players, setPlayers] = useState({})
  // const [isGameStarted, setIsGameStarted] = useState(false)

  useEffect(()=>{
    if(deckID, loggedIn && isInLobby){
      cableApp.room = cableApp.cable.subscriptions.create({
          channel: 'GameroomsChannel',
          room: deckID
      },
      {
        received: (data) =>{
          console.log("received data: ", data)
          dispatch(setCurrentState(data))
        }
      })
    }
  },[loggedIn, isInLobby, deckID])

  return (
    <div className="App">
      <Settings />
        {loggedIn ?
        <Fragment>
          <Navbar username={username} deckID={deckID} isHost={isHost}/>
            {!isInLobby ?
              <LobbyForm username={username} /> :
              <div>
                <MessageBoard username={username}/>
                {
                  isGameStarted ?
                  <Game />
                  :
                  <Lobby />
                }

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
