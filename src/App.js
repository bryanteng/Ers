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

  const [user, setUser] = useState("btt")
  const [order, setOrder] = useState([])
  const [deckID, setDeckID] = useState("") //useState("05win676scin")
  const [loggedIn, setLoggedIn] = useState(false)
  const [isInGame, setIsInGame] = useState(false)
  const [players, setPlayers] = useState({})
  const [isGameStarted, setIsGameStarted] = useState(false)

  const currentUser = useSelector(state => state.currentUser)

  const dispatch = useDispatch()
  const userObj = {name: "Rei"}

  useEffect(() => {
    dispatch(allActions.userActions.setUser(userObj))
    console.log(currentUser,"current")
  }, [dispatch])


  const userButton = () =>{
    // dispatch(allActions.userActions.setUser(temp))
    console.log(currentUser,"current")
  }

  useEffect(()=>{
    console.log(players)
  },[players])

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
        temp.push(user)
        fetch(`http://localhost:3000/gameroom/${deck}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({users:temp}),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setOrder(data.users)
          setIsInGame(true)
          return data;
        })
      }
    })
  }

  async function getNewDeck(event){
    event.preventDefault()

    await fetch('https://deckofcardsapi.com/api/deck/new/')
    .then(response => response.json())
    .then(data =>{
      if( data === null || data.status === 404 ) return alert("Lobby doesn't exist")
      let temp_deck_id = data.deck_id
      setDeckID(temp_deck_id)
      fetch(`http://localhost:3000/gamerooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({users:[user], deck: temp_deck_id}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setOrder(data.users)
        setIsInGame(true)
        return data;
      })
    })
  }

  const startGame = () =>{
    let player_hash = {}
    for(let i of order){
      player_hash[i] = []
    }
    setPlayers(player_hash)
    setIsGameStarted(true)
  }

  useEffect(function updateTitle() {
    document.title = "Welcome " + user + ", ERS";
  },[user]);

  console.log(players, "players")
  return (
    <div className="App">
    <button onClick={()=>userButton()}> user button </button>

    {loggedIn ?
    <Fragment>
      <Navbar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Rules />

      {!isInGame ?
        <LobbyForm getDeck={getDeck} deckID={deckID} setDeckID={setDeckID} getNewDeck={getNewDeck}/>
        : isGameStarted ?
      <div>
       <Game deckID={deckID} order={order} players={players} setPlayers={setPlayers} user={user}/>
      </div>  :
      <button onClick={()=>startGame()}> start game </button>

     }


    </Fragment>
    :
    <Homepage loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
  }



    </div>
  );
}

export default App;
