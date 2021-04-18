export const setUsers = (users) => {
    return {
        type: "SET_USERS",
        payload: users
    }
}

export const setDeckID = (deckID) => {
    return {
        type: "SET_DECKID",
        payload: deckID
    }
}

export const setCurrentPlayer = (currentPlayer) => {
  return {
    type: "SET_CURRENT_PLAYER",
    payload: currentPlayer
  }
}

export const setGameState = (state) => {
  return {
    type: "SET_GAME_STATE",
    payload: state
  }
}

export const setCurrentState = (state) =>{
  return {
    type: "SET_CURRENT_STATE",
    payload: state
  }
}

export const startGame = () => {
  return {
    type: "START_GAME"
  }
}

export const gameOver = () => {
  return {
    type: "GAME_OVER"
  }
}

export const setPlayers = (players) => {
  return {
    type: "SET_PLAYERS",
    payload: players
  }
}

export const setDiscardPile = (discardPile) => {
  return {
    type: "SET_DISCARD_PILE",
    payload: discardPile
  }
}

export default {
    setUsers,
    setDeckID,
    setCurrentPlayer,
    setGameState,
    setCurrentState,
    startGame,
    gameOver,
    setPlayers,
    setDiscardPile
}
