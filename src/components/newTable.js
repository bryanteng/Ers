import React, { useState, useEffect } from 'react'

function NewTable(){
  const [players, setPlayers] = useState(["me", "you","they","them","he","she","their","there"])
  const [cards, setCards] = useState(["https://deckofcardsapi.com/static/img/3D.png","https://deckofcardsapi.com/static/img/3C.png","https://deckofcardsapi.com/static/img/3C.png"])
  return(
    <div className="game">
      <div className="table">
        <div className="players">
          {players.map((player,index) => (

            <div className={`player player-${index+1}${index==0? ' playing' : ''}`}>
              <div className="avatar" style={{backgroundColor:`#${Math.floor(Math.random()*16777215).toString(16)}`}}> </div>
              <div className="name">{player} </div>
              <div className="bank-value">{cards.length} </div>

            </div>

          ))}
        </div>

        <div className="card-place">
          {cards.map(card=> <img className="card" src={card} /> )}
          <div className="card-count">5</div>
        </div>
      </div>
    </div>
  )
}

export default NewTable
