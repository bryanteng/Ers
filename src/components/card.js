import React, { Fragment } from 'react'
import '../styles/table.css';

function Card({src, index}){
  return(
    <Fragment>
    {index == 3 ?
      <div className="card-last" index={index}>
        <img className="card-img" src={src} />
      </div>
      :
      <div className="card-small">
        <img className="card-img" src={src}/>
      </div>

    }
    </Fragment>
  )
}

export default Card
