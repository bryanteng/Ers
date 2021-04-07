import { API_ROOT } from '../helpers'

const currentGame = (state = {order:[], deckID:"", players:{}, currentPlayer: 0, isInLobby:false, isGameStarted: false, roundWinner:"", gameWinner:"", deck:[], discardPile: []}, action) => {
    switch(action.type){
        case "SET_ORDER":
            return {
                ...state,
                order: action.payload,
                isInLobby: true
            }

        case "SET_DECKID":
            return {
                ...state,
                deckID: action.payload,
            }

        case "SET_PLAYERS":
          return {
              ...state,
              players: action.payload
          }

        case "SET_DISCARD_PILE":
          return {
            ...state,
            discardPile: action.payload
          }

        case "SET_CURRENT_PLAYER":
          return {
            ...state,
            currentPlayer: action.payload
          }

        case "SET_GAME_STATE":
          fetch(`http://localhost:3000/gameroom/${state.deckID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Game state:', data);
            return Object.assign(state, data)
          })

        case "GAME_OVER":
            return {
              ...state,
              isGameStarted: false
            }

        case "START_GAME":
            return {
              ...state,
              isGameStarted: true
            }

        default: return state
    }
}

export default currentGame;
