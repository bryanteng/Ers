import currentUser from './currentUser'
import currentGame from './currentGame'

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,
    currentGame
})

export default rootReducer
