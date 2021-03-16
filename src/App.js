import './App.css';
import React, { useState, useEffect, Fragment } from 'react'

import Navbar from './components/navbar'
import Homepage from './containers/homepage'

import Rules from './containers/rules'
import Game from './containers/game'
import NewPlayerInput from './components/newPlayerInput'

function App() {

  const [user, setUser] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(function updateTitle() {
    document.title = "Welcome " + user;
  },[user]);

  console.log(user, "dis user")
  return (
    <div className="App">
    {loggedIn ?
    <Fragment>
      <Navbar user={user} />
      hi
      <Rules />
      <NewPlayerInput />
      <Game />
    </Fragment>
    :
    <Homepage loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
  }



    </div>
  );
}

export default App;
