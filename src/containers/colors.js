import React, {useState} from 'react'
import { SketchPicker } from 'react-color';
import colorwheel from '../colorwheel.png'


function Colors(){

  const [ displayColorPicker, setDisplayColorPicker] = useState(false)
  const[ color, setColor ] = useState('#f7f4f2')

  const handleChange = (pickedColor) =>{
    setColor(pickedColor.hex)
  }

  const handleChangeComplete = (pickedColor) =>{
    console.log(pickedColor, "PICKED")
    setColor(pickedColor.hex)
  }

  const handleDisplayColorClick = () =>{
    setDisplayColorPicker(current => !current)
  }

  const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

    return (
      <div className="colorPicker">
      <img onClick={()=> handleDisplayColorClick()} src={colorwheel} />
        { displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ ()=> handleDisplayColorClick() }/>
          <SketchPicker
            color={color}
            onChange={(event) => handleChange(event)}
            onChangeComplete={(event) => handleChangeComplete(event)}
          />
        </div> : null }
      </div>
    )

}

export default Colors;

//
// const[ color, setColor ] = useState('#f7f4f2')
//
// const handleChange = (pickedColor) =>{
//   setColor(pickedColor.hex)
// }
//
// const handleChangeComplete = (pickedColor) =>{
//   console.log(pickedColor, "PICKED")
//   setColor(pickedColor.hex)
// }
//
// return(
//   <div>
//     colors div
//     <SketchPicker
//       color={color}
//       onChange={(event) => handleChange(event)}
//       onChangeComplete={(event) => handleChangeComplete(event)}
//
//      />
//   </div>
// )
