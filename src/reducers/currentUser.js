const currentUser = (state = {username:"", loggedIn:false}, action) => {
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

        default: return state
    }
}

export default currentUser;
