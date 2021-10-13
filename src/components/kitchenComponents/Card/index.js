import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ConstructorPage from '../../../pages/kitchenPages/Constructor'
import { Link } from 'react-router-dom';
import {ROUTES} from '../../../const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../../scss/components/_dish.scss'

const MenuDishes = () => {

  const [dishes, setDishes] = useState([])
  

  const getDishes = async () => {
      const response = await axios.get(`http://localhost:3004/dishes`)
      setDishes(response.data)
  } 

  useEffect(() => {
      getDishes()
  }, [])

    // const createDishes= async () => {
    //    const response =  await axios.post(`http://localhost:3004/dishes`, {
    //         name: 'dish',
    //         products: [
    //             {
    //                 ingredient: "some ingredient"
                
    //             }
    //         ]
    //     })

    //     console.log('dishes')
    //     console.log(response.data)

    //     setDishes([...dishes, response.data])
    // }
    
    

  return (
    <div className="dish"> 
      {dishes.map(dish => <div className = "dish__card">
      <div className="dish__card__header">
        <h3 className ="dish__card__header__title">{dish.name}</h3>
        <Link to = {`/editdish/${dish.id}`} className ="dish__card__header__edit" > <FontAwesomeIcon icon={faEdit} color="#CCAB86"/> </Link>
      </div>
      <p className="dish__card__short-description">{dish.shortDescription}</p>
      <p className="dish__card__descripton">{dish.description}</p>
      <ul className="dish__card__ingredients">
        {Object.values(dish.ingredients).map(({name}) => {
          return(
            <li className="dish__card__ingredients__element">{name}</li>
          )
        })}
      </ul> 
      </div>)}
      <Link to = {ROUTES.CONSTRUCTOR}>ADD</Link> 
    </div>
  )
}

export default MenuDishes;