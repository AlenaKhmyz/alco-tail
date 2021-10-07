import React, { useState, useEffect } from 'react';

const StepForm = ({item, deleteStep, index, updateStep}) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [text, setText] = useState(item.text)
      
    const editStep = () => {
      setIsEditMode(!isEditMode)
      updateStep({text: text}, index)
    }
   
  
    return(
        <li key={item.text}>
          {isEditMode ?  <textarea key={item} value={text} onChange={(event) => {setText(event.target.value)}}/> :  item.text}
          {!isEditMode && <button onClick={() => deleteStep(index)}>Delete step</button>}
          {isEditMode ? <button onClick={editStep}>Save step</button> : <button onClick={() => setIsEditMode(true)}>Edit step</button>}
        </li>
    )
  }
  export default StepForm