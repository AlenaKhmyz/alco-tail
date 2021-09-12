import React from 'react'
import '../../../scss/components/_cardItem.scss'

const CardItem = ({ingredients,video, title, description}) => {
    return (
        <div className="cocktail-card">
            <h3 className="cocktail-card__name" >{title}</h3>
            <div className="cocktail-card__block">
                <div className="cocktail-card__block__inner">
                    <ul className="cocktail-card__block__inner__list ">
                        {ingredients.map(({body}) => {
                            return(
                                <li className="cocktail-card__block__inner__list__elements">{body}</li>
                            )
                        })}
                    </ul>
                    <div className="cocktail-card__block__inner__description">{description}</div>
                    <button className="cocktail-card__block__inner__btn"></button>
                </div>
                <iframe src={video}
                    frameBorder='0'
                    //allow='autoplay; encrypted-media'
                    allowFullScreen
                    className="cocktail-card__block__inner__video"
                /> 
            </div>
            
        </div>
    );
}

export default CardItem;