import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../scss/components/_cardContainer.scss'
import CardItem from '../cardItem'


// const CardContainer = (props) => {
//     const [cocktails, setCocktails] = useState([])
    


    const Cocktails = (props) =>  {
        const [cocktails, setCocktails] = useState([])

        const getCocktails = async () => {
           const response = await axios.get(`http://localhost:3004/cocktails`)
            setCocktails(response.data)
        } 

        useEffect(() => {
            getCocktails()
        }, [])

        const createCocktails= async () => {
           const response =  await axios.post(`http://localhost:3004/cocktails`, {
                title: 'tails',
                ingredients: [
                    {
                        body: "some ingredient"
                    
                    }
                ]
            })

            setCocktails([...cocktails, response.data])
        }

        
        return (
            <div className="container">
                <span>{props.name}</span>
                {cocktails.map(({ title, ingredients, description, video }) => {
                    return (           
                        
                        <CardItem title={title} ingredients={ingredients} description={description} video={video}/>
                    )
                })}
                 <button className="container__button" onClick={createCocktails}> + </button>
            </div>
        );
    }

    //     return (
    //         <div className="container">
    //             <span>{props.name}</span>

    //             <button className="container__button" onClick={result}> + </button>
    //             {cocktails.map(({ title, ingredients }) => {
    //                 return (           
                        
    //                     <CardItem title={title} ingredients={ingredients}/>
    //                 )
    //             })}
    //         </div>
    //     );
    // }

export default Cocktails;