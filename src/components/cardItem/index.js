import React from 'react'
import '../../scss/components/_cardItem.scss'

const CardItem = (props) => {
    return (
        <div className="cocktail-card">
            <h3 className="cocktail-card__name" >{props.title}</h3>
            <div className="cocktail-card__block">
                <div className="cocktail-card__block__inner">
                    <ul className="cocktail-card__block__inner__list ">
                        {props.ingredients.map(({body}) => {
                            return(
                                <li className="cocktail-card__block__inner__list__elements">{body}</li>
                            )
                        })}
                    </ul>
                    <div className="cocktail-card__block__inner__description"></div>
                    <button className="cocktail-card__block__inner__btn"></button>
                </div>
                <div className="cocktail-card__block__video"></div>
            </div>
            
        </div>
    );
}

export default CardItem;