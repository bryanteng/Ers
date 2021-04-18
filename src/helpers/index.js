export const API_ROOT = 'http://localhost:3000'
export const WEB_SOCKET = 'ws://localhost:3000/cable'

export const pileCheck = (deckID, users, cards) =>{
  let pilesMade
  if(users.length != 0){
    return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${users[0]}/list/`)
    .then(data => data.json())
    .then(data => {
      pilesMade = data.piles
      for(let player of users){
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

export function isSlappable(array){
  if(array.length == 0) return false
  let len = array.length

  //check top if JOKER
  if(array[len - 1].value == "JOKER") return "JOKER"

  //if only one card in pile, only a JOKER can be slapped
  if(len == 1){
    if(array[0].value == "JOKER") return "JOKER"
    else return false
  }

  // begin two card slappable, deck must also have at least 2 cards
  if(len >= 2){
    let bottom = cardValue(array[0].value)
    let first = cardValue(array[len - 1].value)
    let second = cardValue(array[len - 2].value)
    // first = 2
    // second = 13

    // DOUBLE: if last two cards have the same value
    if(first == second ) return "DOUBLE"
    // TOP BOTTOM: if first card in pile and most recent card are the same value
    if(bottom == first) return "TOP BOTTOM"

    // MARRIAGE: if a QUEEN is place over or under a KING
    if(first == 12 && second == 13 || first == 13 && second == 12) return "MARRIAGE"

    // TENS: if the last two cards add up to 10
    if(first + second == 10) return "TENS"

  //begin three card slappable
  if(len >= 3){
    let third = cardValue(array[len - 3].value)
    // third = 12

    //SANDWICH: if two cards of the same value are played with a card of different value in between
    if(first == third) return "SANDWICH"

    //TENS: if two cards add up to 10 with a face card in between
    if(first + third == 10 && second >=11) return "TENS"

    if(len >= 4){
      let consecutive = "1234567891011121312345678910111213"
      let revConsecutive = "1312111098765432113121110987654321"
      let fourth = cardValue(array[len - 4].value)
      let fourInOrder = [first, second, third, fourth].join("")
      if(consecutive.includes(fourInOrder) || revConsecutive.includes(fourInOrder)) return "FOUR IN A ROW"
    }
  }

  }
  return false
}

export function cardValue(card){
  let value
  switch(card){
    case "ACE":
      value = 1
      break;
    case "KING":
      value = 13
      break;
    case "QUEEN":
      value = 12
      break;
    case "JACK":
      value = 11
      break;
    default:
      value = +card
  }
  return value
}
