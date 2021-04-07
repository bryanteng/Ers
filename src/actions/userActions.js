const setUser = (user) => {
    return {
        type: "SET_USER",
        payload: user
    }
}

const setLoggedIn = (loggedIn) => {
    return {
        type: "SET_LOGGED_IN",
        payload: loggedIn
    }
}

const setHost = (isHostBoolean) =>{
    return {
      type: "SET_HOST",
      payload: isHostBoolean
    }
}

export default {
    setUser,
    setLoggedIn,
    setHost
}
