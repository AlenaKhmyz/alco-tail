import React, { useState, useEffect } from 'react';

const StepForm = ({stepList, setStepList, item, text, setText }) => {
    const addStep = (text ) => {
        if (!text) {
          return
        }
    
        const step = {
          text
        }
        const newStep = [...stepList, step]
        setStepList(newStep)
        setText('')
      } 
  
    return(
        <li key={item.text}>{item.text}</li>
    )
  }
  export default StepForm