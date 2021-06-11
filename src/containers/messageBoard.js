import React, { useState, useRef, useEffect, Fragment } from 'react'
import '../styles/messageboard.css';

import { setGameState } from '../actions/gameActions'
import {useSelector, useDispatch} from 'react-redux'

function MessageBoard({username}){

  const searchInput = useRef(null);
  const chatBottom = useRef(null);

  const [inputVal, setInputVal] = useState("")

  const dispatch = useDispatch()
  const currentGame = useSelector(state => state.currentGame)
  const { messages } = currentGame

  useEffect(()=>{
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  },[messages])

  const focusInput=()=>{
    searchInput.current.focus()
  }

  const sendMessage = (event) =>{
    event.preventDefault()
    let temp = messages
    temp.push("("+username +"): "+inputVal)
    dispatch(setGameState({messages: temp}))
    setInputVal("")
  }

  return(
    <div className="MessageBoard" onClick={()=>focusInput()}>
    <ol className="Messages">
    {messages.map(message => (
      <Fragment>
      <li className="Message">{message}</li>
      <br/>
      </Fragment>
    ) )}
    <div className="chatBottom" ref={chatBottom} style={{ float:"left", clear: "both" }} ></div>
    </ol>
      <form onSubmit={(event) => sendMessage(event)}>
        <input className="MessageBoardInput" ref={searchInput} placeholder={"..."} value={inputVal} onChange={(event)=> setInputVal(event.target.value)} />
      </form>
    </div>
  )
}

export default MessageBoard
