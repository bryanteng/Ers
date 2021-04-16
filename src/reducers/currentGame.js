import { API_ROOT } from '../helpers'

const currentGame = (state = {id: 0, order:[], deckID:"", players:{}, currentPlayer: 0, isInLobby:false, isGameStarted: false, roundWinner:"", gameWinner:"", deck:[], discardPile: []}, action) => {
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
          postUpdate(state, action.payload)

        case "SET_CURRENT_STATE":
          console.log(action.payload, " IN SET CURRENT STATE")
          return {...state, ...action.payload, order: action.payload.users}

        case "GAME_OVER":
            return {
              ...state,
              isGameStarted: false
            }

        case "START_GAME":
          postUpdate(state, {isGameStarted: true})

        default: return state
    }
}

export default currentGame;

function postUpdate(state, payload){
  fetch(`${API_ROOT}/gameroom/${state.deckID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Game state update:', data);
    return Object.assign(state, data)
  })
}
