import React, { useState } from 'react'
import '../styles/homepage.css';

function Homepage({loggedIn, setLoggedIn, user, setUser}){


  return(
    <div className="homepage">
    <label>username: </label>
    <form onSubmit={()=>setLoggedIn(!loggedIn)}>
      <input name="name" value={user} onChange={(e)=>setUser(e.target.value)}/>
      <button onClick={()=>setLoggedIn(!loggedIn)}> enter </button>
    </form>
    </div>
  )
}

export default Homepage
