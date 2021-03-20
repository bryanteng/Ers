import React, { useState } from 'react'

function LobbyForm({getDeck, deckID, setDeckID, getNewDeck}){

  return(
    <div className="lobby">
    <h1> Find a lobby  or create a new one </h1>

    <form onSubmit={(event)=>getDeck(event, deckID)}>
      <label> Enter lobby code </label>
      <input value={deckID} onChange={(event)=>setDeckID(event.target.value)} />
      <button onClick={(event)=>getDeck(event,deckID)}>find lobby </button>
    </form>

    <label> Create a new lobby </label>
    <button onClick={(event)=>getNewDeck(event)}> lol button </button>

    </div>
  )
}

export default LobbyForm
