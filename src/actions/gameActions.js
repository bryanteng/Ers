export const setOrder = (order) => {
    return {
        type: "SET_ORDER",
        payload: order
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
    setOrder,
    setDeckID,
    setCurrentPlayer,
    setGameState,
    startGame,
    gameOver,
    setPlayers,
    setDiscardPile
}
