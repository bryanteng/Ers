import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { startGame } from '../actions/gameActions'
import '../styles/lobby.css';

import Colors from './colors'

function Lobby(){

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const { username, isHost } = currentUser
  const currentGame = useSelector(state => state.currentGame)
  const { users, colors } = currentGame

  const startGameButton = () =>{
    dispatch(startGame())
  }

  return(
    <div>
      <div>Players in the lobby:</div>
      <ol className="playersList">
        {users.map((player,index)=>
          <li className="playerLi">
            <div className="playerName" style={{color: colors[index]}}> {player} </div>
            {username == player ? <Colors index={index} userColor={colors[index]}/> : null}
          </li> )}
      </ol>
      {users.length > 1 && isHost ? <button onClick={()=>startGameButton()}> start game </button> :
      <div>
        {users.length == 1 && isHost ?
        <div>invite friends to join to begin playing</div>
          :
          <div>wait for host to start game</div>
        }
      </div>
      }

    </div>
  )
}

export default Lobby
