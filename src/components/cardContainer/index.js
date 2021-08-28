import React from 'react';
import '../../scss/components/_cardContainer.scss'
import CardItem from '../cardItem'

const CardContainer = (props) => {
    return (
        <div className="container">
            <h2 className="container__name">Vodka</h2>
            <CardItem />
            <button className="container__button">+</button>
        </div>
    );
}

export default CardContainer;