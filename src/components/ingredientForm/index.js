import React, { useState, useEffect } from 'react';
import axios from 'axios'

const IngredientForm = ({element}) => {
  const [units, setUnits] = useState('')
  const [count, setCount] = useState(0)

  const onAddCount = () => {
    setCount(count + 1)   
  }

  const onDeleteCount = () => {
    if(count > 0) {
      setCount(count - 1) 
    } else {
      setCount(0)
    }
  }

  return(
    <li><span>{element}</span>
      <span className="constructor__container__count">
        <button className="constructor__container__count__delete" onClick={onDeleteCount}>-</button>
        <input className="constructor__container__count__state"  value={count} type="text" onChange={ (event) => {setCount(Number(event.target.value))}}/>
        <button className="constructor__container__count__add" onClick ={onAddCount}>+</button>
        <select onChange={(event) => {setUnits(event.target.value)}} className="form-control" value={units}>
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