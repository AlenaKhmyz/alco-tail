import React, { useState, useEffect } from 'react';
import axios from 'axios'

const IngredientForm = ({element, updateSelectedIngredient}) => {
  

  const onAddCount = () => {
    updateSelectedIngredient({
      name: element.name, 
      amount: element.amount + 1,
      unit: element.unit
    }) 
    
    
  }

  const onSubtractCount = () => {
    if(element.amount > 0) {
      updateSelectedIngredient({
        name: element.name, 
        amount: element.amount - 1,
        unit: element.unit
      }) 
    } 
  }

  const changeAmount = (event) => {
    if(!/^[0-9]+$/.test(event.target.value)) {
      return
    }
    updateSelectedIngredient({
      name: element.name, 
      amount: Number(event.target.value),
      unit: element.unit
    }) 
    
  }

  const changeUnit = (event) => {
    updateSelectedIngredient({
      name: element.name, 
      amount: element.amount,
      unit: event.target.value
    }) 
  }

  return(
    <li><span>{element.name}</span>
      <span className="constructor__container__count">
        <button className="constructor__container__count__delete" onClick={onSubtractCount}>-</button>
        <input className="constructor__container__count__state"  value={element.amount} type="text" onChange={changeAmount}/>
        <button className="constructor__container__count__add" onClick ={onAddCount}>+</button>
        <select className="form-control" value={element.unit} onChange={changeUnit}>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="l">l</option>
          <option value="pcs">pcs</option>
        </select>
      </span>
    </li>
  )
}
export default IngredientForm