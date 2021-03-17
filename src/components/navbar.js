import React, { useState } from 'react'
import '../styles/navbar.css';

function Navbar({user}){

  return(
    <ul className="navbar">
      <li> <button name="home" text="useless button">use</button></li>
      <li> <button name="name" text="useless button">less</button></li>
      <li className="centerNav"> <div> {user} </div> </li>
    </ul>
  )
}

export default Navbar
