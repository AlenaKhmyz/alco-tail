import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import _ from 'lodash'
import {useParams, useHistory} from 'react-router-dom'

import IngredientForm from '../../../components/kitchenComponents/ingredientForm'
import StepForm from '../../../components/kitchenComponents/stepForm'

function EditDishPage(item) {
  const [dish, setDish] = useState({})
  const [name, setName] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [ingredients, setIngredients] = useState({})
  const [stepList, setStepList] = useState([])
  const [description, setDescription] = useState('')
  const [text, setText] = useState(item.text)

  const {id} = useParams()

  const history = useHistory()

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

 

  const saveDishes = async () => {
    await axios.patch(`http://localhost:3004/dishes/${id}`, {
      name: name,
      shortDescription,
      ingredients,
      steps: stepList,
      description
    })
    history.goBack()
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
        <input className="edit-dish__container__name" value={name} onChange={(event) => {setName(event.target.value)}}/>
        <textarea className="edit-dish__container__short-description" value={shortDescription} onChange={(event) => {setShortDescription(event.target.value)}} placeholder="*Short description"/>
        <ul>
          { Object.values(ingredients).map( element => 
              <IngredientForm element={element}/>
          )}
        </ul>
         {/* <button className="edit-dish__container__add-ingredients" onClick={onShowDropDown}> + </button>
       <div> 
          <ul>  
          </ul>
        </div>
        <form className="edit-dish__container__upload-container">
          <img className="edit-dish__container__upload-image" src="upload.svg"></img>
            <div>
              <input className="edit-dish__container__file-input" type="file" name="file" multiple></input>
              <label for="file-input">Выберите файл</label>
              <span>или перетащите его сюда</span>
            </div>
        </form> */}
        <ul>
            {stepList.map( (item,index) => (
              <StepForm stepList={stepList} item={item} index={index} deleteStep={() => deleteStep(index)} updateStep={updateStep}/>
            ))}    
        </ul>
        <textarea value={text} onChange={(event) => {setText(event.target.value)}} placeholder="*Steps"/>  
        <button onClick={() => addStep(text)}>Add steps</button>
        <textarea className="edit-dish__container__description"  value={description} onChange={(event) => {setDescription(event.target.value)}} placeholder="*Description"></textarea>
      </div>
      <button className="edit-dish__button" onClick={saveDishes}>Save</button>
    </div> 
  )
  }

export default EditDishPage  