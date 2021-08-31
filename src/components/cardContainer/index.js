import React from 'react';
import axios from 'axios'

import '../../scss/components/_cardContainer.scss'
import CardItem from '../cardItem'

const CardContainer = (props) => {
    const result = () =>  axios.get(
        `http://localhost:3004/card`
    ).then( (response) => { console.log(response) } )

    return (
        <div className="container">
            <span>{props.name}</span>
            <CardItem />
            <button className="container__button" onClick={() => { result()}}>+</button>
        </div>
    );
}

export default CardContainer;