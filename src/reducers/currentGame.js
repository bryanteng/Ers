const currentGame = (state = {order:[], deckID:"", players:{}, isInLobby:false, isGameStarted: false, roundWinner:"", gameWinner:"", deck:[], discardPile: []}, action) => {
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

        case "START_GAME":
            let player_hash = {}
            for(let i of state.order){
              player_hash[i] = []
            }
            return {
              ...state,
              players: player_hash,
              isGameStarted: true
            }

        case "GAME_OVER":
            return {
              ...state,
              isGameStarted: false
            }

        default: return state
    }
}

export default currentGame;
