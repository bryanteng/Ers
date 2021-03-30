const setOrder = (order) => {
    return {
        type: "SET_ORDER",
        payload: order
    }
}

const setDeckID = (deckID) => {
    return {
        type: "SET_DECKID",
        payload: deckID
    }
}

const startGame = () => {
  return {
    type: "START_GAME"
  }
}

const gameOver = () => {
  return {
    type: "GAME_OVER"
  }
}

const setPlayers = (players) => {
  return {
    type: "SET_PLAYERS",
    payload: players
  }
}

const setDiscardPile = (discardPile) => {
  return {
    type: "SET_DISCARD_PILE",
    payload: discardPile
  }
}

export default {
    setOrder,
    setDeckID,
    startGame,
    gameOver,
    setPlayers,
    setDiscardPile
}
