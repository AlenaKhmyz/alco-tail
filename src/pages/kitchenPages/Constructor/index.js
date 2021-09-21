import React, { useState, useEffect } from 'react';
import axios from 'axios'

function ConstructorPage() {
    
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
        <div className="consructor">
            <div className="constructor__container">
                <h3 className="constructor__container__title">Dish name</h3>
                <input className="constructor__container__name" placeholder="*Enter the name of the dish"></input>
                <button className="constructor__container__button">+</button>
                <form className="constructor__container__upload-container" method="POST" action="send">
                <img className="constructor__container__upload-image" src="upload.svg"></img>
                    <div>
                        <input className="constructor__container__file-input" type="file" name="file" multiple></input>
                        <label for="file-input">Выберите файл</label>
                        <span>или перетащите его сюда</span>
                    </div>
                </form>
                <textarea className="constructor__container__comments" placeholder="*Leave a comment"></textarea>
            </div>
            <button className="constructor__button">Save</button>
        </div> 
    )
}

export default ConstructorPage  