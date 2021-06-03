import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { startGame } from '../actions/gameActions'


function Lobby({isHost}){

  const dispatch = useDispatch()
  const currentGame = useSelector(state => state.currentGame)
  const { deckID, users, players } = currentGame

  const startGameButton = () =>{
    dispatch(startGame())
  }

  return(
    <div>
      <div className="lobbyCodeDiv">Lobby code: {deckID}</div>
      <div>Players in the lobby:</div>
      <ol className="playersList">
        {users.map(player=> <li style={{ listStylePosition: "inside", justify:"center" }} className="playerLi" >{player}</li>)}
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
