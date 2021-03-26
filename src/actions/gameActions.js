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

export default {
    setOrder,
    setDeckID
}
