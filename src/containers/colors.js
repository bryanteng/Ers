import React, {useState} from 'react'
import { SketchPicker, TwitterPicker } from 'react-color';
import {useSelector, useDispatch} from 'react-redux'
import colorwheel from '../colorwheel.png'
import { setGameState } from '../actions/gameActions'


function Colors({index, userColor}){

  const dispatch = useDispatch()
  const currentGame = useSelector(state => state.currentGame)
  const { colors } = currentGame
  const [ displayColorPicker, setDisplayColorPicker] = useState(false)


  const handleChangeComplete = (pickedColor) =>{
    console.log(pickedColor, "PICKED")
    let temp = colors
    temp[index] = pickedColor.hex
    dispatch(setGameState({colors: temp}))
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
          <TwitterPicker
            color={userColor}
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
