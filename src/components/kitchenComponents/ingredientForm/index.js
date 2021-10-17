import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../../scss/components/_ingredientForm.scss'


const IngredientForm = ({element, updateSelectedIngredient,  deleteIngredient }) => {
  

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
    <li className="ingredient-form"><span className="ingredient-form__name">{element.name}</span>
      <span className="ingredient-form__count">
        <button className="ingredient-form__count__delete" onClick={onSubtractCount}>-</button>
        <input className="ingredient-form__count__state"  value={element.amount} type="text" onChange={changeAmount}/>
        <button className="ingredient-form__count__add" onClick ={onAddCount}>+</button>
        <select className="ingredient-form__count__form-control" value={element.unit} onChange={changeUnit}>
          <option classNme="ingredient-form__count__form-control__unit" value="g">g</option>
          <option classNme="ingredient-form__count__form-control__unit" value="kg">kg</option>
          <option classNme="ingredient-form__count__form-control__unit" value="ml">ml</option>
          <option classNme="ingredient-form__count__form-control__unit" value="l">l</option>
          <option classNme="ingredient-form__count__form-control__unit" value="pcs">pcs</option>
        </select>
      </span>
      <button onClick={() => deleteIngredient(element)} className="ingredient-form__button-delete">Delete</button>
    </li>
  )
}
export default IngredientForm