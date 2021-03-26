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


export default {
    setUser,
    setLoggedIn
}
