export const pileCheck = (deckID, order, cards) =>{
  let pilesMade
  if(order.length != 0){
    return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${order[0]}/list/`)
    .then(data => data.json())
    .then(data => {
      pilesMade = data.piles
      for(let player of order){
        if(!pilesMade[player] || !pilesMade[player]["remaining"]){
          getCards(getCardsUrlMaker(player, deckID, cards))
          pileCheck()
        }
      }
    })
  }
}

export const getCards = async ( url ) =>{
    return await fetch(url)
}

export const getCardsUrlMaker = ( player, deckID, cards ) => {
  return `https://deckofcardsapi.com/api/deck/${deckID}/pile/${player}/add/?cards=${cards}`
}
