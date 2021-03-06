import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import _ from 'lodash'
import {useParams, useHistory} from 'react-router-dom'

import '../../../scss/components/_editDish.scss'
import IngredientForm from '../../../components/kitchenComponents/ingredientForm'
import StepForm from '../../../components/kitchenComponents/stepForm'

function EditDishPage(item) {
  const [dish, setDish] = useState({})
  const [name, setName] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [ingredients, setIngredients] = useState({})
  const [ingredientsCount, setIngredientCount] = useState ({
    ingredientsCount: 0
  })
  const [stepList, setStepList] = useState([])
  const [description, setDescription] = useState('')
  const [text, setText] = useState(item.text)
  const [showDropDown, setShowDropDown] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState({})
  const [word, setWord] = useState('')

  const {id} = useParams()

  const history = useHistory()

  const getIngredients = async () => {
    const response = await axios.get('http://localhost:3004/ingredients')
    setIngredients(response.data)
  }

  const getDish = async () => {
    const response = await axios.get(`http://localhost:3004/dishes/${id}`)
    console.log(response.data)
    setDish(response.data)
    setName(response.data.name)
    setShortDescription(response.data.shortDescription)
    setIngredients(response.data.ingredients)
    setStepList(response.data.steps)
    setDescription(response.data.description)

  } 

  useEffect(() => {
    getDish()
  }, [])

 
  const onShowDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  const saveDishes = async () => {
    await axios.patch(`http://localhost:3004/dishes/${id}`, {
      name: name,
      shortDescription,
      ingredients: selectedIngredients,
      steps: stepList,
      description
    })
    history.goBack()
  }

  const ingredientSuggestions = useMemo(() => Object.values(ingredients).filter(function(item) {
    if (item.name.indexOf(word) === -1) {
      return false
    } else {
      return true
    } 
  }),[word, ingredients])

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

  console.log(stepList)
  return (
    <div className="edit-dish">
      <div className="edit-dish__container">
        <h3 className="edit-dish__container__title">Dish name</h3>
        <div className="edit-dish__container__form">
          <div className="edit-dish__container__form__card">
            <input className="edit-dish__container__form__card__name" value={name} onChange={(event) => {setName(event.target.value)}}/>
            <textarea className="edit-dish__container__form__card__short-description" value={shortDescription} onChange={(event) => {setShortDescription(event.target.value)}} placeholder="*Short description"/>
            <button className="edit-dish__container__form__card__add-ingredients" onClick={onShowDropDown}> + </button>
            {showDropDown && <div>
              {<div> 
                <ul className="edit-dish__container__form__card__selected-ingredients">
                  
                  { Object.values(selectedIngredients).map( element => 
                    <IngredientForm element={element} updateSelectedIngredient={updateSelectedIngredient}  deleteIngredient={deleteIngredient} />
                  )}
                  
                </ul>
                <input onChange={(event) => {setWord(event.target.value)}} className="edit-dish__container__form__card__field-ingredient" placeholder="*Enter the name of the ingredient"/>
                <ul className="edit-dish__container__form__card__list-ingredients">
                  {ingredientSuggestions.map( (item, i) => (
                    <li key={item.id} className="edit-dish__container__form__card__list-ingredients__suggestion-ingredient"><button onClick={ () => { addIngredient(item.name, false)}} className="edit-dish??__container__form__card__list-ingredients__suggestion-ingredient__button">{item.name}</button></li>
                  ))}
                </ul>
                <button onClick={() => addIngredient(word, true)} className="edit-dish__container__form__card__add">Add</button>        
              </div>}
            </div>}
            <ul>
              { Object.values(ingredients).map( element => 
                  <IngredientForm element={element}/>
              )}
            </ul>
            <button className="edit-dish__container__add-ingredients" onClick={onShowDropDown}> + </button>
          <div> 
              <ul>  
              </ul>
            </div>
            <form className="edit-dish__container__upload-container">
              <img className="edit-dish__container__upload-image" src="upload.svg"></img>
                <div>
                  <input className="edit-dish__container__file-input" type="file" name="file" multiple></input>
                  <label for="file-input">???????????????? ????????</label>
                  <span>?????? ???????????????????? ?????? ????????</span>
                </div>
            </form>
             <div className="edit-dish__container__form__card__steps-card">
                <ul className="edit-dish__container__form__card__steps-card__list">
                  {stepList.map( (item,index) => (
                    <StepForm stepList={stepList} item={item} index={index} deleteStep={() => deleteStep(index)} updateStep={updateStep}/>
                  ))}    
                </ul>
                <textarea value={text} onChange={(event) => {setText(event.target.value)}}  rows="1" className="edit-dish__container__form__card__steps-card__field" placeholder="*Steps"/>  
                <button onClick={() => addStep(text)}  className="edit-dish__container__form__card__steps-card__add-steps">Add steps</button>
              </div>
            
            <textarea className="edit-dish__container__form__card__description"  value={description} onChange={(event) => {setDescription(event.target.value)}} placeholder="*Description"></textarea>
          </div>
        </div>
        <button className="edit-dish__container__button" onClick={saveDishes}>Save</button>
      </div>
      
    </div> 
  )
  }

export default EditDishPage  