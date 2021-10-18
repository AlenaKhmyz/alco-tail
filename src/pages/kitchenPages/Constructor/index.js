import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import _ from 'lodash'

import '../../../scss/components/_constructor.scss'
import IngredientForm from '../../../components/kitchenComponents/ingredientForm'
import StepForm from '../../../components/kitchenComponents/stepForm'

function ConstructorPage() {

  const [ingredients, setIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState({})
  const [name, setName] = useState('')
  const [ingredientsCount, setIngredientCount] = useState ({
    ingredientsCount: 0
  })
  const [stepList, setStepList] = useState([])
  const [text, setText] = useState('')
  const [description, setDescription] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [showDropDown, setShowDropDown] = useState(false)
  const [word, setWord] = useState('')

  //1. исправить блюда на сервере(поменять названия полей у  блюд, которые вводили вручную) и протестить
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
      steps: stepList
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

  const deleteIngredient = (element) => {
    setSelectedIngredients(_.omit(selectedIngredients,  element.name))
  }

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

  const deleteStep = (stepIndex) => {
    const newSteps = [...stepList] 
    newSteps.splice(stepIndex, 1)
    setStepList(newSteps)
  }

  const updateSelectedIngredient = (ingredient) => {
    const updatedIngredients =  {...selectedIngredients}
    updatedIngredients[ingredient.name] = ingredient
    setSelectedIngredients( updatedIngredients)
  }

  const updateStep = (step, index) => {
    const newSteps = [...stepList]
    newSteps[index] = step
    setStepList(newSteps)
  }
  
  
  return (
    <div className="constructor">
      <div className="constructor__card">
        <h3 className="constructor__card__title">Dish name</h3>
        <div className="constructor__card__form">
          <div className="constructor__card__form__container">
            <input className="constructor__card__form__container__name" value={name} onChange={(event) => {setName(event.target.value)}} placeholder="*Enter the name of the dish"></input>
            <textarea className="constructor__card__form__container__short-description" value={shortDescription} onChange={(event) => {setShortDescription(event.target.value)}} placeholder="*Short description" rows="1"></textarea>
            <button className="constructor__card__form__container__add-ingredients" onClick={onShowDropDown}>Add ingredient</button>
            {showDropDown && <div>
              {<div> 
                <ul className="constructor__card__form__container__selected-ingredients">
                  
                  { Object.values(selectedIngredients).map( element => 
                    <IngredientForm element={element} updateSelectedIngredient={updateSelectedIngredient}  deleteIngredient={deleteIngredient} />
                  )}
                  
                </ul>
                <input onChange={(event) => {setWord(event.target.value)}} className="constructor__card__form__container__field-ingredient" placeholder="*Enter the name of the ingredient"/>
                <ul className="constructor__card__form__container__list-ingredients">
                  {ingredientSuggestions.map( (item, i) => (
                    <li key={item.id} className="constructor__card__form__container__list-ingredients__suggestion-ingredient"><button onClick={ () => { addIngredient(item.name, false)}} className="constructor__card__form__container__list-ingredients__suggestion-ingredient__button">{item.name}</button></li>
                  ))}
                </ul>
                <button onClick={() => addIngredient(word, true)} className="constructor__card__form__container__add">Add</button>        
              </div>}
            </div>}
            <div className="constructor__card__form__container__steps-card"> 
              <ul className="constructor__card__form__container__steps-card__list">
                {stepList.map( (item,index) => (
                    <StepForm stepList={stepList} item={item} index={index} deleteStep={() => deleteStep(index)} updateStep={updateStep}/>
                ))}    
              </ul>
              <textarea value={text} onChange={(event) => {setText(event.target.value)}} placeholder="*Steps" rows="1" className="constructor__card__form__container__steps-card__field"/>  
              <button onClick={() => addStep(text)} className="constructor__card__form__container__steps-card__button">Add step</button>
            </div>
            <textarea className="constructor__card__form__container__description"  value={description} onChange={(event) => {setDescription(event.target.value)}} placeholder="*Description" rows="1"></textarea>
          </div>  
          
          <form className="constructor__card__form__upload-card">
            <img className="constructor__card__form__upload-image" src="upload.svg"></img>
              <div>
                <input className="constructor__card__form__file-input" type="file" name="file" multiple></input>
                <label for="file-input">Выберите файл</label>
                <span>или перетащите его сюда</span>
              </div>
          </form>
        </div>
        <button className="constructor__card__button" onClick={createDishes}>SAVE</button>
      </div> 
      
    </div> 
  )
  }

export default ConstructorPage  