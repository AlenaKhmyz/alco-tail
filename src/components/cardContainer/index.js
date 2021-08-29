import React from 'react';
import '../../scss/components/_cardContainer.scss'
import CardItem from '../cardItem'

const CardContainer = (props) => {
    return (
        <div className="container">
            <span>{props.name}</span>
            <CardItem />
            <button className="container__button">+</button>
        </div>
    );
}

export default CardContainer;