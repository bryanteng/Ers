import React, { useState } from 'react'
import Rules from '../containers/rules'

import '../styles/navbar.css';

function Navbar({username, deckID}){

  return(
    <ul className="navbar">
      <li><Rules/></li>
      <li className="centerNav"> <div> { username } </div> </li>
      {deckID.length > 0 ? <div className="lobbyCode"> Invite friends with lobby code: {deckID} </div> : null}
    </ul>
  )
}

export default Navbar
