import React, { useState } from 'react';
import axios from 'axios'

import '../../scss/components/_cardContainer.scss'
import CardItem from '../cardItem'

const CardContainer = (props) => {
    const [cards, setCards] = useState([])
    

    const result = async () =>  {
        try {
            const response = await axios.get(`http://localhost:3004/card`)
            console.log(response)

            setCards(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container">
            <span>{props.name}</span>
            <CardItem />
            <button className="container__button" onClick={result}> + </button>
            {cards.map(({ _id, title, author, ingredients: {body}, video: {name}}) => {
                return <div key={ _id}>{title} {author} {body} {name}</div>
            })}
        </div>
    );
}

export default CardContainer;