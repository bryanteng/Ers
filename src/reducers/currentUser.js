const currentUser = (state = {}, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload.name,
                loggedIn: true
            }

        case "SET_LOGGED_IN":
            return {
              ...state,
              user:"",
              loggedIn: false
            }

        default: return state
    }
}

export default currentUser;
