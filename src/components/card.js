import React, { Fragment } from 'react'
import '../styles/table.css';

function Card({src, index}){
  return(
    <Fragment>
    {index == 3 ?
      <img className="card card-last" index={index} src={src}/>
      :
      <img className="card" src={src} />
    }
    </Fragment>
  )
}

export default Card
