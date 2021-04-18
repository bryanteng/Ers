import './App.css';
import React, { useState, useEffect, Fragment } from 'react'
import {Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'
import allActions from './actions'
import { setGameState, setCurrentState } from './actions/gameActions'

import Table from './components/table'
import NewTable from './components/newTable'

import Homepage from './containers/homepage'
import Navbar from './components/navbar'
import Rules from './containers/rules'

import Game from './containers/game'
import LobbyForm from './components/lobbyForm'

import { ActionCableConsumer } from 'react-actioncable-provider';
import GameroomSocket from './components/GameroomSocket'


// import NewPlayerInput from './components/newPlayerInput'

function App({cableApp}) {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const currentGame = useSelector(state => state.currentGame)
  const { username, loggedIn } = currentUser
  const { id, deckID, users, isInLobby, players, isGameStarted } = currentGame
  const [channel, setChannel] = useState(null)

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
      setChannel(cableApp.room)
    }
  },[loggedIn, isInLobby, deckID])

  const startGame = () =>{
    dispatch(allActions.gameActions.startGame())
    // let player_hash = {}
    // for(let i of order){
    //   player_hash[i] = []
    // }
    // setPlayers(player_hash)
    // setIsGameStarted(true)
  }
  return (
    <div className="App">
        {loggedIn ?
        <Fragment>
          <Navbar username={username} />
          <Rules />
          <GameroomSocket />

            {!isInLobby ?
              <LobbyForm username={username} /> :
              isGameStarted ?
              <Game />
              :
              <div>
                <div className="lobbyCodeDiv">Lobby code: {deckID}</div>
                <div>Players in the lobby:</div>
                <ul>
                  {users.map(player=> <li>{player}</li>)}
                </ul>
                {users.length > 1 ? <button onClick={()=>startGame()}> start game </button> :
                <div>
                  <div>invite friends to join to begin playing</div>
                </div>
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
