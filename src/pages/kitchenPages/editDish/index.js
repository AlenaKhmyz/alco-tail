import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import _ from 'lodash'
import {useParams} from 'react-router-dom'

import IngredientForm from '../../../components/kitchenComponents/ingredientForm'

function EditDishPage() {
  const [dish, setDish] = useState({})
  const [name, setName] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [ingredients, setIngredients] = useState({})
  const [stepList, setStepList] = useState([])
  const [description, setDescription] = useState('')

  const {id} = useParams()
  console.log(id)

  const getDish = async () => {
    const response = await axios.get(`http://localhost:3004/dishes/${id}`)
    setDish(response.data)
    setName(response.data.name)
    setShortDescription(response.data.shortDescription)
    setIngredients(response.data.ingredients)
    setDescription(response.data.description)
  } 

  useEffect(() => {
    getDish()
  }, [])


  console.log(dish)
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
        <textarea className="edit-dish__container__description"  value={description} onChange={(event) => {setDescription(event.target.value)}} placeholder="*Description"></textarea>
      </div>
      {/* <button className="edit-dish__button" onClick={createDishes}>Save</button> */}
    </div> 
  )
  }

export default EditDishPage  