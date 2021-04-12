import React, { useState, useEffect } from 'react'
import Card from '../components/card'
import '../styles/table.css';

function Table(){

  const [cards, setCards] = useState([])

  const [url, setUrl] = useState("")

  useEffect(()=>{
    console.log(cards)
  },[cards])

  const updateCards = (e) =>{
    e.preventDefault()
    setCards([...cards, url])
  }
  console.log(cards)
  return(
    <div className="Game">
    <form onSubmit={(e)=>updateCards(e)}>
      <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="enter card"/>
    </form>
      <div className="Table">
        <div className="Board">
          {cards.length > 3 ?
            cards.slice(cards.length-4,cards.length).map((card,index)=> <Card index={index} src={card}/> )
        :
            [...new Array(4 - cards.length), ...cards].map((card,index)=> <Card index={index} src={card}/>)
          }
        </div>
      </div>
      <ul>

      {cards.map(card=>{
          <li>card</li>
      })}
      </ul>
    </div>
  )
}
// https://deckofcardsapi.com/static/img/3D.png
export default Table
