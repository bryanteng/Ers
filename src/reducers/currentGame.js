const currentGame = (state = {order:[], deckID:"", isInLobby:false}, action) => {
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

        default: return state
    }
}

export default currentGame;
