import React, { useState } from 'react'
import Rules from '../containers/rules'

import '../styles/navbar.css';

function Navbar({username}){

  return(
    <ul className="navbar">
      <li> <button name="home" text="useless button">use</button></li>
      <li> <button name="name" text="useless button">less</button></li>
      <li className="centerNav"> <div> { username } </div> </li>
      <li><Rules/></li>
    </ul>
  )
}

export default Navbar
