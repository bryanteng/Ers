const currentUser = (state = {username:"", loggedIn:false, isHost: false}, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                username: action.payload,
            }

        case "SET_LOGGED_IN":
            return {
              ...state,
              loggedIn: action.payload
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
