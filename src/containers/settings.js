import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setGameState } from '../actions/gameActions'
import SettingsInput from '../components/settingsInput'
import '../styles/settings.css';


function Settings(){

  const dispatch = useDispatch()
  const currentGame = useSelector(state => state.currentGame)
  const { chances } = currentGame
  const [ displaySettingsPicker, setDisplaySettingsPicker] = useState(false)
  const [ allSettings, setAllSettings ] = useState(["chances"])

  const handleDisplaySettingsClick = () =>{
    setDisplaySettingsPicker(current => !current)
  }
  const showHideClassName = displaySettingsPicker ? "modal display-block" : "modal display-none";

    return (
      <div className="Settings">
      <button onClick={()=> handleDisplaySettingsClick()}> settings button </button>
        <div className={showHideClassName}>
          <section className="modal-main">
            <div style={{display: 'flex',justifyContent:'space-between'}}>
              <h1 style={{flex: '1', alignItems:'center'}}> Settings</h1>
              <div  style={{ color : 'red', float: 'right', fontSize: '12px'}} type="button" onClick={()=> handleDisplaySettingsClick()}>X</div>
            </div>

            <div class="col-md-8 ">
              {allSettings.map(setting => (
                <SettingsInput setting={setting}/>
              )
              )}
            </div>
            <button type="button" onClick={()=> handleDisplaySettingsClick()}>
              Close
            </button>
          </section>
        </div>
      </div>
    )

}

export default Settings;
