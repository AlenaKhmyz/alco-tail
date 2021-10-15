import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ConstructorPage from '../../../pages/kitchenPages/Constructor'
import { Link } from 'react-router-dom';
import {ROUTES} from '../../../const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'
import '../../../scss/components/_dish.scss'

const MenuDishes = () => {

  const [dishes, setDishes] = useState([])
  const [filterDishes, setFilterDishes] = useState([])
  const [term, setTerm] = useState('')
  

  const getDishes = async () => {
      const response = await axios.get(`http://localhost:3004/dishes`)
      setDishes(response.data)
      setFilterDishes(response.data)
  } 

  useEffect(() => {
      getDishes()
  }, [])

  const search = () => {
    if (term === '') {
      setFilterDishes(dishes)
    } 
    const result = dishes.filter(function(item){
      const newResult =  item.name.indexOf(term)

      return newResult !== -1
       
    })

    setFilterDishes(result) 

    console.log(dishes, result)
  }

  

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
      <div className="dish__search">
        <input className="dish__search__dishes" type="text" placeholder="Search" value={term} onChange={(event) => setTerm(event.target.value)}></input>
        <button className="dish__search__button" onClick={search}><FontAwesomeIcon icon={faSearch} color="#CCAB86"/></button>
      </div>
        <div className="dish__card__plus">
         <Link to = {ROUTES.CONSTRUCTOR} className="dish__card__plus__plus">+</Link>
        </div>
      {filterDishes.map(dish => {
        console.log(dish)
        return (
          <div className = "dish__card">
            <div className="dish__card__header">
              <h3 className ="dish__card__header__title">{dish.name}</h3>
              <Link to = {`/editdish/${dish.id}`} className ="dish__card__header__edit" > <FontAwesomeIcon icon={faEdit} color="#CCAB86"/> </Link>
            </div>
            <p className="dish__card__short-description">{dish.shortDescription}</p>
            <ul className="dish__card__ingredients">
              {Object.values(dish.ingredients).map(({name}) => {
                
                return(
                  <li className="dish__card__ingredients__element">{name}</li>
                )
              })}
            </ul> 
          </div>
        )
      })}
        
      
    </div>
  )
}

export default MenuDishes;