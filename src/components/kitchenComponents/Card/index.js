import React, { useState, useEffect } from 'react';
import axios from 'axios'

const MenuDishes = (props) => {

    return (
        <div className="dish"> 
            <h3 className ="dish__title">Dish name</h3>
            <p className="dish__description">blablablablabla</p>
            <ul className="dish__ingredients">
                <li className="dish__ingredients__element">apple</li>
                <li className="dish__ingredients__element">chicken</li>
            </ul>
        </div>
    )
}

export default MenuDishes;