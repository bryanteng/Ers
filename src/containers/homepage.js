import React, { useState } from 'react'
import '../styles/homepage.css';
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../actions'

function Homepage({loggedIn, setLoggedIn, user, setUser}){

  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  return(
    <div className="homepage">
    <label>username: </label>
    <form onSubmit={()=>dispatch(allActions.userActions.setLoggedIn(!currentUser.loggedIn))}>
      <input name="name" value={currentUser.username} onChange={(e)=>dispatch(allActions.userActions.setUser(e.target.value))}/>
      <button onClick={()=>dispatch(allActions.userActions.setLoggedIn(!currentUser.loggedIn))}> enter </button>
    </form>
    </div>
  )
}

export default Homepage
