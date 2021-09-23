import React, { useState, useEffect } from 'react';
import axios from 'axios'

import '../../../scss/components/_constructor.scss'

function ConstructorPage() {
    const ingredients = ['pepperoni','pineapple', 'cheese', 'mushrooms']

    const [name, setName] = useState('')
    const[showDropDown, setShowDropDown] = useState(false)
    const [list, setList] = useState(false)
    const [finalCount, setFinalCount] = useState(0)
    const [count, setCount] = useState(0)

    const onShowDropDown = () => {
        setShowDropDown(!showDropDown)
    }

    const onAddCount = () => {
        setCount(count + 1)
        
    }

    const onDeleteCount = () => {
        if(count > 0) {
            setCount(count - 1) 
            
        } else {
            setCount(0)
        }

    }

    const onShowItem = () => {
        setList(!list)
    }
    
//     const sendFiles = (files) => {
//         let maxFileSize = 5242880;
//         let Data = new FormData();
//         $(files).each(function(index, file) {
//              if ((file.size <= maxFileSize) && ((file.type == 'image/png') || (file.type == 'image/jpeg'))) {
//                   Data.append('images[]', file);
//              }
//         });
        // $.ajax({
        //     url: dropZone.attr('action'),
        //     type: dropZone.attr('method'),
        //     data: Data,
        //     contentType: false,
        //     processData: false,
        //     success: function(data) {
        //         alert('Файлы были успешно загружены');
        //     }
        // });
//    };

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
                <div classNmae="constructor__container__name">
                    <input className="constructor__container__name__text" value={name} onChange={(event) => {setName()}} placeholder="*Enter the name of the dish"></input>
                    <button className="constructor__container__name__btn">Add</button>
                </div>
                <button className="constructor__container__name" onClick={onShowDropDown}> + </button>
                {showDropDown && <div>
                    { 
                        list ? (
                            <div> 
                            <button onClick = {onShowItem}>Close ▲</button>
                                <ul>
                                    {ingredients.map( item => <li><span>{item}</span></li>)}
                                </ul>
                                <div>{finalCount}</div>
                            </div>
                           )
                           :
                           <button onClick = {onShowItem} style = {{width: '300px'}}>Ingredients ▼</button>
                           
                    }
                     <span className="constructor__container__count">
                        <button className="constructor__container__count__delete" onClick={onDeleteCount}>-</button>
                        <input className="constructor__container__count__state"  value={count} type="text" onChange={ (event) => {setCount(Number(event.target.value))}}/>
                        <button className="constructor__container__count__add" onClick ={onAddCount}>+</button>
                    </span>
                </div>}
                
               

                <form className="constructor__container__upload-container">
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