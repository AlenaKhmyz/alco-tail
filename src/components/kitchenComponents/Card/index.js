import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ConstructorPage from '../../../pages/kitchenPages/Constructor'
import { Link } from 'react-router-dom';
import {ROUTES} from '../../../const'

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
            {dishes.map(dish => <div className = "dish">
            <h3 className ="dish__title">{dish.name}</h3>
            <p className="dish__description">{dish.description}</p>
            <ul className="dish__ingredients">
                {dish.products.map(({ingredient}) => {
                    return(
                        <li className="dish__ingredients__element">{ingredient}</li>
                    )
                })}
            </ul>
            </div>)}
            <Link to = {ROUTES.CONSTRUCTOR}>ADD</Link> 
        </div>
    )
}

export default MenuDishes;