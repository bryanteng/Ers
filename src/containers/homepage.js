import React, { useState } from 'react'

function Homepage({loggedIn, setLoggedIn, user, setUser}){


  return(
    <div>
      <input name="name" value={user} onChange={(e)=>setUser(e.target.value)}/>
      <button onClick={()=>setLoggedIn(!loggedIn)}> enter </button>
    </div>
  )
}

export default Homepage
