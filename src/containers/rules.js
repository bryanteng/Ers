import React, { useState } from 'react'
import Modal from '../components/modal'

function Rules(){

  const [showRules, setShowRules] = useState(false)

  const handleRulesClick = () =>{
    setShowRules(current => !current)
  }

  return(
    <button className="Rules" onClick={handleRulesClick}>
    <Modal showRules={showRules} handleRulesClick={handleRulesClick} />
      Official Rules
    </button>
  )
}

export default Rules
