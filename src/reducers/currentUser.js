const currentUser = (state = {username:"", loggedIn:false, isHost: false, chipColor:""}, action) => {
    switch(action.type){
        case "SET_USER":
        if(action.payload.length < 17){
            return {
                ...state,
                username: action.payload,
            }
          }else{
            alert("name too long")
            return state
          }

        case "SET_LOGGED_IN":
            return {
              ...state,
              loggedIn: action.payload,
            }

        case "SET_HOST":
          return{
            ...state,
            isHost: action.payload
          }

        default: return state
    }
}

export default currentUser;
