import React, { useState, useEffect } from 'react';

import '../../../scss/components/_steps.scss'

const StepForm = ({item, deleteStep, index, updateStep}) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [text, setText] = useState(item.text)
      
    const editStep = () => {
      setIsEditMode(!isEditMode)
      updateStep({text: text}, index)
    }
   
  
    return(
        <li key={item.text} className="step">
          {isEditMode ?  <textarea key={item} value={text} onChange={(event) => {setText(event.target.value)}} className="step__text" rows="1"/> :  item.text}
          {!isEditMode && <button onClick={() => deleteStep(index)} className="step__delete">Delete step</button>}
          {isEditMode ? <button onClick={editStep} className="step__save">Save step</button> : <button onClick={() => setIsEditMode(true)} className="step__edit">Edit step</button>}
        </li>
    )
  }
  export default StepForm