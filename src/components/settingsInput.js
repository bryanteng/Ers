import React, {Fragment, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setCurrentState } from '../actions/gameActions'

function SettingsInput({setting}){
  const dispatch = useDispatch()
  const currentGame = useSelector(state => state.currentGame)

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;

    dispatch(setCurrentState({ [id]: value }))
  }

  return(
    <div className="SettingInput">
      {setting == "chancesOn" ?
      <Fragment>
        <h4 className="SettingTitle"> * Chances </h4>
        <input className="SettingInput" id={setting} type="checkbox" checked={currentGame[setting]} onChange={(event)=> handleInputChange(event)}/>
        <h5 className="SettingDescription">- This setting allows player to have 1-4 chances after an ace or face card is played to play an ace or face card. Four chances for an Ace, 3 for a King, 2 for a Queen, and 1 for a Jack.</h5>
      </Fragment>
      : null}
    </div>
  )

}

export default SettingsInput
