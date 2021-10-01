import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'

import '../../../scss/components/_constructor.scss'

function ConstructorPage() {

  const [ingredients, setIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [name, setName] = useState('')
  const [units, setUnits] = useState('')
  const [description, setDescription] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [showDropDown, setShowDropDown] = useState(false)
  const [count, setCount] = useState(0)
  const [word, setWord] = useState('')
  
// 1.пофиксить количиство ингредиентов и единицы измерения, чтобы для каждого ингредиенты были разные
// 2.заливка гифки

  
  const getIngredients = async () => {
    const response = await axios.get('http://localhost:3004/ingredients')
    setIngredients(response.data)
  }


  useEffect (() => {
    getIngredients()
  }, [])

  const onShowDropDown = () => {
    setShowDropDown(!showDropDown)
  }

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

  const ingredientSuggestions = useMemo(() => ingredients.filter(function(item) {
    if (item.name.indexOf(word) === -1) {
      return false
    } else {
      return true
    } 
  }),[word, ingredients])

  const createDishes= async () => {
    const response =  await axios.post(`http://localhost:3004/dishes`, {
      name,
      shortDescription,
      description,
      products: [
        {
          ingredients
        
        }
      ]
    })

  }

  const createIngredient = async () => {
    if(word === '') {
      return 
    } else {
      const result = await axios.post(`http://localhost:3004/ingredients`, {
        name: word
      })
      getIngredients()
    }

    
  }

  const addIngredients = () => {
    const newIngredients = [...selectedIngredients, word]
    setSelectedIngredients(newIngredients)
    createIngredient()
  }
    
  return (
    <div className="consructor">
      <div className="constructor__container">
        <h3 className="constructor__container__title">Dish name</h3>
        <input className="constructor__container__name" value={name} onChange={(event) => {setName(event.target.value)}} placeholder="*Enter the name of the dish"></input>
        <textarea className="constructor__container__short-description" value={shortDescription} onChange={(event) => {setShortDescription(event.target.value)}} placeholder="*Short description"></textarea>
        <button className="constructor__container__add-ingredients" onClick={onShowDropDown}> + </button>
        {showDropDown && <div>
          {<div> 
            <ul>
              {selectedIngredients.map( element=> <li><span>{element}</span>
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
                </span></li>
              )}
            </ul>
            <input   onChange={(event) => {setWord(event.target.value)}}/>
           
            
            <ul>
              {ingredientSuggestions.map( (item, i) => <li key={item.id}><button onClick={ () => {
                const addedIngredients = [...selectedIngredients, ingredients[i].name]
                setSelectedIngredients(addedIngredients)
                createIngredient()
              }}>{item.name}</button></li>)}
            </ul>
            <button onClick={addIngredients}>Add</button>        
          </div>}
          
        </div>}
        <form className="constructor__container__upload-container">
          <img className="constructor__container__upload-image" src="upload.svg"></img>
            <div>
              <input className="constructor__container__file-input" type="file" name="file" multiple></input>
              <label for="file-input">Выберите файл</label>
              <span>или перетащите его сюда</span>
            </div>
        </form>
        <textarea className="constructor__container__description"  value={description} onChange={(event) => {setDescription(event.target.value)}} placeholder="*Description"></textarea>
      </div>
      <button className="constructor__button" onClick={createDishes}>Save</button>
    </div> 
  )
  }

export default ConstructorPage  