import React, { useState, useEffect } from 'react';
import axios from 'axios'

const MenuDishes = (title, description, ingredients) => {

    const [dishes, setDishes] = useState([])

    const getDishes = async () => {
       const response = await axios.get(`http://localhost:3004/dishes`)
       setDishes(response.data)
    } 

    useEffect(() => {
        getDishes()
    }, [])

    const createDishes= async () => {
       const response =  await axios.post(`http://localhost:3004/dishes`, {
            title: 'dish',
            ingredients: [
                {
                    body: "some ingredient"
                
                }
            ]
        })

        setDishes([...dishes, response.data])
    }
    return (
        <div className="dish"> 
            <h3 className ="dish__title">{title}</h3>
            <p className="dish__description">{description}</p>
            <ul className="dish__ingredients">
                {ingredients.map(({name}) => {
                    return(
                        <li className="dish__ingredients__element">{name}</li>
                    )
                })}
            </ul>
            <button className="dish__button" onClick={createDishes}> + </button>
        </div>
    )
}

export default MenuDishes;