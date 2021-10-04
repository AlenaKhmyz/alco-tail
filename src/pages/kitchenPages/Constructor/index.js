import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'

import '../../../scss/components/_constructor.scss'
import IngredientForm from '../../../components/ingredientForm'

function ConstructorPage() {

  const [ingredients, setIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState({})
  const [name, setName] = useState('')
  const [ingredientsCount, setIngredientCount] = useState ({
    ingredientsCount: 0
  })
  const [listSteps, setListSteps] = ([])
  const [description, setDescription] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [showDropDown, setShowDropDown] = useState(false)
  const [word, setWord] = useState('')
  const [step, setStep] = useState('')
  
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
      ingredients: selectedIngredients,
      listSteps
    })
  }

  const createIngredient = async () => {
    await axios.post(`http://localhost:3004/ingredients`, {
      name: word
    })
    getIngredients()
  }

  const addIngredient = (name, needToCreateIngredient) => {
    if (!name) {
      return;
    }
    const newIngredients = {...selectedIngredients}
    newIngredients[name] = {
      name: name,
      unit: "kg",
      amount: 0
    };
    setSelectedIngredients(newIngredients)
    if (needToCreateIngredient) {
      createIngredient()
    }
  }

  const updateSelectedIngredient = (ingredient) => {
    console.log(ingredient)
    const updatedIngredients =  {...selectedIngredients}
    updatedIngredients[ingredient.name] = ingredient
    setSelectedIngredients( updatedIngredients)
  }

  const onAddSteps = () => {
    const newListSteps = [...listSteps, step]
    newListSteps = {
      step
    }
    setListSteps(newListSteps)
  }
    
  console.log(listSteps)
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
              { Object.values(selectedIngredients).map( element => <IngredientForm element={element} updateSelectedIngredient={updateSelectedIngredient} />
              )}
            </ul>
            <input onChange={(event) => {setWord(event.target.value)}}/>
            <ul>
              {ingredientSuggestions.map( (item, i) => (
                <li key={item.id}><button onClick={ () => { addIngredient(item.name, false)}}>{item.name}</button></li>
              ))}
            </ul>
            <button onClick={() => addIngredient(word, true)}>Add</button>        
          </div>}
        </div>}
       <div> 
          <ul>
            
            <li></li>
          </ul>
          <textarea value={step} onChange={(event) => {setStep(event.target.value)}} placeholder="*Steps"/>  
          <button onClick={onAddSteps}>Add steps</button>
        </div>
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