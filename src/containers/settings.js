import React, {useState} from 'react'
import SettingsInput from '../components/settingsInput'
import '../styles/settings.css';
import SettingsCogwheel from '../settings-cogwheel.png'


function Settings(){

  const [ displaySettingsPicker, setDisplaySettingsPicker] = useState(false)
  const [ allSettings, setAllSettings ] = useState(["chancesOn"])

  const handleDisplaySettingsClick = () =>{
    setDisplaySettingsPicker(current => !current)
  }
  const showHideClassName = displaySettingsPicker ? "modal display-block" : "modal display-none";

    return (
      <div className="Settings">
      <img className="SettingsCogwheel" src={SettingsCogwheel} onClick={()=> handleDisplaySettingsClick()} />
        <div className={showHideClassName}>
          <section className="modal-main">
            <div style={{display: 'flex',justifyContent:'space-between'}}>
              <h1 style={{flex: '1', alignItems:'center'}}> Settings </h1>
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
